"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, UploadCloud, Check, Ruler, PencilRuler } from "lucide-react";
import { bannerProducts } from "@/lib/products/banner-products";
import { getLandingInfo } from "@/lib/landingData";
import { STOCK_BANNER_DEFAULTS } from "@/lib/configuratorPresets";
import { calculateBannerPrice, calculateBannerVersoPrice, formatMoneyDisplay, BANNER_CONSTANTS } from "@/lib/pricing";
import { siteConfig } from "@/lib/siteConfig";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastProvider";
import ArtworkFitEditor, { DEFAULT_FIT, fitMetadata, type ArtworkFit } from "./ArtworkFitEditor";
import BannerModeSwitch, { type BannerProductMode } from "./ui/BannerModeSwitch";
import { AccordionStep } from "./ui/AccordionStep";
import { OptionButton } from "./ui/OptionButton";
import { NumberInput } from "./ui/NumberInput";
import DeliveryEstimation from "./DeliveryEstimation";
import ProductJsonLd from "@/components/ProductJsonLd";
import PopularDesigns from "@/components/PopularDesigns";
import Reviews from "@/components/Reviews";

const SIZES = [{ w: 100, h: 50 }, { w: 150, h: 75 }, { w: 200, h: 100 }, { w: 250, h: 125 }, { w: 300, h: 150 }, { w: 400, h: 200 }];
type DesignMode = "standard" | "upload" | "pro";
const MODES: { value: DesignMode; title: string; detail: string }[] = [
    { value: "standard", title: "Păstrez grafica din exemplu", detail: "Poți adăuga un nume și un telefon. Fără taxă de grafică." },
    { value: "upload", title: "Încarc grafica mea", detail: "Ai deja macheta? Trimite fișierul pregătit pentru imprimare." },
    { value: "pro", title: "Vreau grafică personalizată", detail: "+50 lei pentru realizarea unei machete după indicațiile tale." },
];

export default function StockBannerConfigurator({ productSlug, renderOnlyConfigurator }: { productSlug: string; renderOnlyConfigurator?: boolean }) {
    const { addItem } = useCart();
    const { success, error } = useToast();
    const product = useMemo(() => {
        const found = bannerProducts.find(p => p.slug === productSlug);
        if (found) return found;
        const landing = getLandingInfo("bannere", productSlug);
        return landing ? { id: landing.key, slug: landing.key, title: landing.title, description: landing.shortDescription, image: landing.images?.[0] || "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp", category: "Bannere", longDescription: undefined } : undefined;
    }, [productSlug]);
    const [width, setWidth] = useState(STOCK_BANNER_DEFAULTS.width);
    const height = width / 2;
    const [customSize, setCustomSize] = useState(!SIZES.some(s => s.w === STOCK_BANNER_DEFAULTS.width && s.h === STOCK_BANNER_DEFAULTS.height));
    const [quantity, setQuantity] = useState(STOCK_BANNER_DEFAULTS.quantity);
    const [bannerMode, setBannerMode] = useState<BannerProductMode>("single");
    const [material, setMaterial] = useState<"frontlit_440" | "frontlit_510">(STOCK_BANNER_DEFAULTS.material);
    const materialLabel = bannerMode === "double" ? "Blockout 650g" : bannerMode === "mesh" ? "Mesh microperforat" : material === "frontlit_510" ? "Frontlit 510g Premium" : "Frontlit 440g Standard";
    const modeLabel = bannerMode === "double" ? "Față-verso" : bannerMode === "mesh" ? "Mesh" : "O singură față";
    const [wantWindHoles, setWantWindHoles] = useState(STOCK_BANNER_DEFAULTS.wantWindHoles);
    const [designOption, setDesignOption] = useState<DesignMode>("standard");
    const [addText, setAddText] = useState(false);
    const [contactName, setContactName] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [instructions, setInstructions] = useState("");
    const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [isImage, setIsImage] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [artworkFit, setArtworkFit] = useState<ArtworkFit>(DEFAULT_FIT);
    const [artworkPx, setArtworkPx] = useState<{ w: number; h: number } | null>(null);
    const [activeStep, setActiveStep] = useState(1);
    const [tab, setTab] = useState<"description" | "reviews">("description");
    const printPrice = useMemo(() => bannerMode === "double" ? calculateBannerVersoPrice({ width_cm: width, height_cm: height, quantity, want_wind_holes: wantWindHoles, same_graphic: true, designOption: "upload" }) : calculateBannerPrice({ width_cm: width, height_cm: height, quantity, material: bannerMode === "mesh" ? "mesh" : material, banner_type: "single", want_wind_holes: bannerMode === "mesh" ? false : wantWindHoles, want_hem_and_grommets: true, designOption: "upload" }), [width, height, quantity, material, wantWindHoles, bannerMode]);
    const graphicFee = designOption === "pro" ? BANNER_CONSTANTS.PRO_DESIGN_FEE : 0;
    const total = Math.round((printPrice.finalPrice + graphicFee) * 100) / 100;
    const validSize = Number.isFinite(width) && Number.isFinite(height) && width >= 2 && height >= 1 && width === height * 2 && Number.isInteger(quantity) && quantity > 0;
    const canOrder = validSize && !uploading && (designOption !== "upload" || !!artworkUrl) && (designOption !== "pro" || !!instructions.trim()) && (designOption !== "standard" || !addText || !!(contactName.trim() || contactPhone.trim() || instructions.trim()));

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setArtworkUrl(null); setUploadError(""); setUploading(true); setArtworkPx(null); setArtworkFit(DEFAULT_FIT); setFileName("");
        try {
            const data = new FormData(); data.append("file", file);
            const response = await fetch("/api/upload", { method: "POST", body: data });
            if (!response.ok) throw new Error("Fișierul nu a fost salvat. Încearcă din nou.");
            const result = await response.json();
            if (typeof result.url !== "string" || !/^https?:\/\//.test(result.url)) throw new Error("Nu am primit un fișier salvat valid.");
            setArtworkUrl(result.url); setFileName(file.name); setIsImage(file.type.startsWith("image/") && !file.name.toLowerCase().endsWith(".svg"));
        } catch (e) { setUploadError(e instanceof Error ? e.message : "Încărcarea nu a reușit. Încearcă din nou."); }
        finally { setUploading(false); }
    }
    function handleAddToCart() {
        if (!product || !canOrder) { error("Completează dimensiunile și opțiunea de grafică înainte de a adăuga produsul."); return; }
        const useText = designOption === "pro" || (designOption === "standard" && addText);
        addItem({ id: `stock-banner-${product.id}-${width}x${height}-${Date.now()}`, productId: bannerMode === "double" ? "banner-verso" : bannerMode === "mesh" ? "mesh" : "banner", slug: product.slug, routeSlug: `/banner-product/${product.slug}`, image: product.image, title: `${product.title} · ${modeLabel} · ${width} × ${height} cm`, width, height, price: total / quantity, quantity,
            metadata: { "Dimensiune": `${width}x${height} cm`, "Tip": modeLabel, "Material": materialLabel, bannerMode, ...(bannerMode === "double" ? { "Grafică față-verso": "Identică pe ambele fețe" } : {}), "Finisaje": `Tiv + Capse${bannerMode !== "mesh" && wantWindHoles ? " + Găuri de Vânt" : ""}`, "Imagine": product.image, "Model ales": product.title, "Model slug": product.slug, "Optiune Grafica": MODES.find(m => m.value === designOption)?.title, designOption, "Taxă grafică": graphicFee, "Nume pe grafică": useText ? contactName.trim() : "-", "Telefon pe grafică": useText ? contactPhone.trim() : "-", "Text Personalizat": useText ? [contactName.trim(), contactPhone.trim(), instructions.trim()].filter(Boolean).join(" | ") || "-" : "-", "Indicații grafică": useText ? instructions.trim() : "-", ...(designOption === "upload" && artworkUrl ? { "Fisier": artworkUrl, "Nume fișier": fileName, ...(isImage ? fitMetadata(width, height, artworkPx, artworkFit) : {}) } : {}) } });
        success("Bannerul și opțiunile tale au fost adăugate în coș.");
    }
    if (!product) return null;
    const inputClass = "w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm text-lg font-medium bg-white text-slate-900";
    return <div className="bg-slate-50 pb-24 text-slate-900">
        <ProductJsonLd name={product.title} description={product.description} image={product.image} price={printPrice.finalPrice} sku={product.id} url={`${siteConfig.url}/banner-product/${product.slug}`} />
        <div className={`mx-auto max-w-7xl ${renderOnlyConfigurator ? "px-0" : "px-4"} py-8 lg:py-12`}>
            <Link href="/shop/bannere" className="mb-6 inline-flex text-sm font-semibold text-emerald-700">← Toate modelele de banner</Link>
            <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="lg:sticky lg:top-24">
                    <div className="relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm">
                        {designOption === "upload" && artworkUrl && isImage ? <div className="absolute inset-0 p-4"><ArtworkFitEditor widthCm={width} heightCm={height} imageUrl={artworkUrl} fit={artworkFit} onChange={setArtworkFit} onImageSize={setArtworkPx} safeMarginCm={3} viewingFactor={1.5} /></div> : <Image src={product.image} alt={product.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-5" />}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500">{designOption === "standard" ? "Grafica de referință pentru modelul ales. Numele și telefonul introduse se transmit împreună cu comanda; nu sunt afișate automat în această fotografie." : designOption === "pro" ? "Imaginea este un punct de plecare. Macheta personalizată se realizează după indicațiile din comandă." : artworkUrl && !isImage ? `Fișier salvat: ${fileName}. Pentru acest format nu este disponibilă o previzualizare în browser.` : "Încarcă propriul fișier. Fotografia modelului rămâne doar o referință până la încărcare."}</p>
                </div>
                <div className="space-y-5 brand-configurator">
                    <BannerModeSwitch value={bannerMode} onChange={setBannerMode} />
                    <p className="text-sm text-slate-600" role="status">{bannerMode === "double" ? "Păstrăm grafica acestui model, imprimată identic pe ambele fețe. Prețul este calculat pentru Blockout față-verso." : bannerMode === "mesh" ? "Păstrăm grafica acestui model și o imprimăm pe mesh microperforat. Prețul este calculat pentru mesh." : "Păstrăm grafica acestui model, imprimată pe o singură față."}</p>
                    <header><p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-700">{product.category}</p><h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight">{product.title}</h1><p className="mt-3 leading-relaxed text-slate-600">{product.description}</p></header>
                    <div data-stock-banner-steps className="bg-white rounded-xl sm:rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-200 px-3 sm:px-4"><AccordionStep stepNumber={1} title="Dimensiuni & Cantitate" summary={`${width} × ${height} cm · ${quantity} buc.`} isOpen={activeStep === 1} onClick={() => setActiveStep(1)}><p className="mb-4 text-sm text-gray-600">Alege un format de mai jos sau introdu o lățime personalizată. Raportul lățime × înălțime rămâne 2:1.</p>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{SIZES.map(s => <button key={`${s.w}x${s.h}`} type="button" aria-pressed={!customSize && width === s.w && height === s.h} onClick={() => { setWidth(s.w); setCustomSize(false); }} className={`rounded-xl border px-3 py-3 text-sm font-semibold ${!customSize && width === s.w && height === s.h ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-slate-200"}`}>{s.w} × {s.h} cm</button>)}</div>
                        <button type="button" onClick={() => setCustomSize(!customSize)} aria-expanded={customSize} aria-controls="stock-banner-custom-size" className={`mt-4 flex w-full items-center gap-3 rounded-xl border-2 px-4 py-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${customSize ? "border-emerald-600 bg-emerald-100" : "border-emerald-600 bg-emerald-50 hover:bg-emerald-100"}`}><Ruler size={24} className="shrink-0 text-emerald-700" /><span><strong className="block text-base text-emerald-900">Am nevoie de altă dimensiune</strong><span className="mt-1 block text-sm text-emerald-800">Introdu lățimea dorită; înălțimea se calculează automat.</span></span><span className="ml-auto font-bold text-emerald-800">{customSize ? "−" : "+"}</span></button>
                        {customSize && <div id="stock-banner-custom-size" className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3"><label className="text-sm">Lățime (cm)<input aria-label="Lățime (cm)" type="number" min={2} step={2} value={width} onChange={e => setWidth(Number(e.target.value))} className={inputClass} /></label><label className="text-sm">Înălțime calculată (cm)<input aria-label="Înălțime (cm)" type="number" min={1} value={height} readOnly aria-readonly="true" className={inputClass} /></label></div>}
                        <div className="mt-5"><NumberInput label="Cantitate" value={quantity} onChange={setQuantity} /></div>
                    <button type="button" onClick={() => setActiveStep(2)} className="btn-outline mt-5 inline-flex min-h-11 items-center justify-center px-4 py-2 text-sm font-semibold">Continuă cu materialul →</button></AccordionStep>
                    <AccordionStep stepNumber={2} title="Material & Finisaje" summary={`${materialLabel} · Tiv + capse`} isOpen={activeStep === 2} onClick={() => setActiveStep(2)}>{bannerMode === "single" ? <div className="grid grid-cols-2 gap-3"><OptionButton active={material === "frontlit_440"} onClick={() => setMaterial("frontlit_440")} title="Frontlit 440g" subtitle="Standard" /><OptionButton active={material === "frontlit_510"} onClick={() => setMaterial("frontlit_510")} title="Frontlit 510g" subtitle="Premium" /></div> : <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4"><strong className="text-sm text-emerald-900">{materialLabel}</strong><p className="mt-2 text-sm text-slate-600">{bannerMode === "double" ? "Material opac pentru imprimare pe ambele fețe, cu aceeași grafică." : "Material microperforat pentru imprimarea modelului ales."}</p></div>}<p className="mt-3 flex items-center gap-2 text-sm text-slate-600"><Check size={16} /> Tiv și capse incluse. {bannerMode === "double" ? "Imprimare pe ambele fețe." : "Imprimare pe o singură față."}</p>{bannerMode !== "mesh" && <label className="mt-4 flex items-center gap-3 text-sm"><input type="checkbox" checked={wantWindHoles} onChange={e => setWantWindHoles(e.target.checked)} /> Adaugă găuri de vânt</label>}<button type="button" onClick={() => setActiveStep(3)} className="btn-outline mt-5 inline-flex min-h-11 items-center justify-center px-4 py-2 text-sm font-semibold">Continuă cu grafica →</button></AccordionStep>
                    <AccordionStep stepNumber={3} title="Grafică" summary={MODES.find(m => m.value === designOption)?.title || "Grafică"} isOpen={activeStep === 3} onClick={() => setActiveStep(3)} isLast={true}><div className="space-y-2">{MODES.map(m => <label key={m.value} className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-3 ${designOption === m.value ? "border-emerald-600 bg-emerald-50" : "border-gray-300 bg-white hover:border-gray-400"}`}><input type="radio" name="banner-graphic" value={m.value} checked={designOption === m.value} onChange={() => setDesignOption(m.value)} className="mt-1" /><span><strong className="block text-sm">{m.title}</strong><span className="mt-1 block text-sm leading-relaxed text-slate-600">{m.detail}</span></span></label>)}</div>
                        {designOption === "standard" && <label className="mt-4 flex items-start gap-3 text-sm"><input type="checkbox" checked={addText} onChange={e => setAddText(e.target.checked)} className="mt-1" /><span>Vreau să adaug un nume, un număr de telefon sau un text scurt pe această grafică.</span></label>}
                        {(designOption === "pro" || (designOption === "standard" && addText)) && <div className="mt-4 space-y-3"><label className="block text-sm font-medium">Nume / firmă pe banner<input maxLength={120} value={contactName} onChange={e => setContactName(e.target.value)} placeholder="Scrie exact cum vrei să apară" className={`${inputClass} mt-1`} /></label><label className="block text-sm font-medium">Telefon pe banner<input type="tel" maxLength={40} value={contactPhone} onChange={e => setContactPhone(e.target.value)} placeholder="Numărul care va fi imprimat" className={`${inputClass} mt-1`} /></label><label className="block text-sm font-medium">{designOption === "pro" ? "Descrie grafica dorită (obligatoriu)" : "Text sau indicații suplimentare"}<textarea maxLength={2000} rows={3} value={instructions} onChange={e => setInstructions(e.target.value)} placeholder={designOption === "pro" ? "Ce mesaj, culori și elemente dorești?" : "Ce text adăugăm și unde ai dori să apară?"} className={`${inputClass} mt-1`} /></label></div>}
                        {designOption === "upload" && <div className="mt-4"><label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-6 text-center"><UploadCloud size={28} /><strong className="text-sm">{uploading ? "Se încarcă fișierul…" : "Alege fișierul tău"}</strong><span className="text-xs text-slate-500">JPG, PNG, WebP, PDF sau fișier vectorial. Nu încărca fotografia unui banner în locul machetei de print.</span><input type="file" accept=".jpg,.jpeg,.png,.webp,.pdf,.svg,.ai,.eps,.psd,.tif,.tiff" disabled={uploading} onChange={handleFileUpload} className="max-w-full text-sm" /></label>{artworkUrl && <p role="status" className="mt-3 break-words text-sm text-emerald-700">Fișier salvat: {fileName}</p>}{uploadError && <p role="alert" className="mt-3 text-sm text-red-700">{uploadError}</p>}</div>}
                    </AccordionStep></div>
                    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><dl className="space-y-2 text-sm"><div className="flex justify-between"><dt>Imprimare și finisare · {quantity || 0} buc.</dt><dd>{formatMoneyDisplay(printPrice.finalPrice)}</dd></div><div className="flex justify-between"><dt>Grafică {designOption === "pro" ? "personalizată (o singură taxă)" : designOption === "standard" ? "din exemplu" : "proprie"}</dt><dd>{formatMoneyDisplay(graphicFee)}</dd></div><div className="flex justify-between border-t pt-3 text-xl font-bold"><dt>Total</dt><dd data-banner-total={total}>{formatMoneyDisplay(total)}</dd></div></dl><button type="button" onClick={handleAddToCart} disabled={!canOrder} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-4 text-lg font-bold text-white shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300"><ShoppingCart size={20} /> Adaugă în coș</button>{!canOrder && <p role="status" className="mt-3 text-sm text-slate-600">{!validSize ? "Introdu dimensiuni pozitive și o cantitate întreagă." : uploading ? "Așteaptă salvarea fișierului." : designOption === "upload" ? "Încarcă un fișier pentru a continua." : designOption === "pro" ? "Descrie ce grafică dorești." : "Completează cel puțin un nume, telefon sau text."}</p>}<div className="mt-4"><DeliveryEstimation /></div><Link href="/contact" className="mt-4 inline-flex text-sm font-medium text-emerald-700">Ai nevoie de ajutor? Contactează-ne →</Link></section>
                </div>
            </div>
            <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"><div className="mb-5 flex gap-5 border-b pb-3"><button type="button" onClick={() => setTab("description")} aria-pressed={tab === "description"} className={tab === "description" ? "font-bold text-emerald-700" : "text-slate-500"}>Despre acest model</button><button type="button" onClick={() => setTab("reviews")} aria-pressed={tab === "reviews"} className={tab === "reviews" ? "font-bold text-emerald-700" : "text-slate-500"}>Recenzii</button></div>{tab === "reviews" ? <Reviews productSlug={productSlug} /> : <div className="prose prose-slate max-w-none"><h2>{product.title}</h2>{product.longDescription ? <div dangerouslySetInnerHTML={{ __html: product.longDescription }} /> : <p>{product.description}</p>}</div>}</section>
<div className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 pb-safe shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)]"><div className="mx-auto flex max-w-md items-center justify-between gap-4"><div className="flex flex-col leading-none"><span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">Total Plată</span><span className="text-xl font-black text-slate-900">{formatMoneyDisplay(total)}</span></div><button type="button" onClick={handleAddToCart} disabled={!canOrder} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-50"><ShoppingCart size={18} /> Adaugă</button></div></div>
            {!renderOnlyConfigurator && <PopularDesigns title="Alte modele din aceeași categorie" currentSlug={product.slug} products={bannerProducts.filter(p => p.category === product.category)} />}
        </div>
    </div>;
}
