import React, { Suspense } from "react";
import Link from "next/link";
import TextileConfigurator from "@/components/TextileConfigurator";
import { getProductBySlug } from "@/lib/products";
import ProductJsonLd from "@/components/ProductJsonLd";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import FaqAccordion from "@/components/FaqAccordion";
import type { QA } from "@/types";

export const metadata = {
    title: "Tricouri Personalizate pentru Familie și Cadouri - Print DTF | HomePrint.ro",
    description: "Tricouri personalizate pentru revederi de familie, zile de naștere sau prima ta mică afacere de acasă. Bumbac 100%, print DTF rezistent la spălări repetate, mărimi de la copii (110 cm) la adulți (XXXL), fără comandă minimă. Încarci o poză sau un desen și comanzi online în câteva minute.",
    keywords: [
        "tricouri personalizate",
        "tricouri personalizate familie",
        "tricouri aniversare copii",
        "cadou personalizat tricou",
        "tricouri copii personalizate",
        "print dtf tricouri",
        "tricouri mica afacere de acasă",
        "homeprint"
    ],
    alternates: { canonical: "/tricouri" },
    openGraph: {
        title: "Tricouri Personalizate pentru Familie și Cadouri | Print DTF | HomePrint.ro",
        description: "De la 8 tricouri pentru o revedere de familie la primul stoc al unei mici afaceri de acasă — bumbac 100%, print DTF rezistent, mărimi de la copii la adulți, fără comandă minimă.",
        images: [{
            url: "/products/banner/banner-1.webp",
            width: 1200,
            height: 630,
            alt: "Tricouri Personalizate pentru familie"
        }]
    }
};

const tricouriFaqs: QA[] = [
    { question: "Care este comanda minimă?", answer: "Nu există comandă minimă. Realizăm comenzi începând de la 1 bucată — perfect dacă vrei doar un singur tricou-cadou, nu un tiraj mare." },
    { question: "Ce tehnologie de print folosiți și de ce se potrivește pentru comenzi mici?", answer: "Folosim tehnologie DTF (Direct to Film). Spre deosebire de serigrafie, care are cost de pregătire a șabloanelor indiferent dacă tirajul e de 8 sau 80 de bucăți, la DTF plătești strict cât printezi — de aceea rămâne cea mai rezonabilă variantă pentru un tricou unic sau o serie mică de familie." },
    { question: "Pot printa o poză de familie sau desenul făcut de copil?", answer: "Da. DTF reproduce fidel degradeuri, culori multiple și detalii fine, exact ce ai nevoie pentru o fotografie de familie sau un desen de copil. Pentru cel mai bun rezultat, trimite fișierul cu fundal transparent, ca imaginea printată să urmeze conturul desenului, nu un dreptunghi în jurul lui." },
    { question: "Rezistă printul la spălări repetate, inclusiv la tricourile copiilor?", answer: "Da. DTF rezistă foarte bine la spălări dese, chiar la temperaturi ceva mai ridicate. Recomandăm totuși spălarea pe dos, ca să păstrezi culorile vii cât mai mult timp." },
    { question: "Ce mărimi aveți pentru copii?", answer: "Modelele Basic și Polo Pique pentru copii pornesc de la 110 cm (mărime etichetată pentru aproximativ 4 ani) și urcă până la 158 cm, în pas de 12 cm — util dacă vrei tricouri asortate pentru toți verii și verișoarele de la o revedere de familie." },
    { question: "Ce mărimi aveți pentru adulți?", answer: "Tricoul Basic și V-Neck merg de la XS la XXL, iar modelele Polo Pique bărbați și V-Neck bărbați ajung până la XXXL — suficient pentru toate generațiile unei familii la aceeași comandă." },
    { question: "Pot combina mărimi diferite (copii și adulți) în aceeași comandă?", answer: "Da. Configurezi și adaugi în coș fiecare mărime și culoare de care ai nevoie, apoi finalizezi totul într-o singură comandă și o singură livrare." },
    { question: "Din ce material sunt făcute tricourile?", answer: "Tricoul Basic și V-Neck sunt din Single Jersey, bumbac pieptănat de 160-190 g/mp, cu finisaj din silicon (textură mătăsoasă, fără scame) și certificare OEKO-TEX. Modelele Polo Pique sunt dintr-un amestec de 65% bumbac și 35% poliester, cu guler și manșete raiate." },
    { question: "Cât costă un tricou personalizat?", answer: "Tricoul Basic sau V-Neck pornește de la 60 RON/bucată cu print pe o singură față (75 RON pentru modelele Polo Pique). Printul pe față și spate adaugă 20-25 RON/bucată. La 10+ bucăți primești 10% reducere, la 30+ bucăți 15%, iar la 50+ bucăți 20% — util atât pentru o serie de familie mai mare, cât și pentru primul stoc al unei mici afaceri." },
    { question: "Am nevoie de fișier grafic profesionist ca să comand?", answer: "Nu neapărat. Poți încărca direct o fotografie sau un desen din configurator. Pentru cel mai clar rezultat la print, un fișier vectorial (.ai, .eps, .svg) sau o imagine la minim 300 DPI la dimensiunea reală ajută cel mai mult, dar nu este obligatoriu pentru comenzi mici, personale." },
    { question: "Cât durează livrarea?", answer: "Estimarea standard este de 2-3 până la 2-4 zile lucrătoare, în funcție de localitate. Pentru o petrecere sau o revedere cu dată fixă, recomandăm plasarea comenzii cu câteva zile bune înainte, ca să ai marjă de siguranță." },
    { question: "Tricourile personalizate se pot folosi și pentru o mică afacere de acasă?", answer: "Da — mulți dintre clienții noștri comandă întâi 15-20 de bucăți din mai multe modele, ca să testeze ce se vinde la un târg local sau ca obiect oferit clienților fideli. Dacă un model devine bestseller și ajungi la comenzi de 200+ bucăți identice, merită să iei în calcul și serigrafia clasică — explicăm exact acest prag în ghidul nostru dedicat." },
    { question: "Ce diferență e între Tricoul Basic și Tricoul Polo Pique?", answer: "Basic e un tricou clasic, din bumbac 100% Single Jersey, croială tubulară — alegerea potrivită pentru poze de familie sau desene de copii pe toată suprafața. Polo Pique are guler și manșete raiate, cu nasturi, dintr-un amestec bumbac-poliester — o variantă puțin mai elegantă, potrivită și pentru tricourile oferite clienților unei mici afaceri." },
    { question: "Pot printa doar pe spate sau pe ambele fețe?", answer: "Da, alegi direct din configurator: doar pe față, doar pe spate, sau pe ambele fețe (cu un cost suplimentar de 20-25 RON/bucată)." },
];

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function TricouriPage({ searchParams }: Props) {
    const sParams = await searchParams;
    const product = getProductBySlug("configurator-tricouri");
    const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.HomePrint.ro"}/tricouri`;

    const image = typeof sParams.image === 'string' ? sParams.image : undefined;

    return (
        <main className="min-h-screen bg-slate-50 pt-20">
            {product && <ProductJsonLd name={product.title} description={product.description} image={product.images?.[0]} price={60} url={url} />}

            <BreadcrumbSchema
                items={[
                    { name: "Acasă", item: "/" },
                    { name: "Tricouri Personalizate", item: "/tricouri" }
                ]}
            />
            <FAQSchema faqs={tricouriFaqs.map(({ question, answer }) => ({ question, answer }))} />

            <Suspense fallback={<div className="h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div></div>}>
                <h1 className="sr-only">Tricouri Personalizate</h1>
                <TextileConfigurator type="tricouri" productSlug="configurator-tricouri" productImage={image} />
            </Suspense>

            <section className="bg-white py-16 mt-16 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Tricouri Personalizate pentru Familie, Petreceri și Cadouri
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            La <strong className="text-amber-600">HomePrint.ro</strong>, realizăm tricouri folosind print DTF de înaltă calitate, care rezistă excelent la spălări repetate, pe materiale premium din bumbac 100%. Nu contează dacă vrei 8 tricouri pentru o revedere de familie, un tricou-cadou cu poza cuiva drag sau primul stoc de test al unei mici afaceri pornite de acasă — configurezi totul online, fără comandă minimă.
                        </p>
                    </div>
                </div>
            </section>

            {/* OCCASION-BASED IDEAS */}
            <section className="bg-slate-50 py-16 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 text-center">Pentru ce ocazii comandă familiile tricouri personalizate</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h4 className="font-bold text-lg text-slate-900 mb-2">Revederi de familie și zile de naștere</h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                Tricouri asortate „familia [Nume]” la o revedere de sfârșit de an, sau tricouri „echipa lui X ani” la ziua unui copil — numărul mic de bucăți (de la 1 la 30) face din print DTF singura variantă rezonabilă la preț, fără cost de pregătire.
                            </p>
                            <Link href="/blog/dtg-vs-dtf-vs-serigrafie-ghid-textile" className="text-amber-600 font-semibold text-sm hover:underline">Vezi ghidul complet DTG vs. DTF vs. serigrafie →</Link>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h4 className="font-bold text-lg text-slate-900 mb-2">Cadou personalizat, cu poză sau desen</h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                O fotografie de familie, desenul unui copil sau un mesaj scris de mână — DTF reproduce fidel degradeurile și multe culori, fără cost suplimentar, pe un singur tricou sau pe o serie mică pentru toată familia.
                            </p>
                            <Link href="/blog/ghid-proiecte-casa-print-petreceri-curte-proprie" className="text-amber-600 font-semibold text-sm hover:underline">Vezi ghidul proiectelor de casă cu print →</Link>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h4 className="font-bold text-lg text-slate-900 mb-2">Prima ta mică afacere de acasă</h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                Vinzi bijuterii, prăjituri sau produse handmade la târguri locale? Un tricou personalizat oferit clientului fidel devine, fără să realizeze, un canal de recomandare printre prieteni — la un cost mult mai mic decât reclama plătită.
                            </p>
                            <Link href="/blog/strategii-de-marketing-2026-print-outdoor-si-gadgeturi" className="text-amber-600 font-semibold text-sm hover:underline">Vezi strategia pas cu pas pentru afaceri mici →</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRINT TECHNIQUE COMPARISON */}
            <section className="bg-white py-16 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 text-center">DTG, DTF sau serigrafie? De ce alegem DTF pentru comenzi de familie</h3>
                    <p className="text-slate-600 max-w-3xl mx-auto text-center mb-10">
                        Diferența dintre cele trei tehnologii nu ține de gust, ci de câte bucăți comanzi, câte culori are designul și cine poartă tricoul. La HomePrint.ro printăm exclusiv cu <strong>DTF (Direct to Film)</strong>, tehnologia potrivită pentru exact genul de comenzi pe care le fac familiile: de la 1 la câteva zeci de bucăți, cu poze, desene sau degradeuri de culoare.
                    </p>
                    <div className="overflow-x-auto shadow-sm rounded-2xl border border-slate-100">
                        <table className="min-w-full bg-white text-sm">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left font-bold">Criteriu</th>
                                    <th className="px-6 py-4 text-center font-bold">DTF (folosit la HomePrint)</th>
                                    <th className="px-6 py-4 text-center font-bold">DTG</th>
                                    <th className="px-6 py-4 text-center font-bold">Serigrafie</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="px-6 py-4 font-bold bg-slate-50">Tricou unic sau serie mică de familie (1-30 buc.)</td>
                                    <td className="px-6 py-4 text-center text-amber-600 font-bold">Recomandat</td>
                                    <td className="px-6 py-4 text-center font-medium">Recomandat</td>
                                    <td className="px-6 py-4 text-center text-red-500 font-bold">Prea scump</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-bold bg-slate-50">Tricouri închise la culoare (negru, bleumarin)</td>
                                    <td className="px-6 py-4 text-center text-amber-600 font-bold">Excelent, alb opac de bază</td>
                                    <td className="px-6 py-4 text-center font-medium">Necesită pre-tratament</td>
                                    <td className="px-6 py-4 text-center font-medium">Bun</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-bold bg-slate-50">Spălare frecventă (copii, uz zilnic)</td>
                                    <td className="px-6 py-4 text-center text-amber-600 font-bold">Excelentă</td>
                                    <td className="px-6 py-4 text-center font-medium">Medie</td>
                                    <td className="px-6 py-4 text-center text-amber-600 font-bold">Excelentă</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-bold bg-slate-50">Stoc de magazin, 200+ buc. identice</td>
                                    <td className="px-6 py-4 text-center font-medium">Mediu</td>
                                    <td className="px-6 py-4 text-center font-medium">Scump</td>
                                    <td className="px-6 py-4 text-center text-amber-600 font-bold">Cel mai ieftin</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-slate-500 text-sm text-center mt-6">
                        Ai un tiraj de teste pentru magazinul tău mic, cu mai multe modele diferite? Citim exact acest scenariu, pas cu pas, în <Link href="/blog/dtg-vs-dtf-vs-serigrafie-ghid-textile" className="text-amber-600 font-semibold hover:underline">ghidul nostru DTG vs. DTF vs. serigrafie</Link>.
                    </p>
                </div>
            </section>

            {/* FABRIC / SIZING */}
            <section className="bg-slate-50 py-16 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Materiale disponibile</h3>
                        <ul className="space-y-4 text-sm text-slate-600">
                            <li>
                                <strong className="block text-slate-900">Tricou Basic / V-Neck</strong>
                                Single Jersey, bumbac pieptănat 100% (160-190 g/mp), finisaj cu silicon, certificare OEKO-TEX. Croială tubulară (Basic) sau slim fit cu decolteu în V (V-Neck).
                            </li>
                            <li>
                                <strong className="block text-slate-900">Tricou Polo Pique</strong>
                                Pique, 65% bumbac / 35% poliester, guler și manșete din material raiat, fentă cu nasturi — o variantă puțin mai elegantă, potrivită și ca uniformă discretă pentru o afacere mică.
                            </li>
                            <li>
                                <strong className="block text-slate-900">Modele pentru copii</strong>
                                Basic și Polo Pique Copii, din aceleași materiale ca variantele de adulți, la mărimi reduse — ideale pentru tricouri asortate cu ai lor părinți la aceeași revedere de familie.
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Ghid de mărimi, de la copii la adulți</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <tbody className="divide-y divide-slate-100">
                                    <tr>
                                        <td className="py-3 font-bold text-slate-900 pr-4">Copii (Basic / Polo Pique)</td>
                                        <td className="py-3 text-slate-600">110 cm (~4 ani) – 122 – 134 – 146 – 158 cm</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 font-bold text-slate-900 pr-4">Tricou Basic / V-Neck</td>
                                        <td className="py-3 text-slate-600">XS – S – M – L – XL – XXL</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 font-bold text-slate-900 pr-4">Polo Pique / V-Neck Bărbați</td>
                                        <td className="py-3 text-slate-600">S – M – L – XL – XXL – XXXL</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 font-bold text-slate-900 pr-4">Polo Pique Femei</td>
                                        <td className="py-3 text-slate-600">XS – S – M – L – XL – XXL</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-slate-500 text-xs mt-4">Poți combina mărimi diferite (copii și adulți deopotrivă) în aceeași comandă, direct din configurator.</p>
                    </div>
                </div>
            </section>

            {/* UPLOAD / HOW IT WORKS */}
            <section className="bg-white py-16 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 text-center">Cum încarci poza sau desenul în configurator</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold mb-3">1</div>
                            <p className="text-sm text-slate-600">Alege modelul (Basic, V-Neck, Polo Pique) și mărimea, de la copii la XXXL.</p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold mb-3">2</div>
                            <p className="text-sm text-slate-600">Alege culoarea tricoului din paleta disponibilă pentru fiecare model.</p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold mb-3">3</div>
                            <p className="text-sm text-slate-600">Încarci poza sau desenul din calculator sau telefon și alegi poziția: față, spate sau ambele.</p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold mb-3">4</div>
                            <p className="text-sm text-slate-600">Alegi cantitatea, vezi prețul instant și adaugi în coș.</p>
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm text-center mt-8">
                        Pentru cel mai bun rezultat, un fișier vectorial (.ai, .eps, .svg) sau o imagine la minim 300 DPI la dimensiunea reală dă cele mai clare detalii — dar nu este obligatoriu pentru o poză de familie sau un desen de copil, pe care le poți încărca direct așa cum sunt.
                    </p>
                </div>
            </section>

            {/* CARE + TURNAROUND + BUDGET */}
            <section className="bg-slate-50 py-16 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-lg text-slate-900 mb-2">Îngrijire și spălare</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Spală tricourile pe dos, pentru a păstra printul DTF vibrant cât mai mult timp. Rezistă foarte bine la spălări repetate, chiar la temperaturi ceva mai ridicate — util pentru tricourile de copii, purtate și spălate des.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-lg text-slate-900 mb-2">Termen de livrare</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Livrarea estimată este de 2-3 până la 2-4 zile lucrătoare, în funcție de localitate. Pentru o petrecere sau o revedere cu dată fixă, plasează comanda cu câteva zile bune înainte, ca să ai marjă de siguranță.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-lg text-slate-900 mb-2">Buget: de la un tricou-cadou la primul stoc</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            De la 60 RON/bucată (Basic, print pe o față), fără comandă minimă. La 10+ bucăți primești 10% reducere, la 30+ 15%, la 50+ 20% — util atât pentru 8 tricouri de familie, cât și pentru un prim lot de test al unei mici afaceri.
                        </p>
                    </div>
                </div>
            </section>

            {/* FURTHER READING */}
            <section className="bg-white py-16 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 text-center">Citește și</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/blog/dtg-vs-dtf-vs-serigrafie-ghid-textile" className="block bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all">
                            <h4 className="font-bold text-slate-900 mb-2">8 tricouri pentru revederea de familie sau 200 pentru standul tău? Alegi altă tehnologie</h4>
                            <p className="text-slate-500 text-sm">Ghid practic DTG, DTF și serigrafie, pornind de la comenzi reale de acasă.</p>
                        </Link>
                        <Link href="/blog/de-la-hobby-la-mica-afacere-de-acasa-materiale-printate" className="block bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all">
                            <h4 className="font-bold text-slate-900 mb-2">De la hobby la mică afacere de acasă</h4>
                            <p className="text-slate-500 text-sm">Ordinea corectă a primelor materiale printate, inclusiv tricourile oferite clienților fideli.</p>
                        </Link>
                        <Link href="/blog/ghid-proiecte-casa-print-petreceri-curte-proprie" className="block bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all">
                            <h4 className="font-bold text-slate-900 mb-2">Ghidul proiectelor de casă cu print</h4>
                            <p className="text-slate-500 text-sm">De la semne pentru petreceri la panouri pentru curte proprie — tot ce printează o familie într-un an obișnuit.</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-slate-50 py-16 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h3 className="text-3xl font-black text-slate-900 mb-10 text-center">Întrebări Frecvente</h3>
                    <FaqAccordion qa={tricouriFaqs} />
                </div>
            </section>
        </main>
    );
}
