/**
 * Email template for waitlist confirmation
 * 
 * This template uses inline CSS for maximum email client compatibility.
 * The template uses variables provided by getEmailVariables function.
 * 
 * Available variables:
 * - {{email}}: The user's email address
 * - {{siteUrl}}: Link to the website
 */
export const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Mi-Era Waitlist</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding: 40px 20px 20px;">
              <img src="{{logoUrl}}" alt="Mi-Era" style="height: 48px; width: auto;" />
            </td>
          </tr>
          
          <!-- Main Heading -->
          <tr>
            <td align="center" style="padding: 20px 40px;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #3755F0; line-height: 1.2;">
                You're officially on the waitlist
              </h1>
            </td>
          </tr>
          
          <!-- Subheading -->
          <tr>
            <td align="center" style="padding: 0 40px 20px;">
              <p style="margin: 0; font-size: 18px; color: #333333; line-height: 1.5;">
                Thanks for signing up for Mi-Era.
              </p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; color: #333333; line-height: 1.6; text-align: center;">
                You're joining a small group of people who are preparing for what's next — thoughtfully, calmly, and on your own terms. Mi-Era is being built to help you understand and use what's coming, without overwhelm or fear.
              </p>
              
              <p style="margin: 0 0 30px; font-size: 16px; color: #333333; line-height: 1.6; text-align: center;">
                You don't need to do anything right now. We've got you.
              </p>
              
              <!-- Benefits List -->
              <div style="text-align: left; margin: 0 0 30px;">
                <p style="margin: 0 0 10px; font-size: 16px; color: #333333; line-height: 1.6;">
                  • You'll be among the first to know when Mi-Era opens
                </p>
                <p style="margin: 0 0 10px; font-size: 16px; color: #333333; line-height: 1.6;">
                  • You'll get early access to tools, guidance, and resources
                </p>
                <p style="margin: 0 0 0; font-size: 16px; color: #333333; line-height: 1.6;">
                  • You'll receive occasional updates — only when there's something genuinely useful to share
                </p>
              </div>
              
              <p style="margin: 0 0 20px; font-size: 16px; color: #333333; line-height: 1.6; text-align: center;">
                Mi-Era isn't about hype or trends. It's about clarity, confidence, and staying relevant in a world that's changing fast.
              </p>
              
              <p style="margin: 0 0 30px; font-size: 16px; color: #333333; line-height: 1.6; text-align: center;">
                When the time comes, we'll walk you through it — step by step.
              </p>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 0 40px 40px;">
              <a href="{{siteUrl}}" style="display: inline-block; padding: 14px 32px; background-color: #3755F0; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600;">
                Learn More
              </a>
            </td>
          </tr>
          
          <!-- Signature -->
          <tr>
            <td align="center" style="padding: 0 40px 20px;">
              <p style="margin: 0 0 5px; font-size: 16px; color: #333333; line-height: 1.5;">
                See you soon,
              </p>
              <p style="margin: 0; font-size: 16px; color: #333333; line-height: 1.5;">
                The Mi-Era team ✨
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 40px 40px; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 5px; font-size: 14px; color: #666666; line-height: 1.5;">
                You're receiving this because you joined the Mi-Era waitlist.
              </p>
              <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.5;">
                No noise. No spam. Just what matters.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

/**
 * Get email template variables for dynamic content insertion
 * 
 * @param email - The recipient's email address
 * @returns Object containing template variables
 */
export function getEmailVariables(email: string) {
  const siteUrl = 'https://mi-era-2.vercel.app';
  const logoUrl = `${siteUrl}/assets/logo.svg`;
  
  return {
    email,
    siteUrl,
    logoUrl,
  };
}
