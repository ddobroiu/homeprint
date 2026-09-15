import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/**
 * Trei idei de amenajare, fiecare cu link intern către configuratorul potrivit.
 * Componentă server, fără carusel și fără linkuri externe.
 */
const IDEAS = [
    {
        title: "Perete de accent cu fototapet",
        room: "Living",
        desc: "Un singur perete printat cu o imagine mare (pădure, hartă veche, textură de beton) schimbă tot livingul. Tapetul mat nu reflectă lumina și ascunde micile denivelări ale peretelui.",
        href: "/tapet",
        cta: "Configurează fototapetul",
        image: "/products/tapet/tapet-2.jpg",
        alt: "Perete de accent cu fototapet personalizat într-un living",
    },
    {
        title: "Galerie de canvas pe hol",
        room: "Hol și scară",
        desc: "Trei-cinci tablouri canvas de 30x40 sau 40x60 cm, cu aceeași margine și aceeași temă (poze de familie, fotografii alb-negru, ilustrații), aliniate la 150 cm de podea.",
        href: "/canvas",
        cta: "Alege dimensiunile canvasului",
        image: "/products/canvas/canvas-2.jpg",
        alt: "Galerie de tablouri canvas aliniate pe un hol",
    },
    {
        title: "Birou cu grafică de perete",
        room: "Birou și recepție",
        desc: "Logo decupat din vinil pe peretele recepției, citate sau valori ale firmei în sala de ședințe, postere înrămate în open space. Se aplică fără găuri și se scot fără urme.",
        href: "/autocolante",
        cta: "Comandă autocolante decorative",
        image: "/products/autocolante/autocolante-2.jpg",
        alt: "Autocolante decorative cu logo aplicate pe peretele unui birou",
    },
];

export default function PromoSection() {
    return (
        <section className="bg-[#F3ECE1] border-y border-[#E4D9C8] py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="max-w-2xl mb-10">
                    <p className="text-[#1F4D3A] font-bold uppercase tracking-[0.18em] text-xs md:text-sm mb-3">Idei de amenajare</p>
                    <h2 className="text-3xl md:text-4xl text-stone-900 tracking-tight">Trei proiecte pe care le putem printa săptămâna asta</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {IDEAS.map((idea) => (
                        <article key={idea.href} className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#E4D9C8] hover:border-[#1F4D3A]/40 hover:shadow-[0_20px_40px_-24px_rgba(31,77,58,0.35)] transition-all">
                            <Link href={idea.href} className="relative aspect-[4/3] block overflow-hidden bg-stone-100">
                                <Image
                                    src={idea.image}
                                    alt={idea.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    loading="lazy"
                                />
                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[11px] font-bold uppercase tracking-widest text-[#1F4D3A] px-3 py-1 rounded-full">{idea.room}</span>
                            </Link>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl text-stone-900 mb-2">{idea.title}</h3>
                                <p className="text-stone-600 text-sm leading-relaxed flex-1">{idea.desc}</p>
                                <Link href={idea.href} className="inline-flex items-center gap-2 text-[#1F4D3A] font-bold text-sm mt-5 hover:gap-3 transition-all">
                                    {idea.cta} <ArrowRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
