import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";
import SideNav from "@/components/SideNav";

const heading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Invoker Studio — Solusi Digital Custom",
  description:
    "Invoker Studio membangun solusi digital custom: Core, Dynamic, dan E-Commerce Suite — sesuai kebutuhan bisnis Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`dark ${heading.variable} ${body.variable}`}
    >
      <body className="relative">
        <a
          href="#main-content"
          className="skip-to-content"
        >
          Langsung ke konten
        </a>
        <AnimatedBackground />
        <SideNav />
        <main id="main-content" className="scroll-snap-container">
          {children}
        </main>
      </body>
    </html>
  );
}
