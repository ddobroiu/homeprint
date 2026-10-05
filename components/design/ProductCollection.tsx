"use client";

import { useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Search } from "lucide-react";

export type DesignProduct = { id: string; name: string; image: string; href: string; category: string; price?: string; basis?: string };
const categories: Record<string, string> = { outdoor: "Exterior", indoor: "Interior", textile: "Textile", publicitar: "Tipărituri", print: "Tipărituri", vinyl: "Autocolante", decor: "Decor", rigid: "Suporturi rigide", institutional: "Proiecte", events: "Evenimente" };
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function ProductCard({ product, priority = false }: { product: DesignProduct; priority?: boolean }) {
  return <Link href={product.href} className="design-product">
    <div className="design-product-image"><Image src={product.image} alt={product.name} fill sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw" className="object-contain" priority={priority} /></div>
    <div className="design-product-content"><span className="design-kicker">{categories[product.category] || product.category}</span><h3>{product.name}</h3>
      {product.price && <p className="design-product-price">de la <strong>{product.price}</strong><small>{product.basis}</small></p>}
      <span className="design-product-action">Configurează <ArrowUpRight size={17} aria-hidden /></span>
    </div>
  </Link>;
}

export default function ProductCollection({ products }: { products: DesignProduct[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const searchId = useId();
  const options = [...new Set(products.map(p => categories[p.category] || p.category))];
  const visible = products.filter(p => (!category || (categories[p.category] || p.category) === category) && normalize(`${p.name} ${categories[p.category] || p.category}`).includes(normalize(query.trim())));
  return <div>
    <div className="design-catalog-tools">
      <div className="design-search"><Search size={19} aria-hidden /><label className="sr-only" htmlFor={searchId}>Caută în configuratoare</label><input id={searchId} type="search" placeholder="Ce vrei să printezi?" value={query} onChange={event => setQuery(event.target.value)} /></div>
      <div className="design-filters" aria-label="Categorii de produse"><button type="button" aria-pressed={!category} onClick={() => setCategory("")}>Toate <span>{products.length}</span></button>{options.map(option => <button type="button" key={option} aria-pressed={category === option} onClick={() => setCategory(option)}>{option}</button>)}</div>
    </div>
    <p className="design-results" aria-live="polite">{visible.length} {visible.length === 1 ? "configurator disponibil" : "configuratoare disponibile"}</p>
    <div className="design-product-grid">{visible.map(product => <ProductCard key={product.id} product={product} />)}</div>
    {!visible.length && <div className="design-empty"><p>Nu am găsit un produs pentru această selecție.</p><button type="button" className="design-button" onClick={() => { setQuery(""); setCategory(""); }}>Vezi toate produsele</button></div>}
  </div>;
}
