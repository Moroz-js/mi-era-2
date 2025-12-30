import nodemailer from 'nodemailer';
import { emailTemplate, getEmailVariables } from './templates';

interface EmailService {
  sendConfirmation(email: string): Promise<void>;
}

/**
 * Create nodemailer transporter with Google SMTP configuration
 */
function createTransporter() {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const smtpFrom = process.env.SMTP_FROM || 'no-reply@mi-era.org';

  if (!smtpUser || !smtpPassword) {
    throw new Error('SMTP credentials not configured. Please set SMTP_USER and SMTP_PASSWORD environment variables.');
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });
}

/**
 * Replace template variables in HTML string
 * 
 * @param template - HTML template string with {{variable}} placeholders
 * @param variables - Object containing variable values
 * @returns HTML string with variables replaced
 */
function replaceTemplateVariables(template: string, variables: Record<string, string>): string {
  let result = template;
  
  for (const [key, value] of Object.entries(variables)) {
    const placeholder = `{{${key}}}`;
    result = result.replace(new RegExp(placeholder, 'g'), value);
  }
  
  return result;
}

/**
 * Send confirmation email to waitlist subscriber
 * 
 * @param email - Recipient email address
 * @throws Error if email sending fails
 */
export async function sendConfirmation(email: string): Promise<void> {
  // Mock mode for development - just log instead of sending
  if (process.env.NODE_ENV === 'development' && process.env.SMTP_MOCK === 'true') {
    console.log('📧 [MOCK] Confirmation email would be sent to:', email);
    console.log('Subject: Welcome to Mi-Era Waitlist');
    return;
  }

  try {
    const transporter = createTransporter();
    const variables = getEmailVariables(email);
    const htmlContent = replaceTemplateVariables(emailTemplate, variables);

    const mailOptions = {
      from: process.env.SMTP_FROM || 'no-reply@mi-era.org',
      to: email,
      subject: 'Welcome to Mi-Era Waitlist',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    
    console.log(`Confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    throw new Error('Failed to send confirmation email');
  }
}

/**
 * Export email service interface
 */
export const emailService: EmailService = {
  sendConfirmation,
};
