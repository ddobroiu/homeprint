import { Suspense } from 'react';
import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Autocolante Personalizate - Stickere Oracal',
    description: 'Comandă autocolante personalizate online pe vinyl Oracal. Tăiere pe contur, laminare și print UV premium. Livrare rapidă și preț instant.',
    keywords: ['autocolante personalizate', 'stickere personalizate', 'oracal', 'vinyl', 'etichete', 'homeprint'],
    alternates: {
        canonical: '/configurator/autocolante',
    },
};

export default function AutocolantePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă configuratorul de autocolante...</div>}>
            <div className="pt-20">
                <h1 className="sr-only">Autocolante Personalizate</h1>
                <BreadcrumbSchema
                    items={[
                        { name: "Acasă", item: "/" },
                        { name: "Configuratoare", item: "/configurator" },
                        { name: "Autocolante Personalizate", item: "/configurator/autocolante" }
                    ]}
                />
                <ProductSchema
                    name="Autocolante Personalizate Oracal"
                    description="Autocolante și stickere personalizate pe vinyl Oracal premium. Tăiere pe contur digitală și laminare opțională."
                    image="/products/autocolante/autocolante-1.webp"
                    url="/configurator/autocolante"
                    price="35.00"
                />
                <ConfiguratorDispatcher configuratorId="autocolante" />

                <FAQSchema
                    faqs={[
                        {
                            question: "Care e diferența între Kiss-Cut și Die-Cut?",
                            answer: "Într-un proces Kiss-Cut (Decupare tip Etichete), lama taie strict stratul autocolantului, nu și suportul din silicon pe care stă (role). La Die-Cut (Tăiere completă), este secționat inclusiv suportul pe forma ta individuală (stickere individuale gata de dat cadou)."
                        },
                        {
                            question: "Diferența dintre autocolant monomeric și polimeric?",
                            answer: "Autocolantul Monomeric (economic) se folosește pe suprafețe perfect plane, la interior, sau campanii short-term pe exterior. Polimericul (mai dur, flexibil) urmărește ușor curburile auto (colantări), fiind mult mai stabil din punct de vedere a rezistenței termice timp de câțiva ani."
                        },
                        {
                            question: "Livrati etichetele in rola (role pentru aplicator manual)?",
                            answer: "Pentru producția standard, noi predăm role cu lățimea materialului de 100/120 cm sau format sheet-uri (coală mare tăiată) unde sunt așezate produsele tale. Pentru utilaje automate, rolarea necesită echipamente Flexo."
                        },
                        {
                            question: "Mă pot baza pe rezistența stickerelor la apă?",
                            answer: "Da, printul UV din dotarea HomePrint aplicat pe folie de PVC devine absolut impermeabil. În plus, alegând laminarea, autocolantul rezistă la solvenți de spălare blânzi și frecare (ex: spălătorie auto)."
                        }
                    ]}
                />

                {/* MASSIVE SEO CONTENT SECTION */}
                <section className="bg-white py-16 mt-16 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Autocolante și Stickere Personalizate cu Tăiere pe Contur
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Transformă-ți logo-ul, ilustrațiile sau mesajele în etichete de produs profesionale. Ne bazăm pe <strong className="text-orange-600">materiale Oracal veritabile</strong>. Cerneală UV durabilă și tăieri impecabile (Kiss-cut / Die-cut) pentru nevoile oricărei afaceri.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">Calitate Tehnică Superioară</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Decupare pe Contur Digitală</strong>
                                            <span className="text-slate-600 text-sm">Eliminăm fundalul alb standard. Oferim tăiere precisă după marginile designului tău, fie litere alungite, logo-uri rotunde sau siluete complexe.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Laminare (Mată sau Lucioasă)</strong>
                                            <span className="text-slate-600 text-sm">Pentru protecție la zgârieturi, soluții de curățare și raze UV. Autocolantul laminat are o viață de 3-5 ori mai mare decât cel simplu tipărit.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Role Oracal (Germania)</strong>
                                            <span className="text-slate-600 text-sm">Adezivul (adeziv poliacrilic permanent din import) nu lasă urme groase la dezlipire și nu atacă vopseaua pe care a fost aplicat (pe auto).</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Sfaturi de pregătire fișier</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    Dacă dorești tăierea pe contur personalizată, ideal este să ne trimiți fișierul în format <strong className="text-black">Vectorial (.PDF, .AI sau .EPS)</strong> cu textele convertite la curbe.
                                </p>
                                <p className="text-slate-600 leading-relaxed">
                                    În Illustrator sau Corel Draw, creează un layer special denumit "CutContour" și trasează o linie subțire Pantone (Spot Color) pe unde dorești să taie lama. În lipsa acestuia, echipa de DTP HomePrint se va ocupa gratuit de generarea liniei de contur pe grafică.
                                </p>
                            </div>
                        </div>

                        {/* SEO FAQ Structured Schema */}
                        <div className="mt-16 border-t border-slate-200 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente Autocolante</h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        q: "Care e diferența între Kiss-Cut și Die-Cut?",
                                        a: "Într-un proces Kiss-Cut (Decupare tip Etichete), lama taie strict stratul autocolantului, nu și suportul din silicon pe care stă (role). La Die-Cut (Tăiere completă), este secționat inclusiv suportul pe forma ta individuală (stickere individuale gata de dat cadou)."
                                    },
                                    {
                                        q: "Diferența dintre autocolant monomeric și polimeric?",
                                        a: "Autocolantul Monomeric (economic) se folosește pe suprafețe perfect plane, la interior, sau campanii short-term pe exterior. Polimericul (mai dur, flexibil) urmărește ușor curburile auto (colantări), fiind mult mai stabil din punct de vedere a rezistenței termice timp de câțiva ani."
                                    },
                                    {
                                        q: "Livrati etichetele in rola (role pentru aplicator manual)?",
                                        a: "Pentru producția standard, noi predăm role cu lățimea materialului de 100/120 cm sau format sheet-uri (coală mare tăiată) unde sunt așezate produsele tale. Pentru utilaje automate, rolarea necesită echipamente Flexo."
                                    },
                                    {
                                        q: "Mă pot baza pe rezistența stickerelor la apă?",
                                        a: "Da, printul UV din dotarea HomePrint aplicat pe folie de PVC devine absolut impermeabil. În plus, alegând laminarea, autocolantul rezistă la solvenți de spălare blânzi și frecare (ex: spălătorie auto)."
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
