import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { getContactFormSchema } from "@/lib/validations/contact";
import { ContactEmail } from "@/emails/ContactEmail";
import { ConfirmationEmailEN } from "@/emails/ConfirmationEmail.en";
import { ConfirmationEmailES } from "@/emails/ConfirmationEmail.es";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar datos
    const t = (key: string) => key;
    const validatedData = getContactFormSchema(t).parse(body);

    const { name, email, message, language = "es" } = validatedData;

    // Seleccionar template según idioma
    const ConfirmationEmail =
      language === "en" ? ConfirmationEmailEN : ConfirmationEmailES;

    const confirmationSubject =
      language === "en"
        ? "Thank you for reaching out! I'll get back to you soon"
        : "¡Gracias por contactarme! Te responderé pronto";

    // Renderizar emails
    const contactEmailHtml = await render(
      ContactEmail({ name, email, message }),
    );
    const confirmationEmailHtml = await render(ConfirmationEmail({ name }));

    // EMAIL 1: Enviar a ti (notificación del mensaje) - siempre en español
    const notificationEmail = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["adsuarez09@gmail.com"],
      replyTo: email,
      subject: `Nuevo mensaje de ${name} desde tu Portfolio`,
      html: contactEmailHtml,
    });

    // EMAIL 2: Enviar al usuario (confirmación automática) - en su idioma
    const confirmationResponse = await resend.emails.send({
      from: "Adriana Suárez <onboarding@resend.dev>",
      to: [email],
      replyTo: "adsuarez09@gmail.com",
      subject: confirmationSubject,
      html: confirmationEmailHtml,
    });

    return NextResponse.json(
      {
        message: "Message sent successfully",
        data: { notificationEmail, confirmationResponse },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
