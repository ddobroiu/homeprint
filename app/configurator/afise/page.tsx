import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';
import { Suspense } from "react";
import { SeoDimensionsLinks } from '@/components/SeoDimensionsLinks';

export const metadata: Metadata = {
    title: 'Afișe și Postere Personalizate - Tipar Online',
    description: 'Comandă afișe și postere personalizate la calitate excepțională. Formate A3, A2, A1, A0 sau dimensiuni custom pe hârtie Blueback/Whiteback premium.',
    keywords: ['afise personalizate', 'postere personalizate', 'print online', 'homeprint', 'a3', 'a2', 'a1', 'a0', 'tipar afise'],
    alternates: {
        canonical: '/configurator/afise',
    },
};

export default function AfisePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă configuratorul de afișe...</div>}>
            <div className="pt-20">
                <h1 className="sr-only">Afișe și Postere Personalizate</h1>
                <BreadcrumbSchema
                    items={[
                        { name: "Acasă", item: "/" },
                        { name: "Configuratoare", item: "/configurator" },
                        { name: "Afișe și Postere", item: "/configurator/afise" }
                    ]}
                />
                <ProductSchema
                    name="Afișe și Postere Personalizate"
                    description="Comandă afișe și postere personalizate în formate standard (A3, A2, A1, A0) sau dimensiuni custom."
                    image="/products/afise/afise-1.webp"
                    url="/configurator/afise"
                    price="15.00"
                />
                <ConfiguratorDispatcher configuratorId="afise" />

                <FAQSchema
                    faqs={[
                        {
                            question: "Care dimensiune este potrivită pentru geam / vitrine?",
                            answer: "Formatele de tip A2 (minim) și A1 sunt ideale ca mărime pentru vizibilitate stradală de la 10-15 metri. Formatele A3 sunt adesea limitate strict la aviziere pietonale sau la nivelul omului, întrucât un text mic pe o vitrină nu se va citi din mașină."
                        },
                        {
                            question: "Vreau printare pe un format non-standard. Se poate?",
                            answer: "Pe HomePrint primim grafici neconvenționale. Lățimea maximă dintr-o singură coală este guvernată de rola echipamentului (încadrare limită la ~150-320cm), în timp ce lungimea este teoretic nelimitată (putem tipări postere continue de tip Ribbon)."
                        },
                        {
                            question: "Aș dori afișe cu volum mare pentru electorală/promovare. Ce tiraj trebuie?",
                            answer: "Prețurile afișate în configuratorul nostru includ scalabilitatea reducerilor. Tiparul digital de mari dimensiuni se referă mai repede la comenzi de zeci sau sute de exemplare pentru o reacție ultra-rapidă de print."
                        },
                        {
                            question: "Cât de repede primesc afișele comandate?",
                            answer: "Print digital, fără timpi de uscare — pentru tiraje standard, producția și livrarea prin curier durează de regulă 24-48h lucrătoare din momentul aprobării graficii."
                        }
                    ]}
                />

                {/* MASSIVE SEO CONTENT SECTION */}
                <section className="bg-white py-16 mt-16 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Print Afișe și Postere Publicitare
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Căpătăm atenția publicului cu tipar de <strong className="text-orange-600">afișe stradale mari (A3, A2, A1, A0)</strong> și postere foto. Calitate excelentă pentru campanii electorale, promovări cluburi, piese de teatru, conferințe sau vitrine.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">Materiale speciale pentru Afișe</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Hârtie Blueback 115g (Spate Albastru)</strong>
                                            <span className="text-slate-600 text-sm">Hârtie premium proiectată 100% pentru Outdoor / Panouri stradale. Spatele ei este albastru pentru zero transparență, ceea ce înseamnă că o poți lipi peste afișele concurenței sau reclame vechi fără să transpară dedesubt. Rezistă excelent la umezeală și la lipire cu aracet/adeziv!</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Hârtie Foto/White-Back 150-200g</strong>
                                            <span className="text-slate-600 text-sm">Destinată exclusiv spațiilor de interior: holuri de bloc, panouri expoziționale, mall-uri sau sedii. Ofertă print clar ca lacrima și se mulează perfect în rame click-frame.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Pregătirea machetei (DTP)</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    Formatul unui afiș reușit necesită contraste puternice de culori, un Headline (titlu) proeminent de până la 6-8 cuvinte ușor citibil de a distanță și prezența datelor de contact.
                                </p>
                                <p className="text-slate-600 leading-relaxed font-bold">
                                    Trimite graficile Exportate în format CMYK (.PDF, .TIFF), la cel puțin 150-300 dpi cu fonturile transformate în curbe pentru cel mai bun rezultat de pe mașinile noastre.
                                </p>
                            </div>
                        </div>

                        {/* SEO FAQ Structured Schema */}
                        <div className="mt-16 border-t border-slate-200 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente Afișe</h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        q: "Care dimensiune este potrivită pentru geam / vitrine?",
                                        a: "Formatele de tip A2 (minim) și A1 sunt ideale ca mărime pentru vizibilitate stradală de la 10-15 metri. Formatele A3 sunt adesea limitate strict la aviziere pietonale sau la nivelul omului, întrucât un text mic pe o vitrină nu se va citi din mașină."
                                    },
                                    {
                                        q: "Vreau printare pe un format non-standard. Se poate?",
                                        a: "Pe HomePrint primim grafici neconvenționale. Lățimea maximă dintr-o singură coală este guvernată de rola echipamentului (încadrare limită la ~150-320cm), în timp ce lungimea este teoretic nelimitată (putem tipări postere continue de tip Ribbon)."
                                    },
                                    {
                                        q: "Aș dori afișe cu volum mare pentru electorală/promovare. Ce tiraj trebuie?",
                                        a: "Prețurile afișate în configuratorul nostru includ scalabilitatea reducerilor. Tiparul digital de mari dimensiuni se referă mai repede la comenzi de zeci sau sute de exemplare pentru o reacție ultra-rapidă de print."
                                    },
                                    {
                                        q: "Cât de repede primesc afișele comandate?",
                                        a: "Print digital, fără timpi de uscare — pentru tiraje standard, producția și livrarea prin curier durează de regulă 24-48h lucrătoare din momentul aprobării graficii."
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
                    productId="afise" 
                    productName="Afiș HD" 
                    currentW={50} 
                    currentH={70} 
                />
            </div>
        </Suspense>
    );
}

