import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Rollup Banner Personalizat - Sisteme Expoziți',
    description: 'Comandă rollup banner online. Sistem din aluminiu cu print HD și geantă inclusă. Preț instant și livrare rapidă.',
    keywords: ['rollup banner', 'sistem expozitional', 'print rollup', 'homeprint', 'banner retractabil', 'expozitii', 'rollup pret'],
    alternates: {
        canonical: '/configurator/rollup',
    },
};

export default function RollupPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă configuratorul Rollup...</div>}>
            <BreadcrumbSchema
                items={[
                    { name: "Acasă", item: "/" },
                    { name: "Configuratoare", item: "/configurator" },
                    { name: "Rollup Banner", item: "/configurator/rollup" }
                ]}
            />
            <ProductSchema
                name="Sistem Expozițional Rollup Banner"
                description="Comandă rollup banner premium cu casetă aluminiu, print HD și geantă de transport inclusă."
                image="/logo.svg"
                url="/configurator/rollup"
                price="150.00"
            />
            <div className="pt-20">
                <h1 className="sr-only">Rollup Banner Personalizat</h1>
                <ConfiguratorDispatcher configuratorId="rollup" />

                <FAQSchema
                    faqs={[
                        {
                            q: "Pot alege mai multe dimensiuni? Ce dimensiune e standard?",
                            a: "Dimensiunea clasică și cea mai comandată este 85 cm x 200 cm înălțime (reprezentând cel mai bun raport între portabilitate și vizibilitate). Oferim adițional pe site dimensiuni de 100x200cm, 120x200cm, ajungând chiar până la sistemele ultra-largi de 150x200cm."
                        },
                        {
                            q: "Se poate schimba ulterior print-ul din sistemul actual?",
                            a: "Da, deși procedeul necesită răbdare tehnică. Putem trimite doar materialul personalizat tipărit, iar dvs. folosiți tija adezivă de la vechiul Rollup sau, pentru siguranță, trimiteți sistemul (caseta) la noi pentru a vă înlocui printul profesional direct în fabrică."
                        },
                        {
                            q: "Roll-up-urile pot fi folosite afară (la exterior)?",
                            a: "Nu este recomandat! Rollup-urile au la bază sisteme ușoare super-portabile (sub 3 Kilograme). Designul tijei, tip „manta de vele” este extrem de sensibil la vântul de afară și se va prăbuși instantaneu."
                        },
                        {
                            q: "Beneficiez de reduceri pentru comenzi mari de Roll-up Banners?",
                            a: "Pentru cumpărături volumetrice (> 10-15 bucăți comandate cu grafică similară sau la alegere), sistemul din coșul de cumpărături îți va calcula discount-uri de scalare automate."
                        }
                    ].map(f => ({ question: f.q, answer: f.a }))}
                />

                {/* MASSIVE SEO CONTENT SECTION */}
                <section className="bg-white py-16 mt-16 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Roll Up Banner Personalizat - Sistem Expozițional Profesional
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Soluția ideală pentru conferințe, recepții, standuri expoziționale sau puncte de vânzare. Ușor de transportat, gata de expunere în mai puțin de <strong className="text-orange-600">30 de secunde</strong>. Calitate de top, sistem durabil integrat cu casetă de aluminiu și print HD.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">De ce să ne alegi sistemele sistemele noastre?</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Material Print Polipropilenă (Nu face "burți")</strong>
                                            <span className="text-slate-600 text-sm">Nu folosim banner PVC la roll-up-uri (care se curbează inestetic pe margini în timp). Folosim material special PP (Polipropilenă) cu spate alb care stă perfect întins!</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Sistem Mecanic Verificat & Garantat</strong>
                                            <span className="text-slate-600 text-sm">Toate sistemele din aluminiu (caseta) au componente interne testate, arc cu tensiune de calibrare, prevăzute cu tălpi duble de susținere robuste pentru stabilitate maximă, inclusiv în zone de trafic.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Geantă de Transport Inclusă</strong>
                                            <span className="text-slate-600 text-sm">Fiecare roll up banner vine gratuit preasamblat, pus cu grijă într-o husă neagră din material textil cu fermoar, pregătit de transport către următorul tău eveniment.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Reguli de bază pentru grafică (DTP)</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    Partea de jos a mesajului promoțional trebuie să conțină o <strong>zonă moartă de de jos (Bleed inferior) de minim 5 - 10 cm</strong>. Acești 10 cm vor rămâne prinși în rolă (invizibili vederii) odată ce banner-ul este ridicat și tensionat! Setati formatul machetei CMYK.
                                </p>
                                <p className="text-slate-600 leading-relaxed font-bold">
                                    Pune textele importante în partea superioară a compoziției, acolo unde se duce privirea vizitatorului la nivelul ochilor.
                                </p>
                            </div>
                        </div>

                        {/* SEO FAQ Structured Schema */}
                        <div className="mt-16 border-t border-slate-200 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente Roll-Up Banners</h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        q: "Pot alege mai multe dimensiuni? Ce dimensiune e standard?",
                                        a: "Dimensiunea clasică și cea mai comandată este 85 cm x 200 cm înălțime (reprezentând cel mai bun raport între portabilitate și vizibilitate). Oferim adițional pe site dimensiuni de 100x200cm, 120x200cm, ajungând chiar până la sistemele ultra-largi de 150x200cm, care funcționează adesea pe post de panouri Spider / backdrops pentru interviuri mediatice."
                                    },
                                    {
                                        q: "Se poate schimba ulterior print-ul din sistemul actual?",
                                        a: "Da, deși procedeul necesită răbdare tehnică. Putem trimite doar materialul personalizat tipărit, iar dvs. folosiți tija adezivă de la vechiul Rollup sau, pentru siguranță, trimiteți sistemul (caseta) la noi pentru a vă înlocui printul profesional direct în fabrică (cu recalibrare de tensiune)."
                                    },
                                    {
                                        q: "Roll-up-urile pot fi folosite afară (la exterior)?",
                                        a: "Nu este recomandat! Rollup-urile au la bază sisteme ușoare super-portabile (sub 3 Kilograme). Designul tijei, tip „manta de vele” este extrem de sensibil la vântul de afară și se va prăbuși instantaneu. Pentru evenimente exterioare, recomandăm sisteme stabile X-Banner încărcate cu nisip/apă, Steaguri sau Bannere ancorate."
                                    },
                                    {
                                        q: "Beneficiez de reduceri pentru comenzi mari de Roll-up Banners?",
                                        a: "Pentru cumpărături volumetrice (> 10-15 bucăți comandate cu grafică similară sau la alegere), sistemul din coșul de cumpărături îți va calcula discount-uri de scalare automate."
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
