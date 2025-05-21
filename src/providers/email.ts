import { Resend } from 'resend';
import { EMAIL_ACTIVATE } from 'src/utils/constants/email-activate';

const resendApiKey = 're_LxrQdh2W_DsrJEz8GmtGNwhZEY4h8xSJ6';
const resend = new Resend(resendApiKey);

export async function sendEmail(email: string, token: string): Promise<void> {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Activate your account',
      html: EMAIL_ACTIVATE(email, token).html(),
    });
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
}
