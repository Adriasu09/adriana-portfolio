import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface ConfirmationEmailProps {
  name: string;
}

export function ConfirmationEmailES({ name }: ConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>¡Gracias por contactarme! Te responderé pronto</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>¡Hola {name}! 👋</Heading>

          <Text style={text}>
            Gracias por ponerte en contacto conmigo. He recibido tu mensaje
            correctamente y me pondré en contacto contigo lo antes posible.
          </Text>

          <Section style={confirmationBox}>
            <Text style={confirmationText}>
              ✅ <strong>Tu mensaje ha sido enviado con éxito</strong>
            </Text>
            <Text style={confirmationSubtext}>
              Normalmente respondo en un plazo de 24-48 horas.
            </Text>
          </Section>

          <Text style={text}>
            Mientras tanto, te invito a revisar{" "}
            <a href="https://github.com/Adriasu09" style={link}>
              mis proyectos en GitHub
            </a>{" "}
            o conectar conmigo en{" "}
            <a
              href="https://www.linkedin.com/in/adriana-su%C3%A1rez-4562a5249/"
              style={link}
            >
              LinkedIn
            </a>
            .
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Este es un email automático de confirmación.
            <br />
            Si no enviaste este mensaje, puedes ignorar este email.
          </Text>

          <Text style={signature}>
            Saludos,
            <br />
            <strong style={{ color: "#6109b9" }}>Adriana Suárez</strong>
            <br />
            <span style={{ fontSize: "13px", color: "#999" }}>
              Desarrolladora Frontend & Fullstack
            </span>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Estilos (iguales que antes)
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const h1 = {
  color: "#333333",
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.3",
  margin: "40px 40px 20px",
};

const text = {
  color: "#555555",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 40px 24px",
};

const confirmationBox = {
  backgroundColor: "#f0f9ff",
  border: "2px solid #6109b9",
  borderRadius: "12px",
  padding: "24px 32px",
  margin: "24px 40px",
};

const confirmationText = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 8px 0",
  textAlign: "center" as const,
};

const confirmationSubtext = {
  color: "#666666",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0",
  textAlign: "center" as const,
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "30px 0",
};

const footer = {
  color: "#999999",
  fontSize: "13px",
  lineHeight: "20px",
  textAlign: "center" as const,
  margin: "0 40px 24px",
};

const signature = {
  color: "#333333",
  fontSize: "15px",
  lineHeight: "24px",
  textAlign: "center" as const,
  margin: "0 40px",
};

const link = {
  color: "#6109b9",
  textDecoration: "underline",
};
