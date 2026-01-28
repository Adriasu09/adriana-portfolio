import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar datos
    const validatedData = contactFormSchema.parse(body);

    // TODO: Integrar con Resend cuando estés listo
    // Por ahora solo logueamos
    console.log("Contact form submission:", validatedData);

    // Simular delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
