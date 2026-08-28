import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LocalBusinessJsonLd } from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AJIBAZ PAINT NIGERIA LIMITED – Professional Painting Services in Ogun State",
    template: "%s | AJIBAZ PAINT NIGERIA LIMITED",
  },
  description:
    "Professional residential and commercial painting services, custom colour mixing, and paint sales in Ogun State, Nigeria. Quality workmanship by AJIBAZ PAINT NIGERIA LIMITED.",
  openGraph: {
    title: "AJIBAZ PAINT NIGERIA LIMITED – Professional Painting Services",
    description:
      "Transform your space with expert painting, colour mixing, and quality materials from AJIBAZ PAINT NIGERIA LIMITED.",
    url: "https://www.ajibazpaint.com",
    siteName: "AJIBAZ PAINT NIGERIA LIMITED",
    locale: "en_NG",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocalBusinessJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
