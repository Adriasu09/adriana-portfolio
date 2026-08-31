import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { getContactFormSchema } from "@/lib/validations/contact";
import { ContactEmail } from "@/emails/ContactEmail";
import { ConfirmationEmailEN } from "@/emails/ConfirmationEmail.en";
import { ConfirmationEmailES } from "@/emails/ConfirmationEmail.es";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;

  // Expired entries are dropped on every call so the map cannot grow unbounded.
  for (const [key, times] of submissions) {
    const recent = times.filter((time) => time > cutoff);
    if (recent.length === 0) submissions.delete(key);
    else submissions.set(key, recent);
  }

  const times = submissions.get(ip) ?? [];
  if (times.length >= RATE_LIMIT_MAX) return true;

  submissions.set(ip, [...times, now]);
  return false;
}

export async function POST(request: Request) {
  try {
    // Checked per request, not at module load: a throw at import time would
    // break `next build`, which evaluates route modules.
    if (!CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
      console.error("contact_config_missing");
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 },
      );
    }

    // The form always posts JSON. Anything else did not come from it.
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { error: "Unsupported media type" },
        { status: 415 },
      );
    }

    // Origin is set by the browser and cannot be forged from a page's own
    // JavaScript, so this stops a form embedded on another site. It is not a
    // real defence: a script can simply omit the header, which is why a missing
    // Origin is allowed through.
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && origin !== `https://${host}` && origin !== `http://${host}`) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // The IP is personal data. It is used as an in-memory key and never logged.
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

    if (isRateLimited(ip)) {
      console.warn("contact_rate_limited");
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: { "Retry-After": String(RATE_LIMIT_WINDOW_MS / 1000) },
        },
      );
    }

    const body = await request.json();

    // The schema expects a translator for its error messages. On the server
    // those messages never reach the visitor, so returning the key is enough.
    const t = (key: string) => key;
    const validatedData = getContactFormSchema(t).parse(body);

    // Honeypot: only an automated client fills a field nobody can see.
    // Answering 200 costs nothing and tells the bot nothing.
    if (validatedData.subject) {
      console.warn("contact_honeypot_triggered");
      return NextResponse.json(
        { message: "Message sent successfully" },
        { status: 200 },
      );
    }

    const { name, email, message, language = "es" } = validatedData;

    const ConfirmationEmail =
      language === "en" ? ConfirmationEmailEN : ConfirmationEmailES;

    const confirmationSubject =
      language === "en"
        ? "Thank you for reaching out! I'll get back to you soon"
        : "¡Gracias por contactarme! Te responderé pronto";

    const contactEmailHtml = await render(
      ContactEmail({ name, email, message }),
    );
    const confirmationEmailHtml = await render(ConfirmationEmail({ name }));

    // Resend reports failures in the returned object instead of throwing, so
    // the catch below never sees them. Both results have to be checked.

    // Notification to the site owner. Always Spanish, regardless of the
    // visitor's language.
    const notification = await resend.emails.send({
      from: `Portfolio Contact <${CONTACT_FROM_EMAIL}>`,
      to: [CONTACT_TO_EMAIL],
      replyTo: email,
      subject: `Nuevo mensaje de ${name} desde tu Portfolio`,
      html: contactEmailHtml,
    });

    // This one carries the message itself: if it fails, nothing arrived and the
    // visitor needs to know so they can try again.
    if (notification.error) {
      console.error("contact_notification_failed", {
        name: notification.error.name,
        statusCode: notification.error.statusCode,
      });
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 },
      );
    }

    // Courtesy confirmation to the visitor, in their own language.
    const confirmation = await resend.emails.send({
      from: `Adriana Suárez <${CONTACT_FROM_EMAIL}>`,
      to: [email],
      replyTo: CONTACT_TO_EMAIL,
      subject: confirmationSubject,
      html: confirmationEmailHtml,
    });

    // The message already got through, so a failure here is logged but not
    // reported: telling the visitor it failed would make them send it twice.
    if (confirmation.error) {
      console.error("contact_confirmation_failed", {
        name: confirmation.error.name,
        statusCode: confirmation.error.statusCode,
      });
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    // A validation failure is a badly filled form, not a server fault: it is
    // answered but not logged, so the log keeps only real failures.
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    console.error("contact_request_failed", {
      name: error instanceof Error ? error.name : "unknown",
    });

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
