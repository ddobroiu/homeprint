import { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import "./brand-design.css";
import "./studio-home.css";
import "./brand-help.css";
import "./editorial.css";
import "./homeprint-presentation.css";
import "./configurator-studio.css";
import { brandKey, brandDesign } from "@/lib/brandDesign";
import { Providers } from "../components/Providers";
import GlobalStructuredData from "../components/GlobalStructuredData";
import Header from "../components/Navbar"; // Use Navbar as Header
import Footer from "../components/Footer";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";
import ContactButton from "../components/ContactButton";
import CookieConsent from "../components/CookieConsent";
import { CONSENT_MODE_BOOTSTRAP } from "@/lib/cookieConsent";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Warm editorial serif for headings - deliberately distinct from the
// all-sans-serif look shared by the rest of the site network.
const outfit = Fraunces({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "600", "700", "900"],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.homeprint.ro"),
  title: {
    default: "HomePrint.ro - Fototapet, Canvas și Decor Printat pentru Casă și Birou",
    template: "%s | HomePrint",
  },
  description: brandDesign.intro,
  keywords: [
    "fototapet personalizat",
    "tablou canvas personalizat",
    "postere de artă",
    "autocolante decorative perete",
    "decor birou",
    "print pentru casă",
    "bannere publicitare",
    "materiale rigide",
    "homeprint"
  ],
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  verification: {
    google: 'FPQT6X0QSD',
  },
  openGraph: {
    title: "HomePrint.ro | Decor printat pentru casă și birou",
    description: brandDesign.intro,
    url: "https://www.homeprint.ro",
    siteName: "HomePrint.ro",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/products/tapet/tapet-1.jpg",
        width: 1200,
        height: 630,
        alt: "HomePrint.ro - Fototapet personalizat montat într-un living",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HomePrint.ro | Fototapet, canvas și decor printat",
    description: brandDesign.intro,
    images: ["/products/tapet/tapet-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" data-theme="light">
      <head>
        {/* Consent Mode v2 — implicit refuzat; rulează înaintea oricărui script Google.
            Scripturile de statistică/marketing (GA4, Ads, GTM, Meta, t.js) le încarcă CookieConsent,
            numai după consimțământ (config în lib/company.ts → TRACKING). */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_MODE_BOOTSTRAP }} />
        <link rel="icon" href="/logo.svg" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
      </head>

      <body data-brand={brandKey} className={`${inter.variable} ${outfit.variable} bg-white text-slate-900 antialiased font-sans selection:bg-amber-500 selection:text-white relative`}>
        <CookieConsent />
        <Providers>
          <Header />
          <main className="w-full overflow-x-hidden">
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
          </main>
          <Footer />
          <GlobalStructuredData />
          <ContactButton />
        </Providers>
      </body>
    </html>
  );
}
