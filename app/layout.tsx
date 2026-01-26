import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CookieBanner } from "@/components/ui";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { generateOrganization, generateWebSite, generateFAQPage } from "@/lib/seo/structured-data";

const specialGothic = localFont({
  src: "../public/fonts/SpecialGothic-Regular.ttf",
  variable: "--font-heading",
  weight: "400",
  display: "swap",
});

const lexend = localFont({
  src: [
    {
      path: "../public/fonts/Lexend-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Lexend-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = generatePageMetadata('home');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5PKVTR4Q');`,
          }}
        />
      </head>
      <body className={`${specialGothic.variable} ${lexend.variable} antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5PKVTR4Q"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <AnalyticsProvider />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
