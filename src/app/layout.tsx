import type { Metadata } from "next";
import { Barlow_Condensed, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const bodyFont = Noto_Sans_KR({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const displayFont = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const monoFont = Geist_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Work Calendar",
  description: "나의 작업 일지 📖 캘린더",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
