import { Resend } from 'resend';
import { HTML } from 'src/utils/constants/html';

const resendApiKey = 're_LxrQdh2W_DsrJEz8GmtGNwhZEY4h8xSJ6';
const resend = new Resend(resendApiKey);

export async function sendEmail({
  email = '',
  token = '',
  verifyAccount = true,
}): Promise<void> {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Activate your account',
      html: verifyAccount
        ? HTML.activateAccount(email, token)
        : HTML.resetPassword(token),
    });
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
}
