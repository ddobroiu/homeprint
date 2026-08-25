"use client";
import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastProvider";
import { ShoppingCart, Check, ChevronDown, Package, Ruler, ShieldCheck, MessageCircle, Info, Sparkles, Plus, Minus, X, Layers, UploadCloud, TrendingUp, Percent } from "lucide-react";
import DeliveryEstimation from "./DeliveryEstimation";
import RelatedProducts from "./RelatedProducts";
import Reviews from "./Reviews";
import FaqAccordion from "./FaqAccordion";
import { QA } from "@/types";
import QuickNav from "@/components/QuickNav";
import Link from 'next/link';
import MobilePriceBar from "./MobilePriceBar";

import { AccordionStep } from "./ui/AccordionStep";
import { NumberInput } from "./ui/NumberInput";
import { OptionButton } from "./ui/OptionButton";

const signageFaqs: QA[] = [
    { question: "Care este diferența dintre Autocolant și Panou PVC?", answer: "Autocolantul este o folie adezivă flexibilă care se aplică pe suprafețe netede. Panoul PVC este un material rigid." },
    { question: "Pot folosi aceste indicatoare la exterior?", answer: "Da, toate materialele noastre sunt rezistente la intemperii și UV." },
];

const formatMoneyDisplay = (amount: number) => new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON" }).format(amount);

export default function SignageConfigurator({ product }: { product: any }) {
    const { addItem } = useCart();
    const toast = useToast();
    const [activeProductTab, setActiveProductTab] = useState<"descriere" | "recenzii" | "faq">("descriere");
    const [quantity, setQuantity] = useState(1);
    const [activeStep, setActiveStep] = useState(1);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [designOption, setDesignOption] = useState<'standard' | 'upload' | 'pro' | 'text_only'>('standard');
    const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const variants = product.metadata.signageVariants || [];
    const GALLERY = product.images.length > 0 ? product.images : ["/placeholder.png"];
    const materials = useMemo(() => Array.from(new Set(variants.map((v: any) => v.material))), [variants]);
    const [selectedMaterial, setSelectedMaterial] = useState(materials[0] || "");
    const sizes = useMemo(() => variants.filter((v: any) => v.material === selectedMaterial), [variants, selectedMaterial]);
    const [selectedVariant, setSelectedVariant] = useState<any>(sizes[0] || null);

    useEffect(() => {
        const newSizes = variants.filter((v: any) => v.material === selectedMaterial);
        if (newSizes.length > 0) {
            const sameSize = newSizes.find((v: any) => v.size === selectedVariant?.size);
            setSelectedVariant(sameSize || newSizes[0]);
        }
    }, [selectedMaterial, variants]);

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
        const finalPrice = (selectedVariant.price * quantity) + (designOption === 'pro' ? 49 : 0);
        addItem({
            id: selectedVariant.id,
            title: product.title,
            slug: product.slug,
            price: finalPrice / quantity,
            quantity: quantity,
            metadata: { dimensiune: selectedVariant.size, material: selectedMaterial, image: GALLERY[0] }
        });
        toast.success("Adăugat în coș!");
    };

    const materialLabels: Record<string, string> = {
        'autocolant': 'Autocolant High-Tack',
        'placa-pvc-2mm': 'PVC Rigid 2mm',
        'placa-pvc-3mm': 'PVC Rigid 3mm',
        'placa-pvc-5mm': 'PVC Rigid 5mm',
        'banner': 'Banner Blockout',
    };

    const summaryStep1 = materialLabels[selectedMaterial as string] || selectedMaterial;
    const summaryStep2 = selectedVariant ? `${selectedVariant.size}, ${quantity} buc` : "Configurare";

    const totalPrice = (selectedVariant ? selectedVariant.price * quantity : 0) + (designOption === 'pro' ? 49 : 0);

    return (
        <main className="bg-slate-50 dark:bg-slate-800 min-h-screen">
          <div className="container mx-auto px-4 py-10 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="lg:sticky top-24 h-max space-y-8">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                   <div className="aspect-square relative flex items-center justify-center overflow-hidden">
                      <Image src={GALLERY[0]} alt={product.title} fill className="object-contain p-4" priority sizes="(max-width: 768px) 100vw, 50vw" />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><ShieldCheck size={18} /></div>
                    <div><p className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Protecție</p><p className="text-xs font-bold text-gray-800">UV Safe</p></div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><Layers size={18} /></div>
                    <div><p className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Eco</p><p className="text-xs font-bold text-gray-800">Non-Toxic</p></div>
                  </div>
                </div>
              </div>

              <div>
                <header className="mb-6">
                  <div className="flex justify-between items-center gap-4 mb-3"><h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{product.title}</h1></div>
                  <div className="flex justify-between items-center"><p className="text-gray-600 dark:text-gray-400">Soluții profesionale de semnalistică.</p><button type="button" onClick={() => setDetailsOpen(true)} className="btn-outline inline-flex items-center text-sm px-3 py-1.5"><Info size={16} /><span className="ml-2">Detalii</span></button></div>
                </header>

                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 px-4">
                  <AccordionStep stepNumber={1} title="Alege Materialul" summary={String(summaryStep1)} isOpen={activeStep === 1} onClick={() => setActiveStep(1)}>
                    <div className="grid grid-cols-1 gap-2 pt-2">
                       {materials.map((m: any) => (
                          <OptionButton key={m} active={selectedMaterial === m} onClick={() => setSelectedMaterial(m)} title={materialLabels[m] || m} subtitle="Certificat pentru uz industrial" />
                       ))}
                    </div>
                  </AccordionStep>

                  <AccordionStep stepNumber={2} title="Dimensiune & Tiraj" summary={summaryStep2} isOpen={activeStep === 2} onClick={() => setActiveStep(2)}>
                     <div className="py-2">
                        <label className="field-label mb-2 block">Formate Disponibile</label>
                        <div className="flex flex-wrap gap-2">
                           {sizes.map((v: any) => (
                              <button key={v.id} onClick={() => setSelectedVariant(v)} className={`px-4 py-2 text-sm font-bold border-2 rounded-lg transition-all ${selectedVariant?.id === v.id ? "border-amber-600 bg-amber-50 text-amber-700" : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"}`}>{v.size}</button>
                           ))}
                           <Link href="/autocolante" className="px-4 py-2 text-sm font-bold border-2 border-dashed border-amber-200 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 flex items-center gap-2"><Ruler size={16} /><span>Dimensiune Custom?</span></Link>
                        </div>
                        <div className="mt-6"><NumberInput label="Cantitate" value={quantity} onChange={setQuantity} /></div>
                     </div>
                  </AccordionStep>

                  <AccordionStep stepNumber={3} title="Grafică" summary={designOption} isOpen={activeStep === 3} onClick={() => setActiveStep(3)} isLast={true}>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                       <OptionButton active={designOption === 'standard'} onClick={() => setDesignOption('standard')} title="Model Standard" subtitle="Cel din catalog" />
                       <OptionButton active={designOption === 'upload'} onClick={() => setDesignOption('upload')} title="Grafică Proprie" subtitle="Încarcă fișier" />
                       <OptionButton active={designOption === 'text_only'} onClick={() => setDesignOption('text_only')} title="Doar Text" subtitle="Punem noi textul" />
                       <OptionButton active={designOption === 'pro'} onClick={() => setDesignOption('pro')} title="Design Pro" subtitle="Concept nou" />
                    </div>
                    {designOption === 'upload' && (
                       <div className="mt-4">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400">
                             <UploadCloud className="w-6 h-6 text-gray-400" /><span className="text-sm text-gray-500">Apasă pentru upload</span>
                             <input type="file" className="hidden" onChange={e => handleArtworkFileInput(e.target.files?.[0] ?? null)} />
                          </label>
                          {artworkUrl && <p className="text-sm text-green-600 mt-2">Fișier salvat!</p>}
                       </div>
                    )}
                  </AccordionStep>
                </div>

                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-4 lg:static lg:p-8 lg:mt-8 lg:bg-white lg:border lg:rounded-2xl lg:shadow-lg dark:border-slate-800 animate-slide-up">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between items-center w-full gap-4 order-2 lg:order-1">
                      <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-1">Preț Total</span>
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{formatMoneyDisplay(totalPrice)}</span>
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
                   {activeProductTab === 'recenzii' && <Reviews productSlug={product.id} />}
                   {activeProductTab === 'faq' && <FaqAccordion qa={signageFaqs} />}
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8"><QuickNav title="Ai nevoie de alt reper?" /><div className="mt-12"><RelatedProducts category="promo" /></div></div>
          </div>
          <MobilePriceBar totalPrice={totalPrice} onAddToCart={handleAddToCart} isVisible={true} />
        </main>
    );
}
