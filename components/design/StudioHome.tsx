import Image from "next/image";
import Link from "next/link";
import EditorHomeLink from "./EditorHomeLink";
import { ArrowRight, ArrowUpRight, FileCheck2, Headphones, MessageCircle } from "lucide-react";
import ProductCollection, { type DesignProduct } from "./ProductCollection";
import QuickPrintCalculator from "./QuickPrintCalculator";
import { brandDesign as design, brandKey } from "@/lib/brandDesign";
import AiChatWidget from "@/components/AiChatWidget";

export default function StudioHome({ products }: { products: DesignProduct[] }) {
  const names: Record<string, string> = { banner: "Banner PVC", autocolante: "Autocolante", "carti-vizita": "Cărți de vizită", rollup: "Roll-up" };
  const leading = Object.keys(names);
  const rank = (id: string) => leading.includes(id) ? leading.indexOf(id) : leading.length;
  const studioProducts = [...products].sort((a, b) => rank(a.id) - rank(b.id)).map(p => ({ ...p, name: names[p.id] || p.name }));
  return <div className="design-page sp-home">
    <section className="sp-hero"><div className="sp-hero-media"><Image src={products.find(p => p.id === design.hero)?.image || products[0]?.image || "/placeholder.png"} alt={`Produse ${design.name}`} fill priority sizes="(max-width: 760px) 100vw, 58vw" /></div>
      <div className="design-wrap sp-hero-inner"><div className="sp-hero-copy"><p className="design-kicker">Alege. Compară. Configurează.</p><h1>{design.title}</h1><p className="design-intro">Bannere, autocolante, tipărituri, textile și decor. Alege produsul, dimensiunile și cantitatea, iar noi îți calculăm prețul.</p><div className="design-actions"><a href="#configuratoare" className="design-button">Alege produsul <ArrowRight size={19} /></a><Link href="/ghid-print" className="sp-secondary">Vezi cum comanzi <ArrowRight size={19} /></Link></div><a href="#asistent-print" className="sp-ai-link"><MessageCircle size={19} /> Ai întrebări? Întreabă asistentul AI <ArrowUpRight size={17} /></a><EditorHomeLink className="sp-ai-link" /></div>
      <div className="sp-quick"><QuickPrintCalculator /></div></div>
    </section>
    <section id="configuratoare" className="sp-featured"><div className="design-wrap"><div className="sp-section-heading"><h2>Alege produsul potrivit</h2><span className="sp-catalog-count">{products.length} produse pentru ideile tale</span></div><ProductCollection products={studioProducts} /></div></section>
    <div className="design-wrap sp-help-strip"><div><Headphones size={29} /><span><strong>Ai nevoie de ajutor cu alegerea?</strong><small>Suntem aici pentru ideile tale.</small></span></div><Link href="/pregatire-fisiere"><FileCheck2 size={27} /><span><strong>Pregătirea fișierelor</strong><small>Formate, rezoluție și culori pentru print</small></span><ArrowRight size={18} /></Link><a href="#asistent-print"><MessageCircle size={27} /><span><strong>Întreabă asistentul</strong><small>Găsește produsul potrivit proiectului tău</small></span><ArrowRight size={18} /></a></div>
    <section id="asistent-print" className="design-section"><div className="design-wrap sp-assistant"><div><span className="design-kicker">Asistentul {design.name}</span><h2>De la idee la produsul potrivit.</h2><p>Spune-ne ce vrei să realizezi și te ajutăm să alegi materialul, formatul și finisajele.</p><Link href="/contact" className="design-text-link">Discută cu echipa noastră <ArrowRight size={18} /></Link></div><AiChatWidget compact /></div></section>
  </div>;
}
