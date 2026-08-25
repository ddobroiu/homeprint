"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastProvider";
import { ShoppingCart, Check, ShieldCheck, Zap, MessageCircle, Info, ChevronDown } from "lucide-react";
import DeliveryEstimation from "./DeliveryEstimation";
import FaqAccordion from "./FaqAccordion";
import { QA } from "@/types/configurator";
import {
    calculateFonduriEUPrice,
    FONDURI_EU_CONSTANTS,
    formatMoneyDisplay
} from "@/lib/pricing";

import { AccordionStep } from "./ui/AccordionStep";
import { OptionButton } from "./ui/OptionButton";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import MobilePriceBar from "./MobilePriceBar";
import QuickNav from "@/components/QuickNav";
import { euFundsProducts } from "@/lib/products/eu-funds-products";

const GALLERY_BASE = [
    "/products/fonduri/pnrr-1.webp",
    "/products/fonduri/pnrr-2.webp",
    "/products/fonduri/pnrr-3.jpg",
    "/products/fonduri/pnrr-4.jpg"
] as const;

const fonduriFaqs: QA[] = [
    { question: "Sunt materialele conforme cu manualul de identitate?", answer: "Da, respectăm cu strictețe manualul de identitate vizuală pentru fiecare program (PNRR, Regio, etc.), folosind fonturile, culorile și elementele grafice obligatorii." },
    { question: "Ce include comunicatul de presă?", answer: "Serviciul include redactarea textului, publicarea acestuia și oferirea dovezii de publicare cu confirmarea unui trafic de minim 3.000 de vizitatori unici (astfel se respectă rigorile multor finanțări)." },
    { question: "Panourile sunt rezistente la exterior?", answer: "Da, panourile temporare și plăcile permanente sunt realizate din materiale rezistente la intemperii (PVC Forex, Bond sau Banner) și printate cu cerneală UV." },
];

function FonduriTypeSwitch() {
    const pathname = usePathname();
    const isPnrr = !!pathname && (pathname.includes("/fonduri-pnrr") || pathname.includes("/configurator/fonduri-eu"));
    const isRegio = !!pathname && pathname.includes("/fonduri-regio");
    const isNationale = !!pathname && pathname.includes("/fonduri-nationale");

    return (
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
            <Link href="/fonduri-pnrr" className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${isPnrr ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>PNRR</Link>
            <Link href="/fonduri-regio" className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${isRegio ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>REGIO</Link>
            <Link href="/fonduri-nationale" className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${isNationale ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>Naționale</Link>
        </div>
    );
}

export default function FonduriEUConfigurator({ productSlug }: { productSlug?: string }) {
    const { addItem } = useCart();
    const toast = useToast();

    const currentProduct = useMemo(() => {
        if (!productSlug) return null;
        return euFundsProducts.find(p => p.slug === productSlug);
    }, [productSlug]);

    const GALLERY = useMemo(() => {
        if (currentProduct?.image && !GALLERY_BASE.includes(currentProduct.image as any)) {
            return [currentProduct.image, ...GALLERY_BASE];
        }
        return GALLERY_BASE;
    }, [currentProduct]);

    const [selections, setSelections] = useState<Record<string, string>>({
        comunicat: "none",
        bannerSite: "none",
        afisInformativ: "none",
        autoMici: "none",
        autoMari: "none",
        panouTemporar: "none",
        placaPermanenta: "none"
    });
    
    const [activeTab, setActiveTab] = useState("descriere");
    const [activeStep, setActiveStep] = useState(1);

    useEffect(() => {
        if (currentProduct) {
            setSelections(prev => {
                const next = { ...prev };
                if (currentProduct.tags.includes("comunicat")) next.comunicat = "start";
                if (currentProduct.tags.includes("placa")) next.placaPermanenta = "80x50";
                if (currentProduct.tags.includes("panou")) next.panouTemporar = "80x50";
                if (currentProduct.tags.includes("afis") && currentProduct.tags.includes("a3")) next.afisInformativ = "A3";
                if (currentProduct.tags.includes("autocolante")) next.autoMici = "10x10-20";
                return next;
            });
            if (currentProduct.tags.includes("comunicat")) setActiveStep(1);
            else if (currentProduct.tags.includes("afis")) setActiveStep(2);
            else if (currentProduct.tags.includes("placa")) setActiveStep(3);
        }
    }, [currentProduct]);

    const groups = FONDURI_EU_CONSTANTS.GROUPS;
    const priceData = useMemo(() => calculateFonduriEUPrice({ selections }), [selections]);
    const displayedTotal = priceData.finalPrice;

    const summaryStep1 = useMemo(() => {
        const parts = [];
        if (selections.comunicat !== "none") parts.push("Comunicat");
        if (selections.bannerSite !== "none") parts.push("Banner");
        return parts.length ? parts.join(", ") : "Digital";
    }, [selections]);

    const summaryStep2 = useMemo(() => {
        const parts = [];
        if (selections.afisInformativ !== "none") parts.push("Afiș");
        if (selections.autoMici !== "none" || selections.autoMari !== "none") parts.push("Autocolante");
        return parts.length ? parts.join(", ") : "Informare";
    }, [selections]);

    const summaryStep3 = useMemo(() => {
        const parts = [];
        if (selections.panouTemporar !== "none") parts.push("Panouri");
        if (selections.placaPermanenta !== "none") parts.push("Placă");
        return parts.length ? parts.join(", ") : "Materiale Rigide";
    }, [selections]);

    function handleAddToCart() {
        if (displayedTotal <= 0) {
            toast.warning("Selectați cel puțin un element pentru kit.");
            return;
        }

        const selectedItems = Object.entries(selections)
            .filter(([_, val]) => val !== "none")
            .map(([key, val]) => {
                const group = groups[key as keyof typeof groups];
                const opt = group?.options.find(o => o.id === val);
                return `${group?.title}: ${opt?.label}`;
            });

        addItem({
            id: `fonduri-eu-${Date.now()}`,
            productId: 'fonduri-eu',
            title: "Kit Vizibilitate Fonduri EU",
            price: displayedTotal,
            quantity: 1,
            metadata: { "Configurație": selectedItems.join(" | ") },
        });
        toast.success("Kit adăugat în coș!");
    }

    return (
        <main className="bg-slate-50 dark:bg-slate-800 min-h-screen">
            <div className="container mx-auto px-4 py-10 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div className="lg:sticky top-24 h-max space-y-8 text-slate-900 dark:text-white">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                           <div className="aspect-square relative flex items-center justify-center overflow-hidden">
                                <Image src={GALLERY[0]} alt="Fonduri EU" fill className="object-contain p-8" priority />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><ShieldCheck size={18} /></div>
                            <div><p className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Conformitate</p><p className="text-xs font-bold text-gray-800 dark:text-gray-200">100% Audit-Safe</p></div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                             <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><Zap size={18} /></div>
                             <div><p className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Execuție</p><p className="text-xs font-bold text-gray-800 dark:text-gray-200">Livrare Rapidă</p></div>
                          </div>
                        </div>
                    </div>

                    <div>
                        <header className="mb-6">
                           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
                              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{currentProduct ? currentProduct.title : "Kit Vizibilitate Fonduri EU"}</h1>
                              <FonduriTypeSwitch />
                           </div>
                           <p className="text-gray-600 dark:text-gray-400">Respectăm manualul de identitate vizuală obligatoriu pentru proiectul tău.</p>
                        </header>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 px-4">
                           <AccordionStep stepNumber={1} title="Publicitate & Digital" summary={summaryStep1} isOpen={activeStep === 1} onClick={() => setActiveStep(1)}>
                              <div className="py-4 space-y-4">
                                <div className="space-y-4">
                                   <label className="field-label text-xs font-bold text-slate-500 uppercase block mb-1">Comunicat de presă</label>
                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {groups.comunicat.options.map(o => (
                                         <OptionButton key={o.id} active={selections.comunicat === o.id} onClick={() => setSelections(p => ({ ...p, comunicat: o.id }))} title={o.label} subtitle={o.price > 0 ? `+${formatMoneyDisplay(o.price)}` : "Inclus"} />
                                      ))}
                                   </div>
                                </div>
                                <div className="space-y-4">
                                   <label className="field-label text-xs font-bold text-slate-500 uppercase block mb-1">Banner Site</label>
                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {groups.bannerSite.options.map(o => (
                                         <OptionButton key={o.id} active={selections.bannerSite === o.id} onClick={() => setSelections(p => ({ ...p, bannerSite: o.id }))} title={o.label} subtitle={o.price > 0 ? `+${formatMoneyDisplay(o.price)}` : "Fără"} />
                                      ))}
                                   </div>
                                </div>
                              </div>
                           </AccordionStep>

                           <AccordionStep stepNumber={2} title="Afișe & Autocolante" summary={summaryStep2} isOpen={activeStep === 2} onClick={() => setActiveStep(2)}>
                              <div className="py-4 space-y-6">
                                 <div>
                                    <label className="field-label text-xs font-bold text-slate-500 uppercase block mb-2">Afiș Informativ</label>
                                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 rounded-lg p-2 text-sm focus:border-amber-500" value={selections.afisInformativ} onChange={(e) => setSelections(p => ({ ...p, afisInformativ: e.target.value }))}>
                                       {groups.afisInformativ.options.map(o => <option key={o.id} value={o.id}>{o.label} {o.price > 0 ? `(+${formatMoneyDisplay(o.price)})` : ''}</option>)}
                                    </select>
                                 </div>
                                 <div>
                                    <label className="field-label text-xs font-bold text-slate-500 uppercase block mb-2">Autocolante (Set)</label>
                                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 rounded-lg p-2 text-sm" value={selections.autoMici} onChange={(e) => setSelections(p => ({ ...p, autoMici: e.target.value }))}>
                                       {groups.autoMici.options.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
                                    </select>
                                 </div>
                              </div>
                           </AccordionStep>

                           <AccordionStep stepNumber={3} title="Panouri & Plăci" summary={summaryStep3} isOpen={activeStep === 3} onClick={() => setActiveStep(3)} isLast={true}>
                              <div className="py-4 space-y-6">
                                 <div>
                                    <label className="field-label text-xs font-bold text-slate-500 uppercase block mb-2">Panou Temporar Exterior</label>
                                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 rounded-lg p-2 text-sm" value={selections.panouTemporar} onChange={(e) => setSelections(p => ({ ...p, panouTemporar: e.target.value }))}>
                                       {groups.panouTemporar.options.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
                                    </select>
                                 </div>
                                 <div>
                                    <label className="field-label text-xs font-bold text-slate-500 uppercase block mb-2">Placă Permanentă</label>
                                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 rounded-lg p-2 text-sm" value={selections.placaPermanenta} onChange={(e) => setSelections(p => ({ ...p, placaPermanenta: e.target.value }))}>
                                       {groups.placaPermanenta.options.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
                                    </select>
                                 </div>
                              </div>
                           </AccordionStep>
                        </div>

                        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 lg:static lg:p-8 lg:mt-8 lg:bg-white lg:border lg:rounded-2xl lg:shadow-lg dark:bg-slate-900 dark:border-slate-800">
                           <div className="flex flex-col gap-4">
                              <div className="flex flex-row justify-between items-center w-full gap-4 order-2 lg:order-1">
                                 <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 uppercase font-black tracking-wider mb-1">Investiție Kit</span>
                                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{formatMoneyDisplay(displayedTotal)}</span>
                                 </div>
                                 <div className="flex-shrink-0 text-slate-900 dark:text-white"><DeliveryEstimation /></div>
                              </div>
                              <button onClick={handleAddToCart} className="btn-primary w-full py-4 lg:py-5 text-lg font-bold tracking-tight group order-1 lg:order-2">
                                 <ShoppingCart size={24} className="inline-block mr-2" /><span>Adaugă Kit în Coș</span>
                              </button>
                           </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 pb-8 lg:pb-0">
                           <a href="https://wa.me/40750473111" className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center gap-2 text-xs font-bold text-slate-900 dark:text-white hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all"><MessageCircle size={16} /> WhatsApp</a>
                           <Link href="/contact" className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center gap-2 text-xs font-bold text-slate-900 dark:text-white hover:bg-amber-50 transition-all"><Info size={16} /> Cere Ofertă</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                    <nav className="border-b border-gray-200 dark:border-slate-800 flex">
                       {["descriere", "faq"].map(t => (
                          <button key={t} onClick={() => setActiveTab(t as any)} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === t ? 'text-amber-600 border-amber-600 bg-amber-50' : 'text-gray-500 border-transparent hover:bg-slate-50'}`}>{t}</button>
                       ))}
                    </nav>
                    <div className="p-6 lg:p-8">
                       {activeTab === 'descriere' && (
                         <div className="prose dark:prose-invert max-w-none text-sm">
                           <p>Oferim kit-uri complete de vizibilitate pentru proiecte finanțate prin Fonduri Europene (PNRR, REGIO, etc.), 100% conforme cu ghidurile oficiale.</p>
                           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                              <li className="flex items-start gap-2"><Check className="text-amber-600 mt-1 shrink-0" size={16} /> <span><strong>MIV:</strong> Respectăm fonturile, culorile și elementele grafice obligatorii.</span></li>
                              <li className="flex items-start gap-2"><Check className="text-amber-600 mt-1 shrink-0" size={16} /> <span><strong>Echipa Pro:</strong> Expertiza noastră în sute de proiecte auditate.</span></li>
                              <li className="flex items-start gap-2"><Check className="text-amber-600 mt-1 shrink-0" size={16} /> <span><strong>Digital:</strong> Redactare și publicare comunicate pe portaluri cu trafic real.</span></li>
                              <li className="flex items-start gap-2"><Check className="text-amber-600 mt-1 shrink-0" size={16} /> <span><strong>Materiale:</strong> Panouri rezistente UV și plăci din Aluminiu Bond.</span></li>
                           </ul>
                         </div>
                       )}
                       {activeTab === 'faq' && <FaqAccordion qa={fonduriFaqs} />}
                    </div>
                </div>
                <div className="mt-8"><QuickNav title="Reper conformitate?" /></div>
            </div>
            <MobilePriceBar totalPrice={displayedTotal} onAddToCart={handleAddToCart} isVisible={true} />
        </main>
    );
}
