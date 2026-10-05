import type { Metadata } from "next";
import BrandHome from "@/components/design/BrandHome";
import { brandDesign } from "@/lib/brandDesign";
import { siteConfig } from "@/lib/siteConfig";
import { CONFIGURATORS_REGISTRY } from "@/lib/configurators-registry";

const hero = CONFIGURATORS_REGISTRY.find(p => p.id === brandDesign.hero);
export const metadata: Metadata = {
  title: 'Fototapet, Canvas și Decor Printat pentru Casă și Birou | Preț Instant, Livrare 2-4 zile lucrătoare',
  description: 'HomePrint printează decor pentru casă și birou: fototapet personalizat, tablouri canvas, postere de artă, autocolante decorative de perete și plexiglas. Tot catalogul rămâne disponibil: bannere, roll-up, panouri rigide, textile, kituri fonduri UE. Preț instant, atelier propriu, livrare 2-4 zile lucrătoare.',
  keywords: ['fototapet personalizat', 'tablou canvas personalizat', 'postere de artă', 'autocolante decorative perete', 'decor birou', 'tapet foto living', 'canvas din poza ta', 'homeprint'],
  alternates: { canonical: siteConfig.url },
  openGraph: { title: 'HomePrint.ro — Decor printat pentru casă și birou', description: 'Fototapet, canvas, postere și autocolante de perete personalizate, cameră cu cameră. Preț instant în configurator, producție proprie.', url: siteConfig.url, siteName: siteConfig.name, locale: "ro_RO", type: "website", images: hero?.image ? [{ url: hero.image, alt: hero.name }] : [] },
  twitter: { card: "summary_large_image", title: 'HomePrint.ro — Decor printat pentru casă și birou', description: 'Fototapet, canvas, postere și autocolante de perete personalizate, cameră cu cameră. Preț instant în configurator, producție proprie.', images: hero?.image ? [hero.image] : [] },
};

export default function Home() { return <BrandHome />; }
