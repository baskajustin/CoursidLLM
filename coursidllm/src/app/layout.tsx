import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "CoursidLLM — AI-Powered Learning Platform",
    template: "%s | CoursidLLM",
  },
  description:
    "Learn faster with AI-augmented courses, an LLM tutor, skills gap analysis, and career path recommendations.",
  keywords: ["online learning", "AI tutor", "courses", "skills", "career"],
  openGraph: {
    title: "CoursidLLM",
    description: "AI-Powered Learning Platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
