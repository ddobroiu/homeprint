import { Suspense } from 'react';
import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Panouri de Vizibilitate Fonduri Europene - Conforme Manual de Identitate Vizuală - HomePrint',
    description: 'Panouri temporare de șantier, plăci permanente și autocolante obligatorii pentru proiecte finanțate din Fonduri Europene, conforme cu Manualul de Identitate Vizuală al programului. Preț instant.',
    keywords: ['fonduri europene', 'panou vizibilitate proiect', 'panouri santier fonduri europene', 'placi permanente proiect', 'manual identitate vizuala', 'homeprint'],
    alternates: {
        canonical: '/configurator/fonduri-eu',
    },
};

export default function FonduriEUPage() {
    return (
        <div className="pt-20">
            <h1 className="sr-only">Panouri de Vizibilitate pentru Proiecte cu Finanțare din Fonduri Europene</h1>
            <BreadcrumbSchema
                items={[
                    { name: "Acasă", item: "/" },
                    { name: "Configuratoare", item: "/configurator" },
                    { name: "Panouri Fonduri Europene", item: "/configurator/fonduri-eu" }
                ]}
            />
            <ProductSchema
                name="Panou de Vizibilitate Fonduri Europene"
                description="Panou temporar de șantier sau placă permanentă pentru proiecte finanțate din Fonduri Europene, conform Manualului de Identitate Vizuală al programului de finanțare."
                image="/products/fonduri/pnrr-1.webp"
                url="/configurator/fonduri-eu"
                price="35.00"
            />
            <Suspense fallback={<div className="min-h-[60svh] flex items-center justify-center">Se încarcă configuratorul de fonduri europene...</div>}>
                <ConfiguratorDispatcher configuratorId="fonduri-eu" />
            </Suspense>

            <FAQSchema
                faqs={[
                    {
                        question: "De ce sunt obligatorii aceste panouri pentru un proiect cu finanțare europeană?",
                        answer: "Fiecare contract de finanțare din fonduri europene (Regio, PNRR, POCU etc.) impune beneficiarului obligații de informare și publicitate, detaliate în Manualul de Identitate Vizuală al programului respectiv. Lipsa panoului sau neconformitatea lui poate genera observații la verificările de proiect."
                    },
                    {
                        question: "Care e diferența dintre panoul temporar de șantier și placa permanentă?",
                        answer: "Panoul temporar se montează la începutul implementării, de regulă pe durata lucrărilor de construcție. Placa permanentă (obligatorie mai ales la proiecte de infrastructură) rămâne montată definitiv, la loc vizibil, după finalizarea proiectului."
                    },
                    {
                        question: "Cum știu ce culori, sigle și texte trebuie să conțină panoul meu?",
                        answer: "Fiecare program de finanțare are propriul Manual de Identitate Vizuală, cu poziția exactă a siglei Uniunii Europene, a siglei programului și textele obligatorii. Trimite-ne manualul primit de la finanțator sau linkul programului, iar echipa noastră de DTP încadrează grafica exact conform lui."
                    },
                    {
                        question: "Din ce material se face un panou de vizibilitate rezistent la exterior?",
                        answer: "Pentru panourile temporare de șantier folosim de regulă PVC Forex sau polipropilenă celulară, iar pentru plăcile permanente recomandăm Alucobond — rezistă ani de zile la soare și intemperii fără să se decoloreze sau deformeze."
                    }
                ]}
            />

            <section className="bg-white py-16 mt-16 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Panouri de Vizibilitate pentru Proiecte cu Fonduri Europene
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            O altă categorie de <strong className="text-orange-600">semnalistică outdoor obligatorie</strong> — panouri temporare de șantier, plăci permanente și autocolante, executate strict conform Manualului de Identitate Vizuală al programului tău de finanțare.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">Ce producem pentru beneficiari</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <div>
                                        <strong className="block text-slate-900">Panouri temporare de șantier</strong>
                                        <span className="text-slate-600 text-sm">Montate pe durata implementării proiectului, la locația lucrărilor — vizibile de la stradă, conform dimensiunilor cerute de finanțator.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <div>
                                        <strong className="block text-slate-900">Plăci permanente</strong>
                                        <span className="text-slate-600 text-sm">Pentru proiecte de infrastructură sau investiții semnificative, montate definitiv după finalizare — de regulă pe Alucobond, pentru rezistență pe termen lung.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <div>
                                        <strong className="block text-slate-900">Autocolante și etichete de proiect</strong>
                                        <span className="text-slate-600 text-sm">Pentru echipamente sau bunuri achiziționate prin proiect, care trebuie marcate conform cerințelor de vizibilitate ale finanțatorului.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">Ce ne trimiți pentru conformitate</h3>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                Trimite-ne Manualul de Identitate Vizuală primit de la finanțator (sau codul/numele programului), titlul proiectului, codul SMIS și valoarea finanțării — le încadrăm exact în șablonul obligatoriu.
                            </p>
                            <p className="text-slate-600 leading-relaxed font-bold">
                                Verificăm poziționarea siglelor UE și a programului înainte de tipar, ca panoul să treacă fără observații la controalele de proiect.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 border-t border-slate-200 pt-16">
                        <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente</h3>
                        <div className="space-y-6 max-w-3xl mx-auto">
                            {[
                                {
                                    q: "De ce sunt obligatorii aceste panouri pentru un proiect cu finanțare europeană?",
                                    a: "Fiecare contract de finanțare din fonduri europene (Regio, PNRR, POCU etc.) impune beneficiarului obligații de informare și publicitate, detaliate în Manualul de Identitate Vizuală al programului respectiv. Lipsa panoului sau neconformitatea lui poate genera observații la verificările de proiect."
                                },
                                {
                                    q: "Care e diferența dintre panoul temporar de șantier și placa permanentă?",
                                    a: "Panoul temporar se montează la începutul implementării, de regulă pe durata lucrărilor de construcție. Placa permanentă (obligatorie mai ales la proiecte de infrastructură) rămâne montată definitiv, la loc vizibil, după finalizarea proiectului."
                                },
                                {
                                    q: "Cum știu ce culori, sigle și texte trebuie să conțină panoul meu?",
                                    a: "Fiecare program de finanțare are propriul Manual de Identitate Vizuală, cu poziția exactă a siglei Uniunii Europene, a siglei programului și textele obligatorii. Trimite-ne manualul primit de la finanțator sau linkul programului, iar echipa noastră de DTP încadrează grafica exact conform lui."
                                },
                                {
                                    q: "Din ce material se face un panou de vizibilitate rezistent la exterior?",
                                    a: "Pentru panourile temporare de șantier folosim de regulă PVC Forex sau polipropilenă celulară, iar pentru plăcile permanente recomandăm Alucobond — rezistă ani de zile la soare și intemperii fără să se decoloreze sau deformeze."
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
    );
}
