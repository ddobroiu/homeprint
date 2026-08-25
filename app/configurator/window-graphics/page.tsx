import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Window Graphics pentru Vitrine - Autocolant Perforat One-Way - HomePrint',
    description: 'Transformă vitrina magazinului într-un panou publicitar cu Window Graphics — folie perforată One-Way Vision, personalul vede afară, publicul vede reclama. Preț instant.',
    keywords: ['window graphics', 'autocolant perforat vitrina', 'one way vision', 'folie geam magazin', 'vitrofanie', 'homeprint'],
    alternates: {
        canonical: '/configurator/window-graphics',
    },
};

export default function WindowGraphicsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă configuratorul Window Graphics...</div>}>
            <div className="pt-20">
                <h1 className="sr-only">Window Graphics - Autocolant Perforat Personalizat One-Way Vision</h1>
                <BreadcrumbSchema
                    items={[
                        { name: "Acasă", item: "/" },
                        { name: "Configuratoare", item: "/configurator" },
                        { name: "Window Graphics", item: "/configurator/window-graphics" }
                    ]}
                />
                <ProductSchema
                    name="Window Graphics - Autocolant Perforat One-Way Vision"
                    description="Autocolant perforat One-Way Vision pentru vitrine de magazin — vizibilitate dintr-o singură direcție, personalul vede afară, publicul vede reclama."
                    image="/products/window-graphics/window-graphics-1.webp"
                    url="/configurator/window-graphics"
                    price="40.00"
                />
                <ConfiguratorDispatcher configuratorId="window-graphics" />

                <FAQSchema
                    faqs={[
                        {
                            question: "Pot aplica folie cu găurele pe Luneta mașinii (auto)?",
                            answer: "Absolut, de fapt este una dintre aplicabilitățile principale auto (branding comercial de marcă pe utilitare și turisme). Atenție însă la prevederile RAR cu supra-colantarea și asigurarea unei vizibilități corecte."
                        },
                        {
                            question: "Cum reacționează acest sticker vizual la Night-Time (sau noaptea)?",
                            answer: "Aceasta depinde de lumină! Secretul efectului One-Way stă în contrastul de intensitate. Noaptea, când strada este mai întunecoasă dar tu aprinzi becurile puternice din vitrină comercială, oamenii vor putea vedea prin reclama ta înăuntru! Soluție: lasă luminătorul/spotul aprins fix spre public pe banner."
                        },
                        {
                            question: "Laminăm Window-Graphic-ul?",
                            answer: "Pentru aplicări la vitrine unde se face curățenie agresivă periodic, se poate lamină folia Window Graphics folosind o folie optică pur-transparentă care sigilează micro-găurile ca să nu intre apa/murdăria fix acolo, dar în mod implicit standard, materialul ne-laminat tipărit cu cernelurile de la HomePrint oferă un contrast natural imbatabil!"
                        },
                        {
                            question: "Personalul din interior chiar vede afară fără probleme?",
                            answer: "Da, din interior efectul e similar unei plase fine — vezi strada clar, fără să deranjeze vizibilitatea la casă sau tejghea, în timp ce din exterior trecătorii văd doar imaginea publicitară printată."
                        }
                    ]}
                />

                {/* MASSIVE SEO CONTENT SECTION */}
                <section className="bg-white py-16 mt-16 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Window Graphics: Autocolant Perforat pentru Vitrine
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Transformă geamurile afacerii tale într-un imens panou de marketing făr a obstrura vederea sau lumina. Numit în industrie și autocolant <strong className="text-orange-600">One-way-vision (vedere dintr-o singură direcție)</strong>, blurează privirile indiscrete din afară, lăsând persoanele din interiorul camerei/mașinii să vadă perfect strada!
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">Fenomenul Optic Window-Graphics:</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Cum funcționează Iluzia?</strong>
                                            <span className="text-slate-600 text-sm">Materialul acrilic conține sute de mici găurele prinse în proporție de 50/50 print/aeriber. Din exterior, pe suprafața luminoasă a zilei publicul observă doar tiparul color vibrant. Pe când spatele de culoare neagră, aflat în contact cu interiorul clădirii umbrite acționează similar filtrelor solare sau a unui geam vopsit fumuriu.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Beneficii Solare Majore</strong>
                                            <span className="text-slate-600 text-sm">Pe lângă estetica și suprafața mare pe care poți tipări un număr de telefon (ex: cabinete notariale, saloane tatuaje, frizerii), această aplicare scade radiația termică ce lovește fațada. Încăperile rămân cu destulă lumină și mult răcoroase (scade factura A/C-ului).</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Reguli Design Print Window</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    Spre deosebire de formatul colilor normale albe mate, 30% sau 50% din material se va perfora fizic (vorbim metaforic de zone moarte / goale / spațiu pierdut).
                                </p>
                                <p className="text-slate-600 leading-relaxed font-bold">
                                    EVITĂ pe cât poți: Textele minuscule (font-size mic sau serif-uri) sau portretele în detaliu extrem de fin. Există riscul ca punctuațiile (puncte, virgule) să aibă loc exact într-o perforație și vor dispărea!
                                </p>
                            </div>
                        </div>

                        {/* SEO FAQ Structured Schema */}
                        <div className="mt-16 border-t border-slate-200 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente Window Graphics</h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        q: "Pot aplica folie cu găurele pe Luneta mașinii (auto)?",
                                        a: "Absolut, de fapt este una dintre aplicabilitățile principale auto (branding comercial de marcă pe utilitare și turisme). Atenție însă la prevederile RAR cu supra-colantarea și asigurarea unei vizibilități corecte."
                                    },
                                    {
                                        q: "Cum reacționează acest sticker vizual la Night-Time (sau noaptea)?",
                                        a: "Aceasta depinde de lumină! Secretul efectului One-Way stă în contrastul de intensitate. Noaptea, când strada este mai întunecoasă dar tu aprinzi becurile puternice din vitrină comercială, oamenii vor putea vedea prin reclama ta înăuntru! Soluție: lasă luminătorul/spotul aprins fix spre public pe banner."
                                    },
                                    {
                                        q: "Laminăm Window-Graphic-ul?",
                                        a: "Pentru aplicări la vitrine unde se face curățenie agresivă periodic, se poate lamină folia Window Graphics folosind o folie optică pur-transparentă care sigilează micro-găurile ca să nu intre apa/murdăria fix acolo, dar în mod implicit standard, materialul ne-laminat tipărit cu cernelurile de la HomePrint oferă un contrast natural imbatabil!"
                                    },
                                    {
                                        q: "Personalul din interior chiar vede afară fără probleme?",
                                        a: "Da, din interior efectul e similar unei plase fine — vezi strada clar, fără să deranjeze vizibilitatea la casă sau tejghea, în timp ce din exterior trecătorii văd doar imaginea publicitară printată."
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
