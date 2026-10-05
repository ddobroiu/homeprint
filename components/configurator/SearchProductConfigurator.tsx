"use client";
import ConfiguratorModelShelf from "./ConfiguratorModelShelf";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, UploadCloud, Ruler } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastProvider";
import { AccordionStep } from "./ui/AccordionStep";
import { NumberInput } from "./ui/NumberInput";
import { OptionButton } from "./ui/OptionButton";
import { MobileConfiguratorSummary } from "./ui/MobileConfiguratorSummary";
import DeliveryEstimation from "./DeliveryEstimation";
import { ROLLUP_CONSTANTS, AFISE_CONSTANTS, AUTOCOLANTE_CONSTANTS, PVC_FOREX_CONSTANTS, formatMoneyDisplay } from "@/lib/pricing";
import { searchProductDefaults, searchProductMinQuantity, searchProductPath, searchProductPrice, type SearchProduct } from "@/lib/searchProductDefinitions";

const POSTER_DIMENSIONS: Record<string, [number, number]> = { A3: [29.7,42], A2: [42,59.4], A1: [59.4,84.1], A0: [84.1,118.9] };
export default function SearchProductConfigurator({ product }: { product: SearchProduct }) {
    const { addItem } = useCart();
    const { success } = useToast();
    const [options, setOptions] = useState(() => searchProductDefaults(product));
    const [step, setStep] = useState(1);
    const [customSize, setCustomSize] = useState(false);
    const [texts, setTexts] = useState<Record<string, string>>(() => ({ ...product.defaultTexts }));
    const [brief, setBrief] = useState("");
    const [artwork, setArtwork] = useState<string | null>(null);
    const [filename, setFilename] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const minQuantity = searchProductMinQuantity(product, options.width, options.height);
    useEffect(() => { if (options.quantity < minQuantity) setOptions(current => ({ ...current, quantity: minQuantity })); }, [minQuantity, options.quantity]);
    const price = searchProductPrice(product, options);
    const isRollup = product.category === "rollup";
    const isPVC = product.category === "pvc-forex";
    const fee = isRollup ? ROLLUP_CONSTANTS.PRO_DESIGN_FEE : isPVC ? PVC_FOREX_CONSTANTS.PRO_DESIGN_FEE : product.category === "afise" ? AFISE_CONSTANTS.PRO_DESIGN_FEE : AUTOCOLANTE_CONSTANTS.PRO_DESIGN_FEE;
    const valid = options.width > 0 && options.height > 0 && Number.isFinite(options.width) && Number.isFinite(options.height) && Number.isInteger(options.quantity) && options.quantity >= minQuantity && price.total > 0 && (!isPVC || (options.width <= PVC_FOREX_CONSTANTS.LIMITS.MAX_WIDTH && options.height <= PVC_FOREX_CONSTANTS.LIMITS.MAX_HEIGHT));
    const modelHasText = product.slug !== "laptop" && !product.optionalTexts;
    const canAdd = valid && !uploading && (options.design === "upload" ? !!artwork : options.design === "pro" ? !!brief.trim() : !modelHasText || product.fields.every(field => !!texts[field]?.trim()));
    const materialLabel = isRollup ? "Roll-up personalizat" : isPVC ? `PVC Forex ${options.thickness} mm` : product.category === "afise" ? AFISE_CONSTANTS.MATERIALS.find(m => m.key === options.material)?.label : AUTOCOLANTE_CONSTANTS.MATERIALS.find(m => m.key === options.material)?.label;
    const inputClass = "mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-base text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500";

    async function upload(file: File | null) {
        if (!file) return;
        setArtwork(null); setFilename(""); setUploadError(""); setUploading(true);
        try {
            const form = new FormData(); form.append("file",file);
            const response = await fetch("/api/upload", { method: "POST", body: form });
            if (!response.ok) throw new Error("Fișierul nu a fost salvat. Încearcă din nou.");
            const result = await response.json();
            if (typeof result.url !== "string" || !/^https?:\/\//.test(result.url)) throw new Error("Nu am primit un fișier salvat valid.");
            setArtwork(result.url); setFilename(file.name);
        } catch(e) { setUploadError(e instanceof Error ? e.message : "Încărcarea nu a reușit."); }
        finally { setUploading(false); }
    }
    function addToCart() {
        if (!canAdd) return;
        const useModelTexts = options.design === "standard";
        addItem({ id: `search-product-${product.category}-${product.slug}-${Date.now()}`, productId: product.category, slug: product.slug, routeSlug: searchProductPath(product), image: product.image, title: `${product.title} · ${options.width} × ${options.height} cm`, width: options.width, height: options.height, quantity: options.quantity, price: price.total/options.quantity, metadata: {
            "Model ales": product.title, "Model slug": product.slug, "Imagine": product.image, "Material": materialLabel,
            "Dimensiune": `${options.width} × ${options.height} cm`, ...(isPVC ? { "Grosime": `${options.thickness} mm`, "Decupare": options.contourCut ? "Contur special (+20%)" : "Margini drepte", "Taxă decupare": price.cut, contour_cut: options.contourCut } : {}), ...(product.category === "afise" ? { "Format": options.size } : isPVC || isRollup ? {} : { "Finisaje": options.laminated ? "Print + tăiere + laminare" : "Print + tăiere" }),
            "Grafică": options.design === "standard" ? "Modelul ales, cu textele din comandă" : options.design === "upload" ? "Grafică proprie" : "Grafică personalizată",
            designOption: options.design, "Taxă grafică": price.fee,
            ...(useModelTexts ? Object.fromEntries(Object.entries(texts).filter(([,value]) => value.trim()).map(([key,value]) => [key,value.trim()])) : {}),
            ...(options.design === "pro" ? { "Indicații grafică": brief.trim() } : {}),
            ...(options.design === "upload" && artwork ? { artworkUrl: artwork, "Fisier": artwork, "Nume fișier": filename } : {}),
        } });
        success("Produsul și opțiunile tale au fost adăugate în coș.");
    }
    return <div data-search-product-configurator className="grid items-start gap-8 pb-24 lg:grid-cols-2 lg:gap-12 brand-configurator">
        <div className="lg:sticky lg:top-24"><div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"><Image src={product.image} alt={product.title} fill priority className="object-contain p-5" sizes="(max-width:1024px) 100vw,50vw" /></div><p className="mt-3 text-sm leading-relaxed text-slate-500">Imaginea prezintă modelul de grafică. Personalizarea se transmite în comandă; textele introduse nu se schimbă automat în această fotografie.</p></div>
        <div className="space-y-5"><header><p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-700">{isRollup ? "Roll-up pentru afaceri" : isPVC ? "Decoruri PVC pentru petreceri" : product.category === "afise" ? "Afișe personalizate" : "Autocolante și etichete"}</p><h1 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">{product.title}</h1><p className="mt-3 leading-relaxed text-slate-600">{product.short}</p></header>
            <div className="rounded-2xl border border-gray-200 bg-white px-4 shadow-sm">
                <AccordionStep stepNumber={1} title="Dimensiuni & Cantitate" summary={`${options.width} × ${options.height} cm · ${options.quantity} buc.`} isOpen={step===1} onClick={()=>setStep(1)}>
                    <div className="grid grid-cols-2 gap-2">{isRollup ? ROLLUP_CONSTANTS.SIZES.map(({width_cm})=><OptionButton key={width_cm} active={options.width===width_cm} title={`${width_cm} × 200 cm`} onClick={()=>setOptions(current=>({...current,width:width_cm,height:200}))} />) : isPVC ? [50,80,100,120].map(height=>{const width=Math.round(product.width/product.height*height*10)/10;return <OptionButton key={height} active={!customSize&&options.height===height} title={`${height} cm înălțime`} subtitle={`${width} × ${height} cm`} onClick={()=>{setCustomSize(false);setOptions(current=>({...current,width,height}));}} />;}) : product.category === "afise" ? Object.entries(POSTER_DIMENSIONS).map(([size,[width,height]]) => <OptionButton key={size} active={options.size===size} title={size} subtitle={`${width} × ${height} cm`} onClick={()=>setOptions(current=>({...current,size,width,height}))} />) : [0.75,1,1.5,2].map(factor=>{const width=Math.round(product.width*factor*10)/10,height=Math.round(product.height*factor*10)/10;return <OptionButton key={factor} active={!customSize&&options.width===width&&options.height===height} title={`${width} × ${height} cm`} onClick={()=>{setCustomSize(false);setOptions(current=>({...current,width,height}));}} />;})}</div>
                    {isRollup ? <p className="mt-3 text-sm text-slate-600">Înălțime 200 cm. Alege una dintre lățimile disponibile.</p> : product.category !== "afise" ? <><button type="button" aria-expanded={customSize} onClick={()=>setCustomSize(!customSize)} className="mt-4 flex min-h-16 w-full items-center gap-3 rounded-xl border-2 border-emerald-600 bg-emerald-50 px-4 py-4 text-left font-bold text-emerald-900"><Ruler size={24} />Am nevoie de altă dimensiune</button>{customSize&&<div className="mt-4 grid grid-cols-2 gap-3">{(["width","height"] as const).map(key=><label key={key} className="text-sm font-medium">{key==="width"?"Lățime (cm)":"Înălțime (cm)"}<input aria-label={key==="width"?"Lățime (cm)":"Înălțime (cm)"} type="number" min={0.1} step={0.1} value={options[key]} onChange={e=>setOptions(current=>({...current,[key]:Number(e.target.value), ...(isPVC ? (key==="height" ? {width:Math.round(Number(e.target.value)*product.width/product.height*10)/10} : {height:Math.round(Number(e.target.value)*product.height/product.width*10)/10}) : {})}))} className={inputClass} /></label>)}</div>}</> : <Link href="/configurator/afise" className="mt-4 flex min-h-16 w-full items-center gap-3 rounded-xl border-2 border-emerald-600 bg-emerald-50 px-4 py-4 font-bold text-emerald-900"><Ruler size={24} />Vezi toate formatele de afiș</Link>}
                    {isPVC&&<p className="mt-3 text-sm text-slate-600">Lățimea și înălțimea sunt dimensiunile totale ale formei. Proporțiile modelului se păstrează. Maximum {PVC_FOREX_CONSTANTS.LIMITS.MAX_WIDTH} × {PVC_FOREX_CONSTANTS.LIMITS.MAX_HEIGHT} cm.</p>}<div className="mt-5"><NumberInput label="Cantitate" value={options.quantity} min={minQuantity} onChange={quantity=>setOptions(current=>({...current,quantity}))} /></div>{minQuantity>1&&<p className="mt-2 text-sm text-slate-500">Pentru etichete de cel mult 10 × 10 cm, cantitatea minimă este {minQuantity} bucăți, </p>}
                    <button type="button" onClick={()=>setStep(2)} className="btn-outline mt-5 px-4 py-3 font-semibold">Continuă cu materialul →</button>
                </AccordionStep>
                <AccordionStep stepNumber={2} title={isRollup?"Sistem roll-up":isPVC?"Grosime & Decupare":"Material & Finisaje"} summary={`${materialLabel}${options.contourCut&&isPVC?" · Contur special +20%":""}${options.laminated?" · Laminare":""}`} isOpen={step===2} onClick={()=>setStep(2)}>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{isRollup ? <p className="col-span-full text-sm text-slate-600">Configurația folosește prețul existent pentru roll-up la lățimea și cantitatea selectate.</p> : isPVC ? PVC_FOREX_CONSTANTS.AVAILABLE_THICKNESS.map(t=><OptionButton key={t} active={options.thickness===t} title={`${t} mm`} onClick={()=>setOptions(current=>({...current,thickness:t}))} />) : (product.category === "afise" ? AFISE_CONSTANTS.MATERIALS.filter(m=>m.key.startsWith("paper_")) : AUTOCOLANTE_CONSTANTS.MATERIALS).map(m=><OptionButton key={m.key} active={options.material===m.key} title={m.label} onClick={()=>setOptions(current=>({...current,material:m.key}))} />)}</div>
                    {isPVC&&<div className="mt-4 rounded-xl border-2 border-emerald-600 bg-emerald-50 p-4"><label className="flex items-start gap-3 font-semibold"><input data-pvc-contour type="checkbox" checked={options.contourCut} onChange={e=>setOptions(current=>({...current,contourCut:e.target.checked}))} className="mt-1" />Decupare pe contur special · +20%</label><p className="mt-2 text-sm text-slate-600">Prețul PVC include materialul și imprimarea. Decuparea costă 20% din acest preț, fără grafică sau transport. {options.contourCut?"Piesa va fi decupată după siluetă.":"Placa are margini drepte: este pătrată dacă lățimea și înălțimea sunt egale și dreptunghiulară dacă sunt diferite."} Suportul și montajul nu sunt incluse.</p></div>}{product.category === "autocolante"&&<label className="mt-4 flex items-center gap-3 text-sm"><input type="checkbox" checked={options.laminated} onChange={e=>setOptions(current=>({...current,laminated:e.target.checked}))} />Adaugă laminare</label>}
                    <button type="button" onClick={()=>setStep(3)} className="btn-outline mt-5 px-4 py-3 font-semibold">Continuă cu grafica →</button>
                </AccordionStep>
                <AccordionStep stepNumber={3} title="Grafică & Personalizare" summary={options.design==="standard"?"Păstrez modelul":options.design==="upload"?"Grafică proprie":"Grafică personalizată"} isOpen={step===3} onClick={()=>setStep(3)} isLast>
                    {isPVC&&<Link href="/configurator/personaj-propriu" className="mb-4 block rounded-xl border-2 border-emerald-600 bg-emerald-50 p-4 font-semibold">Vreau alt personaj din imaginea mea · prelucrare +50 lei →</Link>}
                    <div className="space-y-2">{([{value:"standard",label:"Păstrez modelul și completez textele"},{value:"upload",label:"Încarc grafica mea"},{value:"pro",label:`Vreau grafică personalizată · +${formatMoneyDisplay(fee)}`}] as const).map(mode=><label key={mode.value} className={`flex cursor-pointer gap-3 rounded-xl border-2 p-4 text-sm font-semibold ${options.design===mode.value?"border-emerald-600 bg-emerald-50":"border-gray-300"}`}><input type="radio" name={`graphic-${product.slug}`} value={mode.value} checked={options.design===mode.value} onChange={()=>setOptions(current=>({...current,design:mode.value}))} />{mode.label}</label>)}</div>
                    {options.design==="standard"&&<div className="mt-4 space-y-3">{product.fields.map(field=><label key={field} className="block text-sm font-medium">{field}{product.optionalTexts?"":modelHasText?" (obligatoriu)":" (opțional)"}<textarea rows={2} maxLength={1500} value={texts[field]||""} onChange={e=>setTexts(current=>({...current,[field]:e.target.value}))} className={inputClass} /></label>)}</div>}
                    {options.design==="pro"&&<label className="mt-4 block text-sm font-medium">Descrie grafica dorită (obligatoriu)<textarea rows={4} maxLength={3000} value={brief} onChange={e=>setBrief(e.target.value)} className={inputClass} /></label>}
                    {options.design==="upload"&&<div className="mt-4"><label className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-5 text-center text-sm"><UploadCloud size={26} /><strong>Alege fișierul pregătit pentru imprimare</strong><input type="file" accept=".jpg,.jpeg,.png,.webp,.pdf,.svg,.ai,.eps,.tif,.tiff" disabled={uploading} onChange={e=>void upload(e.target.files?.[0]||null)} className="max-w-full" /></label>{uploading&&<p role="status" className="mt-3 text-sm">Se salvează fișierul…</p>}{filename&&artwork&&<p role="status" className="mt-3 break-words text-sm text-emerald-700">Fișier salvat: {filename}</p>}{uploadError&&<p role="alert" className="mt-3 text-sm text-red-700">{uploadError}</p>}</div>}
                </AccordionStep>
            </div>
            <section className="rounded-2xl border border-gray-200 bg-white p-5"><dl className="space-y-2 text-sm"><div className="flex justify-between gap-3"><dt>{isPVC ? "PVC imprimat · material inclus" : "Print"} · {options.quantity} buc.</dt><dd>{formatMoneyDisplay(price.print)}</dd></div>{isPVC&&<div className="flex justify-between gap-3"><dt>Decupare contur · 20%</dt><dd data-pvc-cut-price={price.cut}>{formatMoneyDisplay(price.cut)}</dd></div>}<div className="flex justify-between gap-3"><dt>Grafică</dt><dd>{formatMoneyDisplay(price.fee)}</dd></div><div className="flex justify-between gap-3 border-t pt-3 text-xl font-bold"><dt>Total</dt><dd data-search-product-total={price.total}>{formatMoneyDisplay(price.total)}</dd></div></dl><button type="button" disabled={!canAdd} onClick={addToCart} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-4 text-lg font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"><ShoppingCart size={20} />Adaugă în coș</button>{!canAdd&&<p role="status" className="mt-3 text-sm text-slate-600">{!valid?"Verifică dimensiunile și cantitatea.":uploading?"Așteaptă salvarea fișierului.":options.design==="upload"?"Încarcă grafica pentru a continua.":options.design==="pro"?"Descrie grafica pe care o dorești.":"Completează textele modelului în pasul Grafică & Personalizare."}</p>}<div className="mt-4"><DeliveryEstimation /></div></section>
        </div><ConfiguratorModelShelf category={product.category} excludeSlug={product.slug}/><MobileConfiguratorSummary total={price.total} onAdd={addToCart} disabled={!canAdd} />
    </div>;
}
