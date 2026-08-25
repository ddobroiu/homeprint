import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'PVC Forex Personalizat pentru Panouri de Firmă Mid-Range | HomePrint',
    description: 'Panouri din PVC expandat (Forex), rigide și ușoare, la mijloc între polipropilenă și Alucobond ca durabilitate — soluția comună pentru firme de magazin și semnalistică outdoor/indoor. Grosimi 3-10mm.',
    keywords: ['pvc forex', 'panouri firma magazin', 'pvc expandat semnalistica', 'placi pvc rigide', 'forex outdoor', 'homeprint'],
    alternates: {
        canonical: '/materiale/pvc-forex',
    },
};

export default function PVCForexPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă configuratorul PVC Forex...</div>}>
            <div className="pt-20">
                <h1 className="sr-only">PVC Forex Personalizat pentru Panouri de Firmă</h1>
                <BreadcrumbSchema
                    items={[
                        { name: "Acasă", item: "/" },
                        { name: "Materiale", item: "/materiale" },
                        { name: "PVC Forex", item: "/materiale/pvc-forex" }
                    ]}
                />
                <ProductSchema
                    name="Panou PVC Forex Personalizat"
                    description="Panou rigid din PVC expandat (Forex), la mijloc între polipropilenă și Alucobond ca durabilitate, ideal pentru firme de magazin și semnalistică outdoor/indoor."
                    image="/products/master/placi-pvc-forex-personalizat-print-uv.png"
                    url="/materiale/pvc-forex"
                    price="35.00"
                />
                <ConfiguratorDispatcher configuratorId="pvc-forex" />

                <FAQSchema
                    faqs={[
                        {
                            question: "Unde se situează PVC Forex-ul față de polipropilenă și Alucobond?",
                            answer: "Exact la mijloc. E mai rigid și mai rezistent în timp decât polipropilena celulară (Akyplac), dar costă mai puțin decât Alucobond. E alegerea potrivită pentru un panou de firmă care trebuie să dureze câțiva ani, fără bugetul unei firme premium din aluminiu."
                        },
                        {
                            question: "Rezistă la exterior, la soare și ploaie?",
                            answer: "Da, e un material folosit frecvent la semnalistică outdoor — panouri de firmă montate pe fațadă, indicatoare, panouri de magazin. Pe suprafețe foarte mari expuse direct la soare puternic, poate apărea o ușoară curbare în timp, situație în care recomandăm Alucobond."
                        },
                        {
                            question: "Ce grosime aleg pentru o firmă de magazin?",
                            answer: "5mm e standardul pentru majoritatea panourilor de firmă montate pe fațadă. Pentru panouri mici de interior, 3mm e suficient; pentru panouri foarte mari, recomandăm 8-10mm pentru rigiditate."
                        },
                        {
                            question: "Se poate folosi și la interior, nu doar outdoor?",
                            answer: "Da, e la fel de potrivit pentru semnalistică indoor — panouri de birou, indicatoare interioare, standuri — unde combinația de rigiditate și cost redus îl face o alegere practică."
                        }
                    ]}
                />

                <section className="bg-white py-16 mt-16 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                PVC Forex — Panoul de Mijloc pentru Firma Ta de Magazin
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Placa din PVC expandat (Forex) stă <strong className="text-amber-600">exact între polipropilenă și Alucobond</strong> ca durabilitate și preț — soluția cea mai comună pentru firme de magazin și semnalistică outdoor sau indoor.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-500 pb-2 inline-block">Pentru ce se folosește</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Firme de magazin montate pe fațadă</strong>
                                            <span className="text-slate-600 text-sm">Rigid și ușor, rezistă bine ani de zile la exterior, la un cost mult mai mic decât Alucobond.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Semnalistică outdoor și indoor</strong>
                                            <span className="text-slate-600 text-sm">Suficient de rigid pentru panouri de exterior, dar la fel de bun pentru indicatoare și standuri de interior.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Echilibru cost-durabilitate</strong>
                                            <span className="text-slate-600 text-sm">Nu ai nevoie de bugetul unei firme premium din aluminiu, dar vrei mai multă rigiditate decât o placă de polipropilenă.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Ce grosime să alegi</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    5mm e standardul pentru firme de magazin montate pe fațadă. 3mm pentru panouri mici de interior, 8-10mm pentru panouri mari care au nevoie de rigiditate suplimentară.
                                </p>
                                <p className="text-slate-600 leading-relaxed font-bold">
                                    Pe suprafețe foarte mari expuse direct la soare puternic, poate apărea o ușoară curbare în timp — pentru acele cazuri recomandăm Alucobond.
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 border-t border-slate-200 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente</h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        q: "Unde se situează PVC Forex-ul față de polipropilenă și Alucobond?",
                                        a: "Exact la mijloc. E mai rigid și mai rezistent în timp decât polipropilena celulară (Akyplac), dar costă mai puțin decât Alucobond. E alegerea potrivită pentru un panou de firmă care trebuie să dureze câțiva ani, fără bugetul unei firme premium din aluminiu."
                                    },
                                    {
                                        q: "Rezistă la exterior, la soare și ploaie?",
                                        a: "Da, e un material folosit frecvent la semnalistică outdoor — panouri de firmă montate pe fațadă, indicatoare, panouri de magazin. Pe suprafețe foarte mari expuse direct la soare puternic, poate apărea o ușoară curbare în timp, situație în care recomandăm Alucobond."
                                    },
                                    {
                                        q: "Ce grosime aleg pentru o firmă de magazin?",
                                        a: "5mm e standardul pentru majoritatea panourilor de firmă montate pe fațadă. Pentru panouri mici de interior, 3mm e suficient; pentru panouri foarte mari, recomandăm 8-10mm pentru rigiditate."
                                    },
                                    {
                                        q: "Se poate folosi și la interior, nu doar outdoor?",
                                        a: "Da, e la fel de potrivit pentru semnalistică indoor — panouri de birou, indicatoare interioare, standuri — unde combinația de rigiditate și cost redus îl face o alegere practică."
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
