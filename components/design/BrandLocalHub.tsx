import type React from "react";
import { EDITORIAL_POSTS } from "@/lib/blogPosts";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { brandDesign as design, brandKey } from "@/lib/brandDesign";
import { siteConfig } from "@/lib/siteConfig";
import { Breadcrumbs, LocalityFacts, SourceNote } from "@/components/seo/LocalitySeo";
import { WhatsAppButton } from "@/components/seo/WhatsAppBar";
import ProductCollection, { ProductCard } from "./ProductCollection";
import { designProducts, DesignSteps } from "./BrandHome";
import { localOrConfigHref } from "@/components/seo/LocalTownBlocks";

type Neighbour = { name: string; slug: string; judetSlug: string; km?: number };
type Props = { loc: { name: string; slug: string }; judet: { name: string; slug: string }; localFact: string; neighbours: Neighbour[]; faq: { q: string; a: string }[]; waMessage: string; countyIllustration?: React.ReactNode };

export default function BrandLocalHub({ loc, judet, localFact, neighbours, faq, waMessage, countyIllustration }: Props) {
  const base = `/judet/${judet.slug}/${loc.slug}`;
  // Produsele de specialitate leagă pagina locală (indexabilă); restul, direct configuratorul.
  const products = designProducts(base).map(p => ({ ...p, href: localOrConfigHref(judet.slug, loc.slug, p.id) }));
  const focus = design.focus.flatMap(id => products.filter(p => p.id === id)).slice(0, 3);
  const hasKm = neighbours.some(p => typeof p.km === "number");
  return <div className={`design-page design-local design-local-${brandKey}`}>
    <section className="design-local-hero"><div className="design-wrap">
      <Breadcrumbs siteUrl={siteConfig.url} items={[{ name: "Acasă", href: "/" }, { name: "Județe", href: "/judet" }, { name: judet.name, href: `/judet/${judet.slug}` }, { name: loc.name }]} className="design-breadcrumbs" />
      <div className="design-local-grid"><div><p className="design-kicker"><MapPin size={15} />Livrare în {loc.name} · {judet.name}</p><h1>{design.localTitle} <em>{loc.name}.</em></h1><p className="design-intro">{design.localIntro}</p><div className="design-actions"><a href="#produse" className="design-button">Alege un produs <ArrowRight size={19} /></a><WhatsAppButton message={waMessage} className="design-whatsapp">Discută despre comandă</WhatsAppButton></div><a className="design-phone" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}><Phone size={15} />{siteConfig.phone}</a></div>
        <aside className="design-local-selection"><div className="design-selection-heading"><span className="design-kicker">Puncte de pornire</span><span>{design.name}</span></div><div className="design-local-focus">{focus.map(product => <ProductCard key={product.id} product={product} priority />)}</div><p className="design-selection-note">Comandă online, cu livrare prin curier. Această pagină nu indică existența unui punct de lucru în {loc.name}.</p></aside>
      </div>
    </div></section>
    <section id="produse" className="design-section design-catalog"><div className="design-wrap"><div className="design-section-heading"><div><span className="design-kicker">Gama completă</span><h2>{design.catalogTitle}</h2><p>Toate configuratoarele, pentru comenzi cu livrare în {loc.name}. Prețul final depinde de selecția din produs.</p></div></div><ProductCollection products={products} /></div></section>
    <section className="design-section design-story"><div className="design-wrap design-story-grid"><div><span className="design-kicker">Pregătirea comenzii</span><h2>{design.storyTitle}</h2></div><div><p>{design.story}</p><Link className="design-text-link" href="/pregatire-fisiere">Ghidul fișierului pentru print <ArrowUpRight size={18} /></Link></div></div></section>
    <section className="design-section"><div className="design-wrap"><span className="design-kicker">Comandă cu destinație în {loc.name}</span><h2 className="design-section-title">O alegere clară, pas cu pas.</h2><DesignSteps /></div></section>
    <section className="design-section design-local-information"><div className="design-wrap design-faq-grid"><div><span className="design-kicker">Detalii utile</span><h2>Înainte de a finaliza comanda.</h2><p>Verifică formatul, grafica și adresa. Pentru cerințe speciale, discută cu noi înainte de comandă.</p><Link href="/livrare" className="design-text-link">Informații despre livrare <ArrowUpRight size={18} /></Link></div><div className="design-faq">{faq.map(f => <details key={f.q}><summary>{f.q}<span aria-hidden>+</span></summary><p>{f.a}</p></details>)}</div></div></section>
    {(localFact || countyIllustration) && <section className="design-section"><div className="design-wrap design-area-note"><MapPin size={24} /><div className="min-w-0 flex-1"><h2>Contextul județului {judet.name}</h2>{localFact && <p>{localFact}</p>}{countyIllustration && <div className="mt-5 max-w-xl">{countyIllustration}</div>}</div></div></section>}
    <div className="design-wrap"><section className="mt-10 rounded-2xl border border-slate-200 p-6"><h2 className="text-xl font-bold mb-4">Jurnal de amenajare HomePrint</h2><ul className="space-y-3">{EDITORIAL_POSTS.map(post => <li key={post.slug}><Link className="underline underline-offset-4" href={`/blog/${post.slug}`}>{post.title}</Link><p className="mt-1 text-sm text-slate-600">{post.description}</p></li>)}</ul></section></div>
    <LocalityFacts judetSlug={judet.slug} locSlug={loc.slug} locName={loc.name} className="design-local-facts" />
    {!!neighbours.length && <section className="design-section design-neighbours"><div className="design-wrap"><span className="design-kicker">Destinații de livrare</span><h2>{hasKm ? `În apropiere de ${loc.name}` : `Și în județul ${judet.name}`}</h2><div className="design-place-links">{neighbours.map(l => <Link key={`${l.judetSlug}/${l.slug}`} href={`/judet/${l.judetSlug}/${l.slug}`}>{l.name}{typeof l.km === "number" && <small>{l.km.toLocaleString("ro-RO")} km</small>}<ArrowUpRight size={15} /></Link>)}<Link href={`/judet/${judet.slug}`}>Tot județul {judet.name}<ArrowRight size={15} /></Link></div>{hasKm && <SourceNote judetSlug={judet.slug} keys={["osm"]} prefix="Distanțe în linie dreaptă" />}</div></section>}
  </div>;
}
