import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from '@/components/ChatWidget';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700", "800"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", style: ["italic"], weight: ["400", "500", "600", "700"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: {
    default: "CareBot AI | Intelligent Tools for African Businesses",
    template: "%s | CareBot AI"
  },
  description: "CareBot AI builds intelligent, accessible, and locally relevant software that solves real problems for African businesses and individuals.",
  openGraph: {
    title: "CareBot AI | Intelligent Tools for African Businesses",
    description: "CareBot AI builds intelligent tools for African businesses and individuals. Home of NaijFleet, Naija Wellness Hub, and Owo Mi.",
    url: "https://carebot.ai",
    siteName: "CareBot AI",
    images: [
      {
        url: "/images/naijfleet-hero-v2.png",
        width: 1200,
        height: 630,
        alt: "CareBot AI Preview Image",
      }
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareBot AI | Intelligent Tools for African Businesses",
    description: "CareBot AI builds intelligent, accessible, and locally relevant software that solves real problems for African businesses.",
    images: ["/images/naijfleet-hero-v2.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body className="font-sans min-h-screen flex flex-col antialiased bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#E8533A]/30 selection:text-white relative">
        {/* Global SVG Noise Overlay */}
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-5 mix-blend-overlay">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
