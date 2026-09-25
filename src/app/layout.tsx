import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const siteUrl = "https://amzadpinso.dev";
const title = "Amzad Pinso — CSE Student | AI Researcher | Teaching Assistant";
const description =
  "Personal portfolio of Amzad Pinso, a Computer Science and Engineering student, undergraduate teaching assistant, and AI research enthusiast from Chattogram, Bangladesh. Exploring Explainable AI, ensemble learning, and healthcare analytics.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Amzad Pinso",
  },
  description,
  keywords: [
    "Amzad Pinso",
    "Computer Science",
    "Engineering",
    "AI Researcher",
    "Teaching Assistant",
    "Explainable AI",
    "Ensemble Learning",
    "Healthcare Analytics",
    "Machine Learning",
    "IIUC",
    "Bangladesh",
    "Portfolio",
  ],
  authors: [{ name: "Amzad Pinso", url: siteUrl }],
  creator: "Amzad Pinso",
  publisher: "Amzad Pinso",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Amzad Pinso Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/me/me.jpg",
        width: 1200,
        height: 630,
        alt: "Amzad Pinso — CSE Student & AI Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@amzadpinso",
    images: ["/images/me/me.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "portfolio",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Amzad Pinso",
  jobTitle: "Computer Science & Engineering Student, Teaching Assistant, AI Researcher",
  email: "mailto:contact.amzadpinso@gmail.com",
  telephone: "+8801537290195",
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chattogram",
    addressCountry: "Bangladesh",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "International Islamic University Chittagong",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Explainable AI",
    "Ensemble Learning",
    "Healthcare Analytics",
    "Machine Learning",
    "Data Science",
  ],
  sameAs: ["https://www.linkedin.com/in/amzad-pinso"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
