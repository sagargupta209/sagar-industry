import type { Metadata } from "next";
import { cache } from "react";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrolling from "@/components/providers/SmoothScrolling";
import OfflineIndicator from "@/components/ui/OfflineIndicator";
import Preloader from "@/components/ui/Preloader";
import PageTransition from "@/components/providers/PageTransition";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

import dbConnect from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

const getSettings = cache(async () => {
  await dbConnect();
  return SiteSettings.findOne({});
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();
    
    return {
      title: settings?.metaTitle || "Sagar Industry | Premium Snacks & Namkeens",
      description: settings?.metaDescription || "Taste the authentic flavors of Gujarat with Sagar Industry's premium range of chips, namkeens, and fryums.",
      manifest: "/site.webmanifest",
      icons: {
        icon: "/favicon.ico",
        apple: "/logo.png",
      },
      openGraph: {
        title: settings?.metaTitle || "Sagar Industry | Premium Snacks & Namkeens",
        description: settings?.metaDescription || "Taste the authentic flavors of Gujarat with Sagar Industry's premium range of chips, namkeens, and fryums.",
        url: "https://sagarindustry.com",
        siteName: "Sagar Industry",
        images: settings?.ogImage ? [{ url: settings.ogImage, width: 1200, height: 630 }] : [],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: settings?.metaTitle || "Sagar Industry | Premium Snacks & Namkeens",
        description: settings?.metaDescription || "Taste the authentic flavors of Gujarat with Sagar Industry's premium range of chips, namkeens, and fryums.",
        images: settings?.ogImage ? [settings.ogImage] : [],
      },
    };
  } catch (error) {
    return {
      title: "Sagar Industry | Premium Snacks & Namkeens",
      description: "Taste the authentic flavors of Rajnandgaon with Sagar Industry's premium range of chips, namkeens, and fryums.",
    };
  }
}

import { SettingsProvider } from "@/context/SettingsContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${outfit.className} antialiased bg-gray-50 text-gray-900 overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <Preloader />
        <SmoothScrolling>
          <SettingsProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "LocalBusiness",
                  "name": "Sagar Industry",
                  "image": "https://sagarindustry.com/logo.png",
                  "@id": "https://sagarindustry.com",
                  "url": "https://sagarindustry.com",
                  "telephone": "+91 98765 43210",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Plot No. 45, GIDC Phase II",
                    "addressLocality": "Rajkot",
                    "postalCode": "360003",
                    "addressRegion": "Rajnandgaon",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 22.2736,
                    "longitude": 70.7389
                  },
                  "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday"
                    ],
                    "opens": "09:00",
                    "closes": "18:00"
                  }
                })
              }}
            />
            <Navbar />
            <main className="min-h-screen pt-[88px] md:pt-[148px]">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
            <OfflineIndicator />
          </SettingsProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
