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

export function ConfirmationEmailEN({ name }: ConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Thank you for reaching out! I&apos;ll get back to you soon
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Hello {name}! 👋</Heading>

          <Text style={text}>
            Thank you for contacting me. I have received your message
            successfully and I will get back to you as soon as possible.
          </Text>

          <Section style={confirmationBox}>
            <Text style={confirmationText}>
              ✅ <strong>Your message has been sent successfully</strong>
            </Text>
            <Text style={confirmationSubtext}>
              I typically respond within 24-48 hours.
            </Text>
          </Section>

          <Text style={text}>
            In the meantime, feel free to check out{" "}
            <a href="https://github.com/Adriasu09" style={link}>
              my projects on GitHub
            </a>{" "}
            or connect with me on{" "}
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
            This is an automated confirmation email.
            <br />
            If you did not send this message, you can safely ignore this email.
          </Text>

          <Text style={signature}>
            Best regards,
            <br />
            <strong style={{ color: "#6109b9" }}>Adriana Suárez</strong>
            <br />
            <span style={{ fontSize: "13px", color: "#999" }}>
              Frontend & Fullstack Developer
            </span>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Estilos (mismos que la versión ES)
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
