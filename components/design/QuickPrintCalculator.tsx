"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QUICK_PRINT_PRODUCTS, quickPrintDefaultFormat, type QuickPrintId, type QuickPrintResult } from "@/lib/quickPrintProducts";
import { formatMoneyDisplay } from "@/lib/pricing";

export default function QuickPrintCalculator() {
  const [product, setProduct] = useState<QuickPrintId>("banner");
  const [width, setWidth] = useState("100");
  const [height, setHeight] = useState("50");
  const [quantity, setQuantity] = useState("1");
  const [result, setResult] = useState<QuickPrintResult | null>(null);
  const [format, setFormat] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);
  const revision = useRef(0);
  function clearResult() {revision.current++; setResult(null);}
  const selected = QUICK_PRINT_PRODUCTS.find(p => p.id === product)!;
  const bannerDimensions = ["banner", "banner-verso", "mesh"].includes(product);
  function changeProduct(id: QuickPrintId) {
    const item = QUICK_PRINT_PRODUCTS.find(p => p.id === id)!;
    setFormat(quickPrintDefaultFormat(item)); setProduct(id); setWidth(String(item.width)); setHeight(String(item.height)); setQuantity(String(item.quantity)); clearResult();
  }
  async function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const current = revision.current;
    setBusy(true);
    try {
      const response = await fetch("/api/quick-print-quote", {method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({product, width: Number(width), height: Number(height), quantity: Number(quantity), format})});
      const quote = await response.json() as QuickPrintResult;
      if (current === revision.current) setResult(quote);
    } catch {
      if (current === revision.current) setResult({error:"Prețul nu a putut fi calculat. Încearcă din nou."});
    } finally {setBusy(false);}
  }
  return <form className="sp-calculator" onSubmit={calculate} aria-label="Calculator rapid de preț">
    <div className={`sp-calculator-fields${selected.mode ? " sp-calculator-compact" : ""}`}>
      <label htmlFor="quick-product">Produs<select id="quick-product" value={product} onChange={e => changeProduct(e.target.value as QuickPrintId)}>{QUICK_PRINT_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
      {!selected.mode && <><label htmlFor="quick-width">Lățime (cm){product === "rollup" ? <select id="quick-width" value={width} onChange={e => {setWidth(e.target.value); clearResult();}}>{[85,100,120,150].map(w => <option key={w}>{w}</option>)}</select> : <input id="quick-width" type="number" min={bannerDimensions ? 50 : 1} max={bannerDimensions ? 500 : product === "autocolante" ? 137 : undefined} step="1" value={width} onChange={e => {setWidth(e.target.value); clearResult();}} required />}</label>
      <label htmlFor="quick-height">Înălțime (cm)<input id="quick-height" type="number" min={bannerDimensions ? 50 : 1} max={bannerDimensions ? 500 : product === "autocolante" ? 5000 : undefined} step="1" readOnly={product === "rollup"} value={height} onChange={e => {setHeight(e.target.value); clearResult();}} required /></label></>}
      {selected.formats && <label className="sp-format-field" htmlFor="quick-format">{selected.mode === "kit" ? "Element / format" : "Format"}<select id="quick-format" value={format ?? quickPrintDefaultFormat(selected)} onChange={e => {setFormat(e.target.value); clearResult();}}>{selected.formats.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}</select></label>}
      {selected.mode !== "guided" && <label htmlFor="quick-quantity">Cantitate (buc.)<input id="quick-quantity" type="number" min={selected.minQuantity ?? 1} max="100000" step="1" readOnly={selected.mode === "kit"} value={quantity} onChange={e => {setQuantity(e.target.value); clearResult();}} required /></label>}
      {selected.mode === "guided" ? <Link href={`/configurator/${product}`} className="design-button">Alege modelul <ArrowRight size={20} /></Link> : <button type="submit" disabled={busy} className="design-button">{busy ? "Se calculează…" : "Calculează prețul"} <ArrowRight size={20} /></button>}
    </div>
    <p className="sp-calculator-note">{selected.note}. Grafica ta, gata de print.</p>
    <div aria-live="polite" aria-atomic="true">{result && ("error" in result ? <p className="sp-calculator-error" role="alert">{result.error}</p> : <div className="sp-quote"><div><span>Total pentru {selected.mode === "kit" ? "elementul ales" : `${quantity} buc.`}</span><strong>{formatMoneyDisplay(result.total)}</strong><small>{formatMoneyDisplay(result.unit)} / buc. · Transportul se calculează în coș.</small></div><Link href={result.href} className="design-text-link">Continuă configurarea <ArrowRight size={18} /></Link></div>)}</div>
  </form>;
}
