"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signageProducts } from "@/lib/products/signage-products";

export default function SignageModelShelf() {
  const [search, setSearch] = useState("");
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const products = signageProducts.filter(product => normalize(`${product.title} ${product.category}`).includes(normalize(search.trim())));
  return <section data-signage-models className="mx-auto my-5 max-w-7xl rounded-2xl border border-slate-200 bg-white p-4">
    <h2 className="text-2xl font-bold text-slate-900">Modele de indicatoare și semnalistică</h2>
    <label className="mt-4 block text-sm font-semibold text-slate-800">Caută un model<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="De exemplu: acces interzis, parcare, ieșire" className="mt-2 w-full rounded-xl border border-slate-300 p-3"/></label>
    <p role="status" className="my-4 text-sm text-slate-600">{products.length} modele disponibile</p>
    <div className="grid max-h-[360px] grid-cols-2 gap-3 overflow-y-auto overscroll-contain pr-2 sm:max-h-[420px] sm:grid-cols-3 lg:grid-cols-5">{products.map(product => <Link data-signage-model key={product.slug} href={`/configurator/semnalistica?product=${encodeURIComponent(product.slug)}`} className="overflow-hidden rounded-xl border border-slate-200 p-3 hover:shadow-md"><div className="relative h-28 sm:h-32"><Image src={product.image} alt={product.title} fill loading="lazy" sizes="(max-width:640px) 45vw, 18vw" className="object-contain p-2"/></div><h3 className="mt-3 text-sm font-bold text-slate-900">{product.title}</h3><p className="mt-2 text-sm font-semibold text-slate-700">Alege dimensiunea și materialul →</p></Link>)}</div>
  </section>;
}
