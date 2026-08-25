import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Panouri Alucobond (Dibond) pentru Fațadă și Firmă Permanentă | HomePrint',
    description: 'Panouri compozite din aluminiu (Alucobond/Dibond), cel mai durabil material rigid pentru firme de fațadă și semnalistică permanentă de exterior. Print UV direct, planeitate perfectă. Preț instant.',
    keywords: ['alucobond personalizat', 'dibond firma', 'panou aluminiu fatada', 'firma exterior permanenta', 'panou compozit aluminiu', 'homeprint'],
    alternates: {
        canonical: '/materiale/alucobond',
    },
};

export default function AlucobondPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă configuratorul Alucobond...</div>}>
            <div className="pt-20">
                <h1 className="sr-only">Panouri Alucobond (Dibond) pentru Firmă și Fațadă Permanentă</h1>
                <BreadcrumbSchema
                    items={[
                        { name: "Acasă", item: "/" },
                        { name: "Materiale", item: "/materiale" },
                        { name: "Alucobond", item: "/materiale/alucobond" }
                    ]}
                />
                <ProductSchema
                    name="Panou Alucobond (Dibond) Personalizat"
                    description="Panou compozit din aluminiu, cel mai durabil material rigid din gama HomePrint, pentru firme de fațadă și semnalistică permanentă de exterior."
                    image="/products/master/panouri-alucobond-dibond-compozit-aluminiu-personalizat.png"
                    url="/materiale/alucobond"
                    price="70.00"
                />
                <ConfiguratorDispatcher configuratorId="alucobond" />

                <FAQSchema
                    faqs={[
                        {
                            question: "De ce e Alucobond mai scump decât PVC Forex sau polipropilena?",
                            answer: "Pentru că e materialul cel mai durabil din gama noastră de plăci rigide: două fețe de aluminiu cu miez de polietilenă la mijloc, perfect plan, nu se curbează în timp și rezistă mulți ani la soare și intemperii — de aceea e alegerea firmelor permanente montate pe fațadă, nu a panourilor temporare."
                        },
                        {
                            question: "Pentru ce tip de semnalistică e recomandat?",
                            answer: "Pentru firma unei afaceri montată definitiv pe clădire, casete luminoase, panouri de fațadă expuse ani de zile la exterior — orice situație în care vrei ca panoul să arate impecabil mult timp, nu doar câteva luni."
                        },
                        {
                            question: "Se decolorează sau se deformează în timp la soare puternic?",
                            answer: "Nu, spre deosebire de PVC Forex care se poate ondula ușor pe suprafețe mari expuse direct la soare, Alucobond-ul își păstrează planeitatea perfectă și rezistă la radiație UV pe termen lung, fără deformare."
                        },
                        {
                            question: "Ce grosime aleg pentru o firmă de exterior?",
                            answer: "3mm e standardul folosit pentru majoritatea firmelor și panourilor de fațadă. Pentru panouri de dimensiuni foarte mari sau montaje suspendate, recomandăm 4mm pentru rigiditate suplimentară."
                        }
                    ]}
                />

                <section className="bg-white py-16 mt-16 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Alucobond — Materialul Premium pentru Firmă Permanentă
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Panoul compozit din aluminiu (Alucobond/Dibond) e <strong className="text-amber-600">cel mai durabil material rigid</strong> din gama noastră — alegerea potrivită când placa rămâne montată pe fațadă ani de zile, nu doar câteva luni.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-500 pb-2 inline-block">Pentru ce se folosește</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Firmă de fațadă montată definitiv</strong>
                                            <span className="text-slate-600 text-sm">Placa nu se ondulează și nu se decolorează în timp, deci arată impecabil ani de zile pe frontul unei clădiri.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Casete luminoase și panouri mari</strong>
                                            <span className="text-slate-600 text-sm">Rigiditate și planeitate perfectă chiar la dimensiuni mari, unde materialele mai ieftine s-ar deforma vizibil.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Aspect premium pentru brand</strong>
                                            <span className="text-slate-600 text-sm">Suprafața metalică perfect netedă transmite o imagine profesională, potrivită pentru sedii, showroom-uri sau firme corporate.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Ce grosime să alegi</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    3mm e suficient pentru majoritatea firmelor și panourilor de fațadă. Pentru panouri foarte mari sau montaje suspendate, recomandăm 4mm pentru rigiditate suplimentară.
                                </p>
                                <p className="text-slate-600 leading-relaxed font-bold">
                                    Dacă panoul urmează să stea montat definitiv pe clădire, Alucobond-ul se amortizează rapid față de un material mai ieftin pe care ai fi nevoit să-l înlocuiești peste 2-3 ani.
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 border-t border-slate-200 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente</h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        q: "De ce e Alucobond mai scump decât PVC Forex sau polipropilena?",
                                        a: "Pentru că e materialul cel mai durabil din gama noastră de plăci rigide: două fețe de aluminiu cu miez de polietilenă la mijloc, perfect plan, nu se curbează în timp și rezistă mulți ani la soare și intemperii — de aceea e alegerea firmelor permanente montate pe fațadă, nu a panourilor temporare."
                                    },
                                    {
                                        q: "Pentru ce tip de semnalistică e recomandat?",
                                        a: "Pentru firma unei afaceri montată definitiv pe clădire, casete luminoase, panouri de fațadă expuse ani de zile la exterior — orice situație în care vrei ca panoul să arate impecabil mult timp, nu doar câteva luni."
                                    },
                                    {
                                        q: "Se decolorează sau se deformează în timp la soare puternic?",
                                        a: "Nu, spre deosebire de PVC Forex care se poate ondula ușor pe suprafețe mari expuse direct la soare, Alucobond-ul își păstrează planeitatea perfectă și rezistă la radiație UV pe termen lung, fără deformare."
                                    },
                                    {
                                        q: "Ce grosime aleg pentru o firmă de exterior?",
                                        a: "3mm e standardul folosit pentru majoritatea firmelor și panourilor de fațadă. Pentru panouri de dimensiuni foarte mari sau montaje suspendate, recomandăm 4mm pentru rigiditate suplimentară."
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
