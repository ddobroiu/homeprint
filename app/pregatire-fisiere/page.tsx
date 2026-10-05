import { EDITORIAL_POSTS } from "@/lib/blogPosts";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { fileReadiness } from "@/lib/seo/fileReadiness";
import { printGuide } from "@/lib/seo/printGuide";
import { getLocalProductFacts } from "@/lib/seo/localProductFacts";
import { CONFIGURATORS_REGISTRY } from "@/lib/configurators-registry";
import { Breadcrumbs } from "@/components/seo/LocalitySeo";
import PrintFileCalculator from "@/components/seo/PrintFileCalculator";

const readiness=fileReadiness(siteConfig.url);
const guide=printGuide(siteConfig.url);
export const metadata:Metadata={title:`${readiness.title} | ${siteConfig.name}`,description:readiness.intro.slice(0,160),alternates:{canonical:`${siteConfig.url}/pregatire-fisiere`},robots:{index:true,follow:true}};

export default function FileReadinessPage(){
 return <main className="bg-white pb-16 pt-24 text-slate-900"><div className="mx-auto max-w-5xl px-4 sm:px-6">
  <Breadcrumbs siteUrl={siteConfig.url} items={[{name:"Acasă",href:"/"},{name:"Pregătirea fișierului"}]} className="mb-6 flex gap-2 text-sm text-slate-600" />
  <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{readiness.title}</h1><p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">{readiness.intro}</p>
  <section className="mt-10"><h2 className="text-2xl font-bold">Verifică dimensiunea și numărul de pixeli</h2><p className="my-4 text-slate-600">Introdu dimensiunea finală și dimensiunile fotografiei originale. Alege o țintă pentru calcul; distanța de privire, materialul și produsul contează pentru acceptarea fișierului.</p><PrintFileCalculator width={readiness.width} height={readiness.height} ppi={readiness.ppi} /></section>
  <section className="mt-12 rounded-2xl bg-slate-50 p-6"><h2 className="text-2xl font-bold">Înainte să exporți</h2><p className="mt-4 leading-relaxed text-slate-700">{readiness.check}</p><ul className="mt-5 list-disc space-y-3 pl-5 text-slate-700"><li>Verifică dimensiunea documentului și orientarea.</li><li>Păstrează textul și logo-ul clare; înglobează fonturile sau convertește-le în curbe când exportul o cere.</li><li>Verifică fotografia originală la încadrarea finală, inclusiv elementele apropiate de margine.</li><li>Confirmă profilul de culoare și cerințele de export pentru material. Culorile ecranului nu reprezintă o probă fizică de print.</li></ul></section>
  <section className="mt-12"><h2 className="text-2xl font-bold">Cerințele produselor pe care le poți comanda</h2><div className="mt-6 grid gap-5 md:grid-cols-3">{guide.choices.map(c=>{const facts=getLocalProductFacts([c.product])?.facts;const config=CONFIGURATORS_REGISTRY.find(p=>p.id===c.product);return <article key={c.product} className="rounded-2xl border border-slate-200 p-5"><h3 className="text-lg font-semibold">{c.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{facts?.artwork || c.check}</p><Link href={`/configurator/${config?.slug || c.product}`} className="mt-5 inline-block font-semibold underline">Verifică în configurator</Link></article>})}</div></section>
  <nav aria-label="Ghiduri și comandă" className="mt-10 flex flex-wrap gap-5"><Link href="/ghid-print" className="font-semibold underline">Materiale, formate și prețuri</Link><Link href="/print-romania" className="font-semibold underline">Comandă cu livrare în România</Link><Link href="/contact" className="font-semibold underline">Întreabă despre fișierul tău</Link></nav>
<section className="mt-10 rounded-2xl border border-slate-200 p-6"><h2 className="text-xl font-bold mb-4">Jurnal de amenajare HomePrint</h2><ul className="space-y-3">{EDITORIAL_POSTS.map(post => <li key={post.slug}><Link className="underline underline-offset-4" href={`/blog/${post.slug}`}>{post.title}</Link><p className="mt-1 text-sm text-slate-600">{post.description}</p></li>)}</ul></section>
 </div></main>;
}
