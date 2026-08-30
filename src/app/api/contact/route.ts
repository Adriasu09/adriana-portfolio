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

    const body = await request.json();

    // The schema expects a translator for its error messages. On the server
    // those messages never reach the visitor, so returning the key is enough.
    const t = (key: string) => key;
    const validatedData = getContactFormSchema(t).parse(body);

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
