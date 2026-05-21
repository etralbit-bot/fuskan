import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppShell from "@/components/AppShell";
import SiteWideJsonLd from "@/components/SiteWideJsonLd";
import { rootLayoutMetadataExtras } from "@/lib/seo";
import { siteName, siteTagline } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  ...rootLayoutMetadataExtras(),
  title: {
    default: `${siteName} — Leather items manufacturer`,
    template: "%s | Fuskan Global Exports",
  },
  description: siteTagline,
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName,
    locale: "en_US",
    title: `${siteName} — Leather items manufacturer`,
    description: siteTagline,
    images: [{ url: "/logo.png", width: 512, height: 512, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Leather items manufacturer`,
    description: siteTagline,
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <SiteWideJsonLd />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
