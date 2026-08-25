import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Panouri Polipropilenă Celulară (Akyplac) pentru Imobiliare și Șantier | HomePrint',
    description: 'Panouri din polipropilenă celulară (Akyplac), rezistente la apă și ușoare — soluția economică pentru anunțuri imobiliare, semnalistică de șantier și panouri temporare. Preț instant.',
    keywords: ['polipropilena celulara', 'akyplac', 'panouri imobiliare', 'panouri santier', 'panou de vanzare', 'homeprint'],
};

export default function PolipropilenaPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă configuratorul Polipropilenă...</div>}>
            <div className="pt-20">
                <h1 className="sr-only">Panouri Polipropilenă Celulară (Akyplac) pentru Imobiliare și Șantier</h1>
                <BreadcrumbSchema
                    items={[
                        { name: "Acasă", item: "/" },
                        { name: "Materiale", item: "/materiale" },
                        { name: "Polipropilenă Celulară", item: "/materiale/polipropilena" }
                    ]}
                />
                <ProductSchema
                    name="Panou Polipropilenă Celulară (Akyplac)"
                    description="Panou ușor și rezistent la apă din polipropilenă celulară, ideal pentru anunțuri imobiliare și semnalistică de șantier."
                    image="/products/master/placi-polipropilena-alveolara-canalit-ieftine.png"
                    url="/materiale/polipropilena"
                    price="25.00"
                />
                <ConfiguratorDispatcher configuratorId="polipropilena" />

                <FAQSchema
                    faqs={[
                        {
                            question: "De ce se folosește polipropilena la panourile 'De vânzare'?",
                            answer: "E ușoară (nu are nevoie de structură de susținere grea), rezistă la apă și intemperii fără să se deformeze, și costă mai puțin decât PVC Forex sau Alucobond — soluția standard din piața imobiliară pentru panouri expuse afară."
                        },
                        {
                            question: "Rezistă la vânt puternic pe un șantier?",
                            answer: "Da, structura alveolară (celulară) e rezistentă mecanic, iar dacă panoul e montat corect (cu suporți sau prinderi laterale), rezistă bine la condiții de șantier. Pentru zone foarte expuse, recomandăm grosimea de 5mm."
                        },
                        {
                            question: "Ce grosime aleg pentru un panou de anunț simplu?",
                            answer: "3mm e suficient pentru panouri mici, montate protejat. Pentru panouri mari sau expuse direct la vânt, recomandăm 5mm — rezistă mai bine în timp fără să se îndoaie."
                        },
                        {
                            question: "Cât durează producția și livrarea?",
                            answer: "Print UV direct pe panou, fără timp de uscare — producție rapidă, livrare prin curier de regulă în 24-48h."
                        }
                    ]}
                />

                {/* SEO CONTENT SECTION — conținut unic HomePrint */}
                <section className="bg-white py-16 mt-16 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Panoul standard pentru anunțuri imobiliare și șantier
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Polipropilena celulară (Akyplac) e <strong className="text-amber-600">ușoară, rezistentă la apă</strong> și mult mai accesibilă decât materialele rigide premium — alegerea potrivită când ai nevoie de multe panouri, la un cost controlat.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-500 pb-2 inline-block">Pentru ce se folosește</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Panouri "De vânzare" / "De închiriat"</strong>
                                            <span className="text-slate-600 text-sm">Cel mai folosit material din piața imobiliară — ușor de montat pe gard sau structură simplă.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Semnalistică de șantier</strong>
                                            <span className="text-slate-600 text-sm">Rezistă la condiții de exterior fără protecție specială, potrivit pentru panouri temporare pe durata lucrărilor.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Comenzi în volum mare</strong>
                                            <span className="text-slate-600 text-sm">Fiind mai ieftină decât Forex sau Alucobond, e alegerea potrivită când ai nevoie de zeci de panouri identice.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Ce grosime să alegi</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    3mm pentru panouri mici sau montate protejat de vânt; 5mm pentru panouri mari sau expuse direct — rezistă mai bine fără să se îndoaie în timp.
                                </p>
                                <p className="text-slate-600 leading-relaxed font-bold">
                                    Sfat de montaj: fixează panoul din cel puțin 4 puncte, nu doar din colțuri, ca să nu se îndoaie sub vânt puternic.
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 border-t border-slate-200 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente</h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        q: "De ce se folosește polipropilena la panourile 'De vânzare'?",
                                        a: "E ușoară (nu are nevoie de structură de susținere grea), rezistă la apă și intemperii fără să se deformeze, și costă mai puțin decât PVC Forex sau Alucobond — soluția standard din piața imobiliară pentru panouri expuse afară."
                                    },
                                    {
                                        q: "Rezistă la vânt puternic pe un șantier?",
                                        a: "Da, structura alveolară (celulară) e rezistentă mecanic, iar dacă panoul e montat corect (cu suporți sau prinderi laterale), rezistă bine la condiții de șantier. Pentru zone foarte expuse, recomandăm grosimea de 5mm."
                                    },
                                    {
                                        q: "Ce grosime aleg pentru un panou de anunț simplu?",
                                        a: "3mm e suficient pentru panouri mici, montate protejat. Pentru panouri mari sau expuse direct la vânt, recomandăm 5mm — rezistă mai bine în timp fără să se îndoaie."
                                    },
                                    {
                                        q: "Cât durează producția și livrarea?",
                                        a: "Print UV direct pe panou, fără timp de uscare — producție rapidă, livrare prin curier de regulă în 24-48h."
                                    }
                                ].map((faq, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                                        <h4 className="font-bold text-lg text-slate-900 mb-2">{faq.q}</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Suspense>
    );
}
