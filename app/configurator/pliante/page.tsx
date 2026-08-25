import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Pliante Personalizate - Pliere Z-fold, C-fold pentru Business - HomePrint',
    description: 'Comandă pliante publicitare personalizate, împăturite Z-fold, C-fold sau în două. Hârtie premium 115g-250g, ideale pentru broșuri de prezentare și cataloage. Preț instant.',
    keywords: ['pliante personalizate', 'brosuri', 'print pliante', 'flyere indoite', 'marketing offline', 'pliante ieftine', 'homeprint'],
    alternates: {
        canonical: '/configurator/pliante',
    },
};

export default function PliantePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă configuratorul Pliante...</div>}>
            <div className="pt-20">
                <h1 className="sr-only">Pliante și Broșuri Personalizate</h1>
                <BreadcrumbSchema
                    items={[
                        { name: "Acasă", item: "/" },
                        { name: "Configuratoare", item: "/configurator" },
                        { name: "Pliante Publicitare", item: "/configurator/pliante" }
                    ]}
                />
                <ProductSchema
                    name="Pliante Publicitare Personalizate"
                    description="Pliante publicitare pe hârtie premium, cu pliere Z-fold, C-fold sau în două, pentru broșuri de prezentare și cataloage de business."
                    image="/products/pliante/pliante-1.webp"
                    url="/configurator/pliante"
                    price="20.00"
                />
                <ConfiguratorDispatcher configuratorId="pliante" />

                <FAQSchema
                    faqs={[
                        {
                            question: "Care este deosebirea dintre Flyer și Pliant?",
                            answer: "Simplu: Flyer-ul/fluturașul este o simplă coală neîndoită printată. Pliantul însă pleacă de la o coală plată care este mai apoi trecută print echipamentul de Fălțuire automat unde este îndoită în două, trei (în U, M, Z sau acordeon) generând mai multe pagini vizibil separate, ca la o mini-broșură."
                        },
                        {
                            question: "Sunt îndoite perfect drept, sau necesită manualitate?",
                            answer: "Predăm exclusiv produsul finit! Dispunem de utilaje care efectuează biguire (un proces mecanic ce slăbește fibra pentru ca hârtiile groase să se plieze perfect impecabil la unghi drept fără să pocnească / albească marginea printată la curbură)."
                        },
                        {
                            question: "Ce gramaj de hârtie recomandați pentru un pliant de business?",
                            answer: "Pentru un pliant de prezentare care rezistă bine în mână, recomandăm 150g-170g. Pentru cataloage sau materiale premium care rămân mai mult timp la client, mergem pe 200g-250g."
                        },
                        {
                            question: "Cât durează producția pentru un pliant?",
                            answer: "Pliere mecanizată, fără procese manuale — producție rapidă, livrare prin curier de regulă în 24-48h din momentul aprobării machetei."
                        }
                    ]}
                />

                {/* MASSIVE SEO CONTENT SECTION */}
                <section className="bg-white py-16 mt-16 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Pliante și Broșuri (Z-fold, C-fold, Window)
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Transformă experiența prezentării cu <strong className="text-orange-600">Pliante Profesional tipizate</strong> (îndoiri duble, triplate). Ideale pentru broșuri de informare clinică, liste de prețuri pentru saloane de beauty ori cataloage rapide de mașini.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">Rolul unui Pliant bine executat:</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Creează poveste (Storytelling)</strong>
                                            <span className="text-slate-600 text-sm">Spre deosebire de un fluturaș standard (vizualizare brutală), Pliantul forțează omul să depună un efort de "descoperire". Acțiunea de Despăturire e un declanșator psihologic pentru ca interesul să fie menținut de la prima pagină la ofertele din interior.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Pregătire pliuri</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    Atenție din nou la marginile de tăiere (Bleed de 3-5mm pe contur) iar laturile ce urmează a fi ascunse / îndoite pe interior trebuie făcute pe ecran cu fix 1mm - 2mm mai scurte decât fețele frontale, pentru ca pagina să nu agațe atunci când se va plia definitiv!
                                </p>
                            </div>
                        </div>

                        {/* SEO FAQ Structured Schema */}
                        <div className="mt-16 border-t border-slate-200 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente Pliante</h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        q: "Care este deosebirea dintre Flyer și Pliant?",
                                        a: "Simplu: Flyer-ul/fluturașul este o simplă coală neîndoită printată. Pliantul însă pleacă de la o coală plată care este mai apoi trecută print echipamentul de Fălțuire automat unde este îndoită în două, trei (în U, M, Z sau acordeon) generând mai multe pagini vizibil separate, ca la o mini-broșură."
                                    },
                                    {
                                        q: "Sunt îndoite perfect drept, sau necesită manualitate?",
                                        a: "Predăm exclusiv produsul finit! Dispunem de utilaje care efectuează biguire (un proces mecanic ce slăbește fibra pentru ca hârtiile groase să se plieze perfect impecabil la unghi drept fără să pocnească / albească marginea printată la curbură)."
                                    },
                                    {
                                        q: "Ce gramaj de hârtie recomandați pentru un pliant de business?",
                                        a: "Pentru un pliant de prezentare care rezistă bine în mână, recomandăm 150g-170g. Pentru cataloage sau materiale premium care rămân mai mult timp la client, mergem pe 200g-250g."
                                    },
                                    {
                                        q: "Cât durează producția pentru un pliant?",
                                        a: "Pliere mecanizată, fără procese manuale — producție rapidă, livrare prin curier de regulă în 24-48h din momentul aprobării machetei."
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
