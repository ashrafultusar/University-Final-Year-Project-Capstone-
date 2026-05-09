import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNavbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#10b981",
};

export const metadata: Metadata = {
  title: "LeafScan AI — Potato Disease Detection",
  description:
    "AI-powered potato leaf disease detection system. Upload or capture a leaf image to get instant diagnosis, confidence scores, and treatment recommendations.",
  keywords: ["potato disease", "plant disease detection", "AgTech", "AI", "leaf scan"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable} h-full`}>
      <body className="min-h-full antialiased" style={{ background: "var(--bg)" }}>
        {/* Mobile top navbar — visible only on sm screens */}
        <MobileNavbar />

        {/* Main layout: sidebar + content */}
        <div className="layout-with-sidebar">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
