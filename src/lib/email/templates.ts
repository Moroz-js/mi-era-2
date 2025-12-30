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
              <svg width="196" height="52" viewBox="0 0 1964 519" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto;">
                <path d="M669.334 65.3334V130.667H680.401C727.867 130.667 769.467 101.6 784.667 57.7333C789.067 45.2 790.667 34 790.667 15.6V1.35303e-05H730.001H669.334V65.3334Z" fill="black"/>
                <path d="M852 17.3334C852 36.9334 854.133 49.8668 859.867 63.8668C872.8 95.8668 903.467 121.067 937.6 128C950 130.533 956.267 130.667 1149.6 130.4L1348.67 130V65.3334V0.66677L1100.4 0.26677L852 0.000103057V17.3334Z" fill="black"/>
                <path d="M1702.67 172.133C1623.73 178.933 1568.93 197.2 1537.73 227.066L1529.47 235.066L1529.07 213.2L1528.67 191.333L1469.07 190.933L1409.33 190.666V352V513.333H1470H1530.67V432.266C1530.67 387.733 1531.33 347.466 1532 342.8C1538.67 296.4 1613.47 255.333 1707.33 246.533C1743.07 243.2 1783.33 249.333 1807.07 261.6C1825.73 271.333 1835.73 284.4 1837.07 300.933C1837.6 307.6 1837.33 309.333 1835.87 309.333C1830.13 309.333 1695.73 322.933 1684 324.8C1629.2 333.066 1596.8 351.866 1581.2 384.666C1575.2 397.333 1572.8 410.133 1573.73 426.533C1574.93 449.6 1582.27 466.266 1598 481.2C1624.93 506.666 1664.53 518.799 1721.33 518.799C1772.93 518.799 1812 509.466 1837.73 491.2C1841.2 488.666 1844.27 486.666 1844.53 486.666C1845.2 486.666 1845.87 491.466 1847.33 505.6L1848.13 513.333H1906.13H1964L1963.33 510.266C1961.07 499.466 1959.6 459.466 1958.8 378C1957.73 287.733 1957.6 284.4 1954.8 274.933C1945.6 243.733 1926.67 222.533 1892.27 204.933C1856.53 186.666 1818.4 176.133 1773.33 172C1755.87 170.533 1721.33 170.533 1702.67 172.133ZM1837.33 391.733C1837.33 401.333 1836.67 408.266 1835.33 412.266C1831.07 424.533 1814.8 436 1794.13 441.333C1771.33 447.066 1733.33 448.133 1717.6 443.333C1696.8 437.066 1689.47 413.866 1704 400.8C1707.47 397.733 1712.4 395.2 1718.27 393.333C1726.53 390.933 1820.13 377.866 1832.4 377.466L1837.33 377.333V391.733Z" fill="black"/>
                <path d="M209.333 183.999C177.2 187.333 152.267 197.066 130 214.799L120 222.666V206.666V190.666H60H0V351.999V513.333H60.6667H121.2L121.6 410.266C122 313.999 122.133 306.933 124.4 300.799C130.133 285.599 141.333 275.866 158.267 271.199C172 267.333 197.6 267.733 209.467 271.733C226.667 277.599 236.133 286.399 240.933 300.533C243.067 306.666 243.333 317.333 243.733 410.266L244.133 513.333H304.667H365.2L365.6 408.266L366 303.333L369.067 296.666C377.467 278.399 398.267 267.999 426.667 267.999C454 267.999 474 277.999 482.533 295.999L486 303.333L486.4 408.266L486.8 513.333H547.333H608V401.599C608 297.866 607.733 289.199 605.467 277.866C597.867 241.333 577.6 215.999 542.533 199.333C519.467 188.533 492.667 183.466 458.667 183.466C416.4 183.733 386.133 192.933 357.6 214.666L345.333 223.999L336.933 217.066C320.933 203.466 304.267 195.199 281.867 189.466C260.667 184.133 230.133 181.866 209.333 183.999Z" fill="black"/>
                <path d="M669.334 351.999V513.333H730.001H790.801L790.401 396.933L790.001 280.666L786.934 270.666C776.001 234.799 749.734 207.599 715.734 196.666C706.534 193.733 685.201 190.666 673.867 190.666H669.334V351.999Z" fill="black"/>
                <path d="M949.334 191.999C935.467 193.466 927.734 195.466 915.067 201.333C885.467 215.066 866.801 236.266 855.867 268.666L852.667 277.999L852.267 395.733L851.867 513.333L1100.27 513.066L1348.67 512.666L1349.07 447.599L1349.33 382.666H1161.33H973.334V351.999V321.333H1161.33H1349.33L1349.07 256.266L1348.67 191.333L1154 191.199C1046.93 191.066 954.801 191.466 949.334 191.999Z" fill="black"/>
              </svg>
            </td>
          </tr>
          
          <!-- Main Heading -->
          <tr>
            <td align="center" style="padding: 20px 40px;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #915AFF; line-height: 1.2;">
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
              <a href="{{siteUrl}}" style="display: inline-block; padding: 14px 32px; background-color: #915AFF; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600;">
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
  
  return {
    email,
    siteUrl,
  };
}
