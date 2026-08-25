"use client";
import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastProvider";
import { ShoppingCart, Check, ChevronDown, Package, ShieldCheck, Ruler, Sparkles, MessageCircle, Info, Minus, Plus, UploadCloud, X } from "lucide-react";
import DeliveryEstimation from "./DeliveryEstimation";
import Reviews from "./Reviews";
import FaqAccordion from "./FaqAccordion";
import Link from "next/link";
import RelatedProducts from "./RelatedProducts";
import QuickNav from "@/components/QuickNav";
import { formatMoneyDisplay, calculateBannerPrice, getBannerUpsell, BANNER_CONSTANTS, type PriceInputBanner, roundMoney } from "@/lib/pricing";

import { AccordionStep } from "./ui/AccordionStep";
import { OptionButton } from "./ui/OptionButton";
import { NumberInput } from "./ui/NumberInput";
import MobilePriceBar from "./MobilePriceBar";

export default function SaleRentBannerConfigurator({ product }: { product: any }) {
    const { addItem } = useCart();
    const toast = useToast();
    const [activeProductTab, setActiveProductTab] = useState<"descriere" | "recenzii" | "faq">("descriere");
    const [quantity, setQuantity] = useState(1);
    const [activeStep, setActiveStep] = useState(1);
    const [selectedVariantId, setSelectedVariantId] = useState<string | number | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [customText, setCustomText] = useState("");
    const [material, setMaterial] = useState<"frontlit_440" | "frontlit_510">("frontlit_440");
    const [wantWindHoles, setWantWindHoles] = useState(false);
    const [designOption, setDesignOption] = useState<'standard' | 'upload' | 'text_only' | 'pro'>('standard');
    const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [textDesign, setTextDesign] = useState("");

    const variants = product.metadata?.variants || [];
    const selectedVariant = variants.find((v: any) => v.id === selectedVariantId) || variants[0];
    const image = product.images?.[0] || "/placeholder.png";

    useEffect(() => {
        if (!selectedVariantId && variants.length > 0) setSelectedVariantId(variants[0].id);
    }, [variants, selectedVariantId]);

    const formatSize = (sizeSlug: string) => sizeSlug.replace(/-/g, '.').replace('.x.', ' x ').replace(/m/g, 'm').toUpperCase();

    const priceData = useMemo(() => {
        if (!selectedVariant) return { finalPrice: 0, discountPercent: 0, upsellMessage: null as string | null };
        let width_cm = 0, height_cm = 0;
        try {
            let s = selectedVariant.size.toLowerCase().replace(/[m\s]/g, '').replace(/-x-/g, 'x').replace(/-x/g, 'x').replace(/x-/g, 'x');
            const [wPart, hPart] = s.split('x');
            if (wPart && hPart) { width_cm = parseFloat(wPart.replace(/-/g, '.')) * 100; height_cm = parseFloat(hPart.replace(/-/g, '.')) * 100; }
        } catch (e) {}
        const calculated = calculateBannerPrice({ width_cm, height_cm, quantity, material, want_wind_holes: wantWindHoles, want_hem_and_grommets: true, designOption: "upload" });
        const upsell = getBannerUpsell({ width_cm, height_cm, quantity, material, want_wind_holes: wantWindHoles, want_hem_and_grommets: true, designOption: "upload" });
        return { finalPrice: calculated.finalPrice, discountPercent: 0, upsellMessage: upsell?.hasUpsell ? upsell.message : null };
    }, [selectedVariant, quantity, material, wantWindHoles]);

    const handleArtworkFileInput = async (file: File | null) => {
        if (!file) return;
        try {
            setUploading(true);
            const form = new FormData(); form.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: form });
            const data = await res.json();
            setArtworkUrl(data.url);
        } catch (e) { toast.error("Eroare la upload"); } finally { setUploading(false); }
    };

    const handleAddToCart = () => {
        if (!selectedVariant) return;
        const finalTotalPrice = priceData.finalPrice + (designOption === 'pro' ? BANNER_CONSTANTS.PRO_DESIGN_FEE : 0);
        addItem({
            id: `${product.id}-${selectedVariant.id}-${material}-${designOption}`,
            title: product.title,
            slug: product.slug,
            price: finalTotalPrice / quantity,
            quantity: quantity,
            metadata: { "Dimensiune": formatSize(selectedVariant.size), "Material": material === 'frontlit_510' ? "Premium" : "Standard", "Artwork": designOption, "Text": customText || "-", image }
        });
        toast.success("Adăugat în coș!");
    };

    const summaryStep1 = selectedVariant ? `${formatSize(selectedVariant.size)}, ${quantity} buc.` : "Alege";
    const summaryStep2 = `${material === 'frontlit_510' ? 'Premium' : 'Standard'}${wantWindHoles ? ', cu găuri' : ''}`;

    return (
        <main className="bg-slate-50 dark:bg-slate-800 min-h-screen">
          <div className="container mx-auto px-4 py-10 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="lg:sticky top-24 h-max">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                   <div className="aspect-square relative flex items-center justify-center overflow-hidden">
                      <Image src={image} alt={product.title} fill className="object-contain p-4" priority sizes="(max-width: 768px) 100vw, 50vw" />
                   </div>
                </div>
              </div>

              <div>
                <header className="mb-6">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Bannere Reclamă</span>
                  <div className="flex justify-between items-center gap-4 mt-1 mb-3"><h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{product.title}</h1></div>
                  <div className="flex justify-between items-center"><p className="text-gray-600 dark:text-gray-400">Dimensiuni standard pentru vizibilitate maximă.</p><button type="button" onClick={() => setDetailsOpen(true)} className="btn-outline inline-flex items-center text-sm px-3 py-1.5"><Info size={16} /><span className="ml-2">Detalii</span></button></div>
                </header>

                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 px-4">
                  <AccordionStep stepNumber={1} title="Dimensiune & Tiraj" summary={summaryStep1} isOpen={activeStep === 1} onClick={() => setActiveStep(1)}>
                    <div className="py-2">
                        <label className="field-label mb-2 block">Dimensiuni Disponibile</label>
                        <div className="flex flex-wrap gap-2">
                            {variants.map((v: any) => (
                                <button key={v.id} onClick={() => setSelectedVariantId(v.id)} className={`px-4 py-2 text-sm font-bold border-2 rounded-lg transition-all ${selectedVariantId === v.id ? "border-amber-600 bg-amber-50 text-amber-700" : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"}`}>{formatSize(v.size)}</button>
                            ))}
                            <Link href="/banner" className="px-4 py-2 text-sm font-bold border-2 border-dashed border-amber-200 bg-amber-50/50 text-amber-600 rounded-lg hover:bg-amber-100 flex items-center gap-2"><Ruler size={16} /><span>Altă Dimensiune?</span></Link>
                        </div>
                        <div className="mt-6">
                            <label className="field-label mb-2 block">Numărul de Telefon (Pe Banner)</label>
                            <input type="text" value={customText} onChange={e => setCustomText(e.target.value)} placeholder="Ex: 07xx xxx xxx" className="input mb-4" />
                            <NumberInput label="Cantitate (buc)" value={quantity} onChange={setQuantity} />
                        </div>
                    </div>
                  </AccordionStep>

                  <AccordionStep stepNumber={2} title="Material & Finisaje" summary={summaryStep2} isOpen={activeStep === 2} onClick={() => setActiveStep(2)}>
                     <div className="grid grid-cols-2 gap-2 pt-2">
                        <OptionButton active={material === 'frontlit_440'} onClick={() => setMaterial('frontlit_440')} title="Standard 440g" subtitle="Optim raport preț/calitate" />
                        <OptionButton active={material === 'frontlit_510'} onClick={() => setMaterial('frontlit_510')} title="Premium 510g" subtitle="Durabilitate extinsă" />
                     </div>
                     <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-800 rounded-lg flex justify-between items-center">
                        <div><h4 className="text-sm font-bold">Găuri de vânt</h4><p className="text-[10px] text-gray-400 uppercase font-bold">Perforații pentru vânt puternic pe folie plină</p></div>
                        <button onClick={() => setWantWindHoles(!wantWindHoles)} className={`w-12 h-6 rounded-full transition-all relative ${wantWindHoles ? 'bg-amber-500' : 'bg-gray-300'}`}><div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${wantWindHoles ? 'right-1' : 'left-1'}`} /></button>
                     </div>
                  </AccordionStep>

                  <AccordionStep stepNumber={3} title="Grafică" summary={designOption} isOpen={activeStep === 3} onClick={() => setActiveStep(3)} isLast={true}>
                     <div className="grid grid-cols-2 gap-2 pt-2">
                        <OptionButton active={designOption === 'standard'} onClick={() => setDesignOption('standard')} title="Model Standard" subtitle="Cel din imagine" />
                        <OptionButton active={designOption === 'upload'} onClick={() => setDesignOption('upload')} title="Grafică Proprie" subtitle="Încarcă fișier" />
                        <OptionButton active={designOption === 'text_only'} onClick={() => setDesignOption('text_only')} title="Doar Text" subtitle="Punem noi textul" />
                        <OptionButton active={designOption === 'pro'} onClick={() => setDesignOption('pro')} title="Design Pro" subtitle="Concept nou" />
                     </div>
                     {designOption === 'upload' && (
                        <div className="mt-4">
                           <label className="flex flex-col items-center justify-center w-full h-32 px-4 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400">
                              <UploadCloud className="w-6 h-6 text-gray-400" /><span className="text-sm text-gray-500">Apasă pentru upload</span>
                              <input type="file" className="hidden" onChange={e => handleArtworkFileInput(e.target.files?.[0] ?? null)} />
                           </label>
                           {artworkUrl && <p className="text-sm text-green-600 mt-2">Gata!</p>}
                        </div>
                     )}
                  </AccordionStep>
                </div>

                {/* PRICE SECTION (Standard Sticky Bottom) */}
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-4 lg:static lg:p-8 lg:mt-8 lg:bg-white lg:border lg:rounded-2xl lg:shadow-lg dark:border-slate-800 animate-slide-up">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between items-center w-full gap-4 order-2 lg:order-1">
                      <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-1">Preț Total</span>
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{formatMoneyDisplay(priceData.finalPrice + (designOption === 'pro' ? BANNER_CONSTANTS.PRO_DESIGN_FEE : 0))}</span>
                      </div>
                      <div className="flex-shrink-0"><DeliveryEstimation /></div>
                    </div>
                    <button onClick={handleAddToCart} className="btn-primary w-full py-4 lg:py-5 text-lg lg:text-xl font-black tracking-tight group order-1 lg:order-2">
                       <ShoppingCart size={24} className="inline-block mr-2" /><span className="font-bold">Adaugă în Coș</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 lg:mt-6 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <a href="https://wa.me/40750473111" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-amber-600 hover:from-green-700 hover:to-amber-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"><MessageCircle size={18} /><span className="text-sm">WhatsApp</span></a>
                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"><Info size={18} /><span className="text-sm">Cerere Ofertă</span></Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                <nav className="border-b border-gray-200 dark:border-slate-800 flex">
                    {["descriere", "recenzii", "faq"].map(t => (
                        <button key={t} onClick={() => setActiveProductTab(t as any)} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeProductTab === t ? 'text-amber-600 border-amber-600 bg-amber-50' : 'text-gray-500 border-transparent hover:bg-slate-50'}`}>{t}</button>
                    ))}
                </nav>
                <div className="p-6 lg:p-8">
                    {activeProductTab === 'descriere' && <div className="prose dark:prose-invert max-w-none text-sm" dangerouslySetInnerHTML={{ __html: product.description || "" }} />}
                    {activeProductTab === 'recenzii' && <Reviews productSlug={product.slug} />}
                    {activeProductTab === 'faq' && <FaqAccordion qa={[{ question: "Cât durează?", answer: "24-48h." }]} />}
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8"><QuickNav title="Alte tipuri de bannere?" /><div className="mt-12"><RelatedProducts category="bannere" /></div></div>
          </div>
          <MobilePriceBar totalPrice={priceData.finalPrice + (designOption === 'pro' ? BANNER_CONSTANTS.PRO_DESIGN_FEE : 0)} onAddToCart={handleAddToCart} isVisible={true} />
        </main>
    );
}
