import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CookieBanner } from "@/components/ui";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";

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
      <body className={`${specialGothic.variable} ${lexend.variable} antialiased`}>
        <AnalyticsProvider />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
