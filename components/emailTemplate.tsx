import { Html, Button, Container, Text } from '@react-email/components';

interface EmailTemplateProps {
  firstName: string;
  verifyUrl: string;
}

export const EmailTemplate = ({ firstName, verifyUrl }: EmailTemplateProps) => (
  <Html>
    <Container>
      <Text>Hello {firstName},</Text>
      <Button href={verifyUrl} style={{ color: '#61dafb' }}>
        Click here to verify your email
      </Button>
    </Container>
  </Html>
);

export default EmailTemplate;
