import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Plexiglas Personalizat pentru Firme Indoor și Display-uri Premium | HomePrint',
    description: 'Plăci de plexiglas (sticlă acrilică) transparente sau albe, debitate CNC, pentru firme indoor premium, meniuri și display-uri de showroom. Print UV direct, grosimi 2-10mm. Preț instant.',
    keywords: ['plexiglas personalizat', 'placi plexiglas firma', 'sticla acrilica showroom', 'print uv plexiglas', 'meniu plexiglas', 'homeprint'],
    alternates: {
        canonical: '/materiale/plexiglass',
    },
};

export default function PlexiglassPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă configuratorul Plexiglas...</div>}>
            <div className="pt-20">
                <h1 className="sr-only">Plexiglas Personalizat pentru Firme Indoor Premium și Display-uri</h1>
                <BreadcrumbSchema
                    items={[
                        { name: "Acasă", item: "/" },
                        { name: "Materiale", item: "/materiale" },
                        { name: "Plexiglass", item: "/materiale/plexiglass" }
                    ]}
                />
                <ProductSchema
                    name="Plexiglas Personalizat (Sticlă Acrilică)"
                    description="Plăci de plexiglas transparente sau albe, debitate CNC la dimensiune, pentru firme indoor premium, meniuri și display-uri de showroom."
                    image="/products/master/placi-plexiglass-transparent-personalizat-print-uv.png"
                    url="/materiale/plexiglass"
                    price="50.00"
                />
                <ConfiguratorDispatcher configuratorId="plexiglass" />

                <FAQSchema
                    faqs={[
                        {
                            question: "Pentru ce se folosește plexiglas-ul, comparativ cu materialele rigide de exterior?",
                            answer: "Plexiglas-ul (sticla acrilică) e materialul premium pentru interior — firme luminoase discrete, meniuri de restaurant, display-uri de showroom sau semnalistică de birou. Aspectul de sticlă îl face vizibil mai elegant decât PVC Forex sau polipropilena, dar costă mai mult și nu e gândit pentru exterior neprotejat pe termen lung."
                        },
                        {
                            question: "Ce diferență e între plexiglas transparent și cel alb?",
                            answer: "Transparentul se folosește pentru piese unde vrei efect de sticlă (suporturi, display-uri, panouri distanțate de perete cu spații între ele). Albul e opac și se folosește ca fundal solid pentru print UV, similar unei plăci rigide clasice, dar cu finisaj mai fin."
                        },
                        {
                            question: "Ce grosime aleg pentru un panou de firmă sau meniu?",
                            answer: "3mm e suficient pentru meniuri sau panouri mici de birou. Pentru firme indoor sau display-uri mai mari care trebuie să stea rigide fără suport suplimentar, recomandăm 5-8mm."
                        },
                        {
                            question: "Puteți debita plexiglas-ul pe o formă personalizată, nu doar dreptunghi?",
                            answer: "Da, debitarea se face CNC, deci putem tăia orice contur — litere volumetrice, logo decupat, forme rotunjite pentru display-uri de showroom."
                        }
                    ]}
                />

                <section className="bg-white py-16 mt-16 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Plexiglas — Materialul Premium pentru Interior
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Plăcile de plexiglas (sticlă acrilică) oferă un <strong className="text-amber-600">aspect premium de interior</strong> — firme indoor discrete, meniuri de restaurant și display-uri de showroom, cu debitare CNC la orice formă.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-500 pb-2 inline-block">Pentru ce se folosește</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Firme indoor premium</strong>
                                            <span className="text-slate-600 text-sm">Recepții, cabinete, sedii de firmă — aspectul de sticlă transmite o imagine mult mai profesională decât un panou PVC.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Meniuri și display-uri de showroom</strong>
                                            <span className="text-slate-600 text-sm">Suprafață perfect netedă, ideală pentru print UV de rezoluție înaltă pe meniuri de restaurant sau piese de prezentare produse.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Forme decupate CNC</strong>
                                            <span className="text-slate-600 text-sm">Litere volumetrice, logo-uri decupate sau contururi personalizate — nu doar panouri dreptunghiulare.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Ce grosime să alegi</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    3mm pentru meniuri sau panouri mici de birou. 5-8mm pentru firme indoor și display-uri mai mari care trebuie să stea rigide fără suport suplimentar.
                                </p>
                                <p className="text-slate-600 leading-relaxed font-bold">
                                    Transparent pentru efect de sticlă și piese distanțate de perete; alb opac pentru fundal solid de print, similar unei plăci rigide clasice.
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 border-t border-slate-200 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente</h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        q: "Pentru ce se folosește plexiglas-ul, comparativ cu materialele rigide de exterior?",
                                        a: "Plexiglas-ul (sticla acrilică) e materialul premium pentru interior — firme luminoase discrete, meniuri de restaurant, display-uri de showroom sau semnalistică de birou. Aspectul de sticlă îl face vizibil mai elegant decât PVC Forex sau polipropilena, dar costă mai mult și nu e gândit pentru exterior neprotejat pe termen lung."
                                    },
                                    {
                                        q: "Ce diferență e între plexiglas transparent și cel alb?",
                                        a: "Transparentul se folosește pentru piese unde vrei efect de sticlă (suporturi, display-uri, panouri distanțate de perete cu spații între ele). Albul e opac și se folosește ca fundal solid pentru print UV, similar unei plăci rigide clasice, dar cu finisaj mai fin."
                                    },
                                    {
                                        q: "Ce grosime aleg pentru un panou de firmă sau meniu?",
                                        a: "3mm e suficient pentru meniuri sau panouri mici de birou. Pentru firme indoor sau display-uri mai mari care trebuie să stea rigide fără suport suplimentar, recomandăm 5-8mm."
                                    },
                                    {
                                        q: "Puteți debita plexiglas-ul pe o formă personalizată, nu doar dreptunghi?",
                                        a: "Da, debitarea se face CNC, deci putem tăia orice contur — litere volumetrice, logo decupat, forme rotunjite pentru display-uri de showroom."
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
