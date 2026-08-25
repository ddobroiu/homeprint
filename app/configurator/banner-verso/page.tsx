import React, { Suspense } from "react";
import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";

export const metadata = {
    title: 'Banner Față-Verso Blockout pentru Bannere Suspendate - HomePrint',
    description: 'Comandă bannere printate pe ambele fețe (blockout), 100% opac — soluția pentru un banner suspendat deasupra unei străzi, vizibil corect din ambele sensuri de mers. Preț instant.',
    keywords: ['banner fata-verso', 'banner blockout', 'banner suspendat strada', 'print dubla fata', 'publicitate stradala', 'homeprint'],
    alternates: { canonical: "/configurator/banner-verso" },
};

export default function BannerVersoPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă configuratorul Banner Verso...</div>}>
            <div className="pt-20">
                <h1 className="sr-only">Banner Față-Verso Blockout</h1>
                <BreadcrumbSchema
                    items={[
                        { name: "Acasă", item: "/" },
                        { name: "Configuratoare", item: "/configurator" },
                        { name: "Banner Față-Verso", item: "/configurator/banner-verso" }
                    ]}
                />
                <ProductSchema
                    name="Banner Față-Verso Blockout"
                    description="Banner printat pe ambele fețe cu material blockout 100% opac, pentru bannere suspendate vizibile corect din ambele sensuri de mers."
                    image="/products/fata-verso/banner-verso-1.webp"
                    url="/configurator/banner-verso"
                    price="60.00"
                />
                <ConfiguratorDispatcher configuratorId="banner-verso" />

                <FAQSchema
                    faqs={[
                        {
                            question: "Materialul este mai gros / mai greu decât un banner normal?",
                            answer: "Da, poliplanul tip Blockout folosit de HomePrint este de obicei în standardul de greutate High (între 500g și 610g/mp), fiind mult mai adânc ranforsat pentru stabilitate anti-rupere superioară la vânturi puternice."
                        },
                        {
                            question: "Ce includ finisajele pentru bannerele față-verso?",
                            answer: "Ca și în cazul bannerelor clasice Frontlit, primești gratuit capse pe întregul perimetru de prindere, iar la cerere putem crea așa-numitele Buzunare (partea superioară și inferioară unde se poate introduce o rangă transversală metalică sau din lemn pentru întindere pe stâlpi tip Steag)."
                        },
                        {
                            question: "Are sens pentru un banner suspendat deasupra unei străzi?",
                            answer: "Exact acolo își arată valoarea — un banner obișnuit lasă să se vadă lumina prin el, iar grafica de pe fața opusă „transpare” inversat. Blockout-ul e complet opac, deci ambele fețe rămân perfect lizibile indiferent din ce direcție circulă traficul."
                        },
                        {
                            question: "Cât durează producția unui banner față-verso?",
                            answer: "Procesul e mai laborios decât la un banner simplu (print, uscare, verificare aliniere pe ambele fețe), dar livrarea standard rămâne tot 24-48h lucrătoare din momentul aprobării graficii."
                        }
                    ]}
                />

                {/* MASSIVE SEO CONTENT SECTION */}
                <section className="bg-white py-16 mt-16 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Bannere Față-Verso (Material Blockout)
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Când vrei ca reclama ta să fie văzută din ambele sensuri de mers, un banner frontlit simplu nu e suficient. Intră în scenă <strong className="text-orange-600">Poliplanul Blockout (dublă față)</strong> – 100% opac, ultra-rezistent, perfect pentru steaguri suspendate sau semnalizări perpendiculare pe stradă.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">De ce 1 Banner Blockout face cât 2 clasice?</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Structură Opacă Inovatoare</strong>
                                            <span className="text-slate-600 text-sm">Designul special include o peliculă de polimer negru laminată la interiorul materialului de bază, blocând fizic trecerea oricărei raze de lumină. Chiar și cu soarele pulsând din spate, grafica de pe partea opusă nu se va „încăleca” grafic.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Economie Fixare & Spațiu</strong>
                                            <span className="text-slate-600 text-sm">Dacă ai un cadru liber (cum e pe axul central al unui stâlp de iluminat), folosești un singur produs ancorat în locul achiziționării a două bannere normale lipite mecanic între ele.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Regulă de Pregătire a Graficii</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    Pentru că tipărim pe ambele părți ale aceluiași material, atunci când trimiți comanda este necesar să specifici explicit dacă dorești <strong className="text-black">Grafică Identică</strong> sau <strong className="text-black">Fețe Diferite</strong>.
                                </p>
                                <p className="text-slate-600 leading-relaxed font-bold text-sm">
                                    Încarcă fișierul sub formă de PDF multi-page (Pagina 1 va fi fața / Pagina 2 va fi spatele).
                                </p>
                            </div>
                        </div>

                        {/* SEO FAQ Structured Schema */}
                        <div className="mt-16 border-t border-slate-200 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente Blockout Față-Verso</h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        q: "Materialul este mai gros / mai greu decât un banner normal?",
                                        a: "Da, poliplanul tip Blockout folosit de HomePrint este de obicei în standardul de greutate High (între 500g și 610g/mp), fiind mult mai adânc ranforsat pentru stabilitate anti-rupere superioară la vânturi puternice."
                                    },
                                    {
                                        q: "Ce includ finisajele pentru bannerele față-verso?",
                                        a: "Ca și în cazul bannerelor clasice Frontlit, primești gratuit capse pe întregul perimetru de prindere, iar la cerere putem crea așa-numitele Buzunare (partea superioară și inferioară unde se poate introduce o rangă transversală metalică sau din lemn pentru întindere pe stâlpi tip Steag)."
                                    },
                                    {
                                        q: "Are sens pentru un banner suspendat deasupra unei străzi?",
                                        a: "Exact acolo își arată valoarea — un banner obișnuit lasă să se vadă lumina prin el, iar grafica de pe fața opusă „transpare” inversat. Blockout-ul e complet opac, deci ambele fețe rămân perfect lizibile indiferent din ce direcție circulă traficul."
                                    },
                                    {
                                        q: "Cât durează producția unui banner față-verso?",
                                        a: "Procesul e mai laborios decât la un banner simplu (print, uscare, verificare aliniere pe ambele fețe), dar livrarea standard rămâne tot 24-48h lucrătoare din momentul aprobării graficii."
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
