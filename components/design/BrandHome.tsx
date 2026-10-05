import { EDITORIAL_POSTS } from "@/lib/blogPosts";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileCheck2, MapPin, SlidersHorizontal } from "lucide-react";
import { CONFIGURATORS_REGISTRY } from "@/lib/configurators-registry";
import { getFromPrice } from "@/lib/seo/fromPrice";
import { brandDesign as design, brandKey, brandEditorial as editorial } from "@/lib/brandDesign";
import ProductCollection, { ProductCard, type DesignProduct } from "./ProductCollection";
import AiChatWidget from "@/components/AiChatWidget";

export function designProducts(localBase?: string): DesignProduct[] {
  return CONFIGURATORS_REGISTRY.map(product => {
    const from = getFromPrice([product.id]);
    return { id: product.id, name: product.name, image: product.image || "/placeholder.png", href: localBase ? `${localBase}/${product.slug || product.id}` : product.url, category: product.category, price: from?.text, basis: from?.basis };
  });
}

export function DesignSteps() {
  return <ol className="design-steps">{design.steps.map((step, index) => <li key={step.title}><span className="design-step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>;
}

export default function BrandHome() {
  const products = designProducts();
  const focus = design.focus.flatMap(id => products.filter(p => p.id === id));
  const story = <section className="design-section design-story"><div className="design-wrap design-story-grid"><div><span className="design-kicker">{editorial.storyKicker}</span><h2>{design.storyTitle}</h2></div><div><p>{design.story}</p><Link href="/pregatire-fisiere" className="design-text-link">Verifică fișierul pentru print <ArrowUpRight size={18} /></Link></div></div></section>;
  return <div className={`design-page design-home design-home-${brandKey}`}>
    <section className="design-hero"><div className="design-wrap design-hero-grid">
      <div className="design-hero-copy"><p className="design-kicker"><span className="design-dot" />{design.eyebrow}</p><h1>{design.title}</h1><p className="design-intro">{design.intro}</p>
        <div className="design-actions"><a href="#configuratoare" className="design-button">{design.action}<ArrowRight size={19} /></a><Link href="/ghid-print" className="design-text-link">Ghid de alegere <ArrowUpRight size={18} /></Link></div>
        <div className="design-hero-note"><SlidersHorizontal size={17} /><span>Opțiuni și preț în configuratorul produsului</span></div>
        <a href="#asistent-print" className="design-text-link" style={{marginTop:16}}>Întreabă asistentul AI <ArrowUpRight size={17} /></a>
      </div>
      <div id="asistent-print" className="design-hero-assistant"><span className="design-kicker">Asistentul {design.name}</span><h2>{editorial.aiTitle}</h2><AiChatWidget compact /></div>
    </div></section>
    <div className="design-utility"><div className="design-wrap"><Link href="#configuratoare"><SlidersHorizontal size={19} />Catalog complet<span>{products.length} configuratoare</span></Link><Link href="/pregatire-fisiere"><FileCheck2 size={19} />Pregătirea graficii<span>Formate și rezoluție</span></Link><Link href="/print-romania"><MapPin size={19} />Destinația comenzii<span>Livrare în România</span></Link></div></div>
    <section className="design-section"><div className="design-wrap"><div className="design-section-heading"><div><span className="design-kicker">Un punct de pornire</span><h2>{brandKey === "tablou" ? "Pentru imaginea ta" : brandKey === "adbanner" ? "Fă loc mesajului tău" : brandKey === "homeprint" ? "O schimbare de perspectivă" : brandKey === "euprint" ? "Materiale pentru proiecte" : brandKey === "prynt" ? "De la idee la obiect" : "Explorează selecția"}</h2></div><a href="#configuratoare" className="design-text-link">Vezi gama completă <ArrowRight size={17} /></a></div><div className="design-focus-grid">{focus.map(product => <ProductCard key={product.id} product={product} />)}</div></div></section>
    {["homeprint", "tablou", "euprint"].includes(brandKey) && story}
    <section id="configuratoare" className="design-section design-catalog"><div className="design-wrap"><div className="design-section-heading"><div><span className="design-kicker">Catalog complet</span><h2>{design.catalogTitle}</h2><p>{design.catalogIntro}</p></div></div><ProductCollection products={products} /></div></section>
    {!["homeprint", "tablou", "euprint"].includes(brandKey) && story}
    <section className="design-section"><div className="design-wrap"><span className="design-kicker">De la alegere la comandă</span><h2 className="design-section-title">{editorial.stepsTitle}</h2><DesignSteps /></div></section>
    <section className="design-section"><div className="design-wrap"><div className="design-section-heading"><div><span className="design-kicker">HomePrint / Lecturi practice</span><h2>Planul unui perete de accent</h2></div><Link href="/blog" className="design-text-link">Explorează articolele <ArrowUpRight size={18} /></Link></div><div className="design-focus-grid">{EDITORIAL_POSTS.map(post => <article key={post.slug} className="rounded-2xl border border-slate-200 p-6"><h3 className="text-xl font-bold mb-3"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p className="mb-4">{post.description}</p><Link href={`/blog/${post.slug}`} className="design-text-link">Citește materialul <ArrowUpRight size={18} /></Link></article>)}</div></div></section>
    <section className="design-section design-help"><div className="design-wrap design-help-grid"><div><span className="design-kicker">{editorial.kicker}</span><h2>{editorial.title}</h2><p>{editorial.text}</p><Link href="/contact" className="design-button">{editorial.action} <ArrowUpRight size={18} /></Link></div><div className="design-guide-links">{["/ghid-print", "/pregatire-fisiere", "/print-romania"].map((href, i) => <Link key={href} href={href}><span>0{i + 1}</span><strong>{design.guides[i]}</strong><ArrowUpRight size={21} /></Link>)}</div></div></section>
  </div>;
}
