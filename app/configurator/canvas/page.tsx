import { Suspense } from 'react';
import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';
import { SeoDimensionsLinks } from '@/components/SeoDimensionsLinks';

export const metadata: Metadata = {
    title: "Tablou Canvas pentru Birou sau Showroom | HomePrint",
    description: "Tablouri canvas pe pânză premium pentru decor de birou, showroom sau recepție — inclusiv din propriile vizualuri de brand, cu editor online Visionboard. Rezistență și finisaje impecabile.",
    keywords: ['tablou canvas birou', 'canvas decor showroom', 'print canvas business', 'homeprint', 'visionboard canvas'],
};

export default function CanvasPage() {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Acasă", item: "/" },
                    { name: "Configuratoare", item: "/configurator" },
                    { name: "Tablouri Canvas", item: "/configurator/canvas" }
                ]}
            />
            <ProductSchema
                name="Tablou Canvas pentru Decor Business"
                description="Tablou canvas pe pânză 100% bumbac și șasiu din lemn natural — potrivit pentru decor de birou, showroom sau recepție, editabil online cu Visionboard."
                image="/products/canvas/canvas-1.webp"
                url="/configurator/canvas"
                price="55.00"
            />
            <div className="pt-20">
                <h1 className="sr-only">Tablou Canvas pentru Decor de Birou și Showroom</h1>
                <Suspense fallback={<div className="min-h-[60svh] flex items-center justify-center">Se încarcă configuratorul...</div>}>
                    <ConfiguratorDispatcher configuratorId="canvas" />
                </Suspense>

                <FAQSchema
                    faqs={[
                        {
                            question: "Pot folosi un canvas cu logo-ul sau imaginea de brand a firmei?",
                            answer: "Da — poți încărca orice imagine (logo, poză de produs, vizual de campanie) sau o poți compune direct în editorul online Visionboard, disponibil din configurator."
                        },
                        {
                            question: "Se potrivește pentru spații comerciale (recepție, showroom)?",
                            answer: "Da. Pânza texturată și rama fără margini vizibile dau un aspect de galerie, potrivit pentru spații unde imaginea brandului contează — recepții, săli de ședințe, showroom-uri."
                        },
                        {
                            question: "Cum se întreține un tablou canvas expus la trafic de birou?",
                            answer: "Se curăță ușor cu un pămătuf uscat sau o cârpă din microfibră. Evită substanțele chimice de curățat geamuri — pot afecta suprafața pânzei."
                        },
                        {
                            question: "În cât timp e gata comanda?",
                            answer: "Producția durează aproximativ 24h lucrătoare (pânza se întinde manual), plus livrare prin curier — de regulă ajunge în 24-48h."
                        }
                    ]}
                />

                {/* SEO CONTENT SECTION — conținut unic HomePrint */}
                <section className="bg-white py-16 mt-16 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Canvas pentru decorul de business, nu doar amintiri de familie
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Un tablou canvas cu vizualul de brand potrivit schimbă vizibil un birou, un showroom sau o recepție — printăm pe <strong className="text-amber-600">pânză 100% bumbac</strong>, pe șasiu din lemn natural uscat, gata de montat.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-500 pb-2 inline-block">Pentru ce se folosește în practică</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Decor de recepție sau sală de ședințe</strong>
                                            <span className="text-slate-600 text-sm">Un vizual de brand pe canvas dă un aspect mai profesionist decât un poster simplu înrămat.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Editor online integrat (Visionboard)</strong>
                                            <span className="text-slate-600 text-sm">Compui vizualul direct din browser, fără să ai nevoie de un designer separat pentru un canvas simplu.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Șasiu stabil, nu se deformează</strong>
                                            <span className="text-slate-600 text-sm">Lemn uscat special tratat, ca tabloul să rămână drept ani la rând, chiar și în spații cu trafic sau variații de temperatură.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Ce trebuie să știi înainte să comanzi</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    Pentru vizualuri de brand, trimite fișierul la rezoluție mare (ideal vectorial pentru logo) — evită imaginile comprimate de pe rețele sociale, care ies neclare la dimensiuni mari.
                                </p>
                                <p className="text-slate-600 leading-relaxed font-bold">
                                    Atenție la cadraj: pânza se împăturește pe marginea șasiului (~2-3 cm) — nu plasa text sau logo exact pe marginea extremă a designului.
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 border-t border-slate-200 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente</h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        q: "Pot folosi un canvas cu logo-ul sau imaginea de brand a firmei?",
                                        a: "Da — poți încărca orice imagine (logo, poză de produs, vizual de campanie) sau o poți compune direct în editorul online Visionboard, disponibil din configurator."
                                    },
                                    {
                                        q: "Se potrivește pentru spații comerciale (recepție, showroom)?",
                                        a: "Da. Pânza texturată și rama fără margini vizibile dau un aspect de galerie, potrivit pentru spații unde imaginea brandului contează — recepții, săli de ședințe, showroom-uri."
                                    },
                                    {
                                        q: "Cum se întreține un tablou canvas expus la trafic de birou?",
                                        a: "Se curăță ușor cu un pămătuf uscat sau o cârpă din microfibră. Evită substanțele chimice de curățat geamuri — pot afecta suprafața pânzei."
                                    },
                                    {
                                        q: "În cât timp e gata comanda?",
                                        a: "Producția durează aproximativ 24h lucrătoare (pânza se întinde manual), plus livrare prin curier — de regulă ajunge în 24-48h."
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
                <SeoDimensionsLinks
                    productId="canvas"
                    productName="Tablou Canvas"
                    currentW={40}
                    currentH={60}
                />
            </div>
        </>
    );
}
