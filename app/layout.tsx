import { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import GlobalStructuredData from "../components/GlobalStructuredData";
import Header from "../components/Navbar"; // Use Navbar as Header
import Footer from "../components/Footer";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";
import ContactButton from "../components/ContactButton";
import CookieConsent from "../components/CookieConsent";
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
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.homeprint.ro"),
  title: {
    default: "HomePrint.ro - Tipar Digital & Producție Publicitară",
    template: "%s | HomePrint",
  },
  description:
    "Tipărire bannere, afise si autocolante la comanda cu livrare instanta. Livrare rapidă în toată țara.",
  keywords: [
    "tipar digital",
    "bannere publicitare",
    "afișe personalizate",
    "canvas pe pânză",
    "autocolante vinyl",
    "materiale rigide",
    "publicitate outdoor",
    "print online România",
    "homeprint"
  ],
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  verification: {
    google: 'FPQT6X0QSD',
  },
  openGraph: {
    title: "HomePrint.ro | Tipar Digital & Producție Publicitară",
    description:
      "Tipar digital profesional: bannere, afișe, canvas și autocolante. Configuratoare online cu prețuri instant.",
    url: "https://www.homeprint.ro",
    siteName: "HomePrint.ro",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "HomePrint.ro - Tipar Digital Profesional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HomePrint.ro | Print Digital Online",
    description: "Bannere, canvas și semnalistică cu personalizare rapidă.",
    images: ["/logo.png"],
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
        {/* Consent Mode v2 — must run before gtag.js, so it lives here in the root
            layout <head>. (`Script strategy="beforeInteractive"` is ignored inside
            client components, so it cannot live in CookieConsent.) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'granted',
                'security_storage': 'granted',
                'wait_for_update': 500
              });
              try {
                if (localStorage.getItem('cookie_consent') === 'granted') {
                  gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted',
                    'analytics_storage': 'granted'
                  });
                }
              } catch (e) {}
            `,
          }}
        />
        {/* GA4 property "homeprint.ro" (520944536). In the initial HTML so Google's
            tag checker can see it; Consent Mode above gates storage. */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4J0WMEX7J3" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('js', new Date());
              gtag('config', 'G-4J0WMEX7J3');
            `,
          }}
        />
        <link rel="icon" href="/logo.png" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
      </head>

      <body className={`${inter.variable} ${outfit.variable} bg-white text-slate-900 antialiased font-sans selection:bg-amber-500 selection:text-white relative`}>
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
