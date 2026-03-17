import Script from 'next/script';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sciatica Spot",
    template: "%s | Sciatica Spot",
  },
  description: "Physiotherapist-approved sciatica pain relief exercises, cushion reviews and treatment guides for 2026.",
  metadataBase: new URL("https://sciaticaspot.com"),
  openGraph: {
    siteName: "Sciatica Spot",
    type: "website",
    locale: "en_US",
    title: "Sciatica Spot — Physiotherapist-Approved Pain Relief Guides",
    description: "Physiotherapist-approved sciatica pain relief exercises, cushion reviews and treatment guides for 2026.",
    url: "https://sciaticaspot.com",
    images: [{
      url: "https://sciaticaspot.com/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Sciatica Spot — Physiotherapist-Approved Pain Relief Guides",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sciatica Spot — Physiotherapist-Approved Pain Relief Guides",
    description: "Physiotherapist-approved sciatica pain relief exercises, cushion reviews and treatment guides for 2026.",
    images: ["https://sciaticaspot.com/og-image.jpg"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Sciatica Spot",
  "url": "https://sciaticaspot.com",
  "description": "Expert sciatica pain relief guides and product reviews by Dr. James Harlow",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://sciaticaspot.com/?s={{search_term_string}}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LB6PM2KDRR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LB6PM2KDRR');
          `}
        </Script>
      </body>
    </html>
  );
}
