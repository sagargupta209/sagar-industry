import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import dbConnect from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

export async function generateMetadata(): Promise<Metadata> {
  await dbConnect();
  const settings = await SiteSettings.findOne({});
  
  return {
    title: settings?.metaTitle || "Sagar Industry | Premium Snacks & Namkeens",
    description: settings?.metaDescription || "Taste the authentic flavors of Gujarat with Sagar Industry's premium range of chips, namkeens, and fryums.",
    openGraph: {
      images: settings?.ogImage ? [settings.ogImage] : [],
    }
  };
}

import { SettingsProvider } from "@/context/SettingsContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} antialiased bg-gray-50 text-gray-900`}
      >
        <SettingsProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SettingsProvider>
      </body>
    </html>
  );
}
