import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SovraPact — Instant Freelance Scope of Work (SOW) & Agreement Generator",
  description:
    "Generate legally structured Scope of Work (SOW) PDFs in 60 seconds. Protect against scope creep, define IP ownership, and secure client sign-off fast.",
  keywords: [
    "freelance scope of work generator",
    "SOW template PDF",
    "freelance contract generator",
    "scope creep protection",
    "agency proposal generator",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
