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

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nuevo mensaje de {name} desde tu Portfolio</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nuevo mensaje desde tu Portfolio</Heading>

          <Section style={infoBox}>
            <Text style={infoText}>
              <strong>Nombre:</strong> {name}
            </Text>
            <Text style={infoText}>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${email}`} style={link}>
                {email}
              </a>
            </Text>
          </Section>

          <Section style={messageBox}>
            <Heading as="h2" style={h2}>
              Mensaje:
            </Heading>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Este mensaje fue enviado desde el formulario de contacto de tu
            portfolio.
            <br />
            Puedes responder directamente a este email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Estilos mejorados
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
  color: "#6109b9",
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.3",
  margin: "40px 40px 30px",
  padding: "0",
};

const h2 = {
  color: "#333333",
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "1.3",
  margin: "0 0 15px 0",
};

const infoBox = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "24px 32px",
  margin: "0 40px 24px",
};

const infoText = {
  color: "#333333",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 0 12px 0",
};

const messageBox = {
  backgroundColor: "#ffffff",
  borderLeft: "4px solid #6109b9",
  padding: "24px 32px",
  margin: "24px 40px",
};

const link = {
  color: "#6109b9",
  textDecoration: "underline",
};

const messageText = {
  color: "#555555",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
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
  margin: "0 40px",
};
