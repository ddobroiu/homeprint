"use client";

import Image from "next/image";
import Link from "next/link";
import { SEARCH_PRODUCTS, searchProductPath, searchProductPrice, searchProductDefaults } from "@/lib/searchProductDefinitions";
import { formatMoneyDisplay } from "@/lib/pricing";

export default function ConfiguratorModelShelf({ category, excludeSlug }: { category: string; excludeSlug?: string }) {
  const products = SEARCH_PRODUCTS.filter(p => p.category === category && p.slug !== excludeSlug);
  if (!products.length) return null;
  const characters = category === "pvc-forex";
  return <section data-configurator-models={category} className="col-span-full my-5 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
    <h2 className="text-2xl font-bold text-slate-900">{characters ? "Toate modelele de personaje și decoruri PVC" : "Alege un model pentru acest produs"}</h2>
    <p className="mt-2 text-sm leading-relaxed text-slate-600">{characters ? "Alege unul dintre modelele disponibile și configurează dimensiunea și cantitatea pe pagina lui. Pentru o imagine diferită, folosește configuratorul de personaj propriu." : "Deschide modelul dorit pentru a vedea imaginea, dimensiunile și opțiunile de personalizare."} {products.length} modele disponibile.</p>
    <div className="mt-4 grid max-h-[360px] grid-cols-2 gap-3 overflow-y-auto overscroll-contain pr-2 sm:max-h-[420px] sm:grid-cols-3 xl:grid-cols-5">{products.map(product => {
      const defaults = searchProductDefaults(product);
      return <Link data-configurator-model key={product.slug} href={searchProductPath(product)} className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
        <div className="relative h-28 sm:h-32"><Image src={product.image} alt={product.title} fill loading="lazy" sizes="(max-width:640px) 45vw, (max-width:1280px) 30vw, 18vw" className="object-contain p-3" /></div>
        <div className="p-3"><h3 className="text-sm font-bold text-slate-900">{product.title}</h3><p className="mt-2 font-semibold text-emerald-700">{formatMoneyDisplay(searchProductPrice(product).total)}</p><p className="mt-1 text-xs text-slate-600">{defaults.quantity} buc. · {category === "afise" ? defaults.size : `${defaults.width} × ${defaults.height} cm`}</p><span className="mt-2 inline-block text-sm font-semibold text-slate-800">Configurează modelul →</span></div>
      </Link>;
    })}</div>
  </section>;
}
