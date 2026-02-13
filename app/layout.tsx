import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CookieBanner } from "@/components/ui";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
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
        {/* Google Analytics (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DPB6FYJYYX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-DPB6FYJYYX');`,
          }}
        />
      </head>
      <body className={`${specialGothic.variable} ${lexend.variable} antialiased`} suppressHydrationWarning>
        <AnalyticsProvider />
        {children}
        <CookieBanner />
        <WhatsAppButton />
      </body>
    </html>
  );
}
