/**
 * Email template placeholder
 * 
 * This is a placeholder template that should be replaced with actual HTML email template.
 * The template should use the variables provided by getEmailVariables function.
 * 
 * Available variables:
 * - {{email}}: The user's email address
 * - {{confirmationLink}}: Link to confirm email (if needed)
 */
export const emailTemplate = `<h1>hello</h1>`;

/**
 * Get email template variables for dynamic content insertion
 * 
 * @param email - The recipient's email address
 * @returns Object containing template variables
 */
export function getEmailVariables(email: string) {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  
  return {
    email,
    confirmationLink: `${baseUrl}/confirm?email=${encodeURIComponent(email)}`,
  };
}
