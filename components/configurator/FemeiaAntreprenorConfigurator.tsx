"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import type { CompanyData } from '@/lib/anaf';
import { FA_AGENCIES, FA_PRICE, FA_PRODUCT, FA_PRODUCT_ID, FA_ROUTE } from '@/lib/femeia-antreprenor';
import { useCart } from '@/components/CartContext';

export default function FemeiaAntreprenorConfigurator() {
  const { addItem } = useCart();
  const [cui, setCui] = useState('');
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [agency, setAgency] = useState('');
  const selectedAgency = FA_AGENCIES.find(a => a.id === agency);
  const preview = selectedAgency || FA_AGENCIES[0];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const lookupVersion = useRef(0);
  async function lookup() {
    const clean = cui.replace(/^RO/i, '').trim();
    if (!/^\d{2,10}$/.test(clean)) { setError('Introdu un CUI valid.'); return; }
    const version = ++lookupVersion.current;
    setLoading(true); setError(''); setCompany(null);
    try {
      const response = await fetch(`/api/company?cui=${encodeURIComponent(clean)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Datele firmei nu sunt disponibile.');
      if (version === lookupVersion.current) setCompany(data);
    } catch (e) { if (version === lookupVersion.current) setError(e instanceof Error ? e.message : 'Nu am putut verifica firma.'); }
    finally { if (version === lookupVersion.current) setLoading(false); }
  }
  function add() {
    const selected = FA_AGENCIES.find(a => a.id === agency);
    if (!selected || (cui.trim() && !company)) return;
    addItem({ productId: FA_PRODUCT_ID, slug: FA_PRODUCT_ID, routeSlug: FA_ROUTE.slice(1),
      title: `${FA_PRODUCT.title} — ${selected.name}`, price: FA_PRICE, quantity: 1, image: selected.image,
      width: 42, height: 29.7,
      metadata: { productType: FA_PRODUCT_ID, company, agency: selected,
        productImage: selected.image, format: 'A3', material: 'PVC 3 mm', piecesPerSet: 2 } });
  }
  return <main className="brand-configurator py-10 px-4 bg-slate-50">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <Image src={preview.image} alt={`Model plăcuță Femeia Antreprenor — agenția ${preview.name}`} width={800} height={564} className="w-full h-auto object-contain" priority />
        <div className="grid grid-cols-3 gap-3 mt-5" aria-label="Galerie plăcuțe Femeia Antreprenor">
          {FA_AGENCIES.map(a => <button key={a.id} type="button" aria-label={`Vezi modelul ${a.name}`} aria-pressed={preview.id === a.id} onClick={() => setAgency(a.id)} className={`rounded-lg border-2 p-2 ${preview.id === a.id ? 'border-[var(--design-accent)] bg-[var(--design-soft)]' : 'border-slate-200 bg-white'}`}>
            <Image src={a.image} alt={`Plăcuțe — agenția ${a.name}`} width={200} height={141} className="w-full h-auto object-contain rounded" />
            <span className="block mt-2 text-xs font-semibold">{a.name}</span>
          </button>)}
        </div>
        <p className="text-xs text-slate-600 mt-4">Model de prezentare. Agenția aleasă va apărea pe plăcuțele comandate.</p>
      </div>
      <div className="space-y-5">
        <div><h1 className="text-2xl font-bold">Plăcuțe Femeia Antreprenor</h1><p className="text-slate-600 mt-2">Set de 2 bucăți · A3 · PVC 3 mm · rezistente la intemperii</p></div>
        <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
          <div>
            <label htmlFor="fa-agency" className="block font-semibold mb-3">1. Alege agenția</label>
            <select id="fa-agency" value={agency} onChange={e => setAgency(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-3">
              <option value="">Alege agenția</option>
              {FA_AGENCIES.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
          <div className="border-t border-slate-200 pt-4">
          <label htmlFor="fa-cui" className="block font-semibold">2. CUI-ul firmei (opțional)</label>
          <p id="fa-cui-purpose" className="text-sm text-slate-600 my-2">Dacă îl completezi, preluăm datele firmei din ANAF și le completăm automat la checkout, pe persoană juridică. Factura și contractul folosesc datele de facturare de la checkout. Poți continua și fără CUI aici.</p>
          <div className="flex gap-2"><input id="fa-cui" aria-describedby="fa-cui-purpose" value={cui} onChange={e => {lookupVersion.current++;setCui(e.target.value);setCompany(null);setLoading(false);setError('');}} placeholder="Ex. 12345678" className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2" />
            <button type="button" disabled={loading} onClick={lookup} className="design-button !p-3">{loading ? 'Se verifică…' : 'Verifică firma'}</button></div>
          {error && <p role="alert" className="text-red-700 text-sm">{error}</p>}
          {company && <div className="bg-[var(--design-soft)] rounded-lg p-3 text-sm" role="status"><strong>{company.denumire}</strong><p>CUI {company.cui} · {company.regCom}</p><p>{company.adresa}</p></div>}
          </div>
        </section>
        <section className="bg-white border border-slate-200 rounded-xl p-5"><div className="flex justify-between items-center"><strong className="text-3xl">{FA_PRICE} lei</strong><span className="text-sm font-semibold text-[var(--design-accent)]">Transport gratuit</span></div><p className="text-sm text-slate-600 mt-2">Preț final pentru setul de 2 plăcuțe.</p><button type="button" disabled={!agency || loading || (!!cui.trim() && !company)} onClick={add} className="design-button w-full mt-5 disabled:opacity-50 disabled:cursor-not-allowed">Adaugă în coș</button></section>
        <details className="bg-white border border-slate-200 rounded-xl p-5"><summary className="font-semibold cursor-pointer">Detalii produs</summary><p className="text-sm text-slate-600 mt-3">Setul conține 2 plăcuțe A3 (42 × 29,7 cm), din PVC de 3 mm, rezistente la intemperii. Firma este identificată prin CUI, iar datele sale sunt preluate din ANAF.</p></details>
      </div>
    </div>
  </main>;
}
