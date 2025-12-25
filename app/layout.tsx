import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/ui";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";

const lexend = Lexend({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "mi-Era - A reliable space where teens can grow",
  description: "Own your era. A task-tracking app with AI assistant designed for teenagers aged 13-18.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap"
          rel="preconnect"
        />
      </head>
      <body className={`${lexend.variable} antialiased`}>
        <AnalyticsProvider />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
