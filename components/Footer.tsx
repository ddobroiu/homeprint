"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { brandDesign } from "@/lib/brandDesign";
import { siteConfig } from "@/lib/siteConfig";
import { COMPANY, CONTACT_EMAIL } from "@/lib/company";
import FooterLegal from "@/components/legal/FooterLegal";
import LegalFooterColumn from "@/components/legal/LegalFooterColumn";
import { MapPin, Mail, Clock } from "lucide-react";
import { usePathname } from "next/navigation";

const PRODUCT_LINKS = [
    { href: "/tapet", label: "Fototapet personalizat" },
    { href: "/canvas", label: "Tablouri canvas" },
    { href: "/shop/canvas", label: "Colecția de canvas" },
    { href: "/afise", label: "Postere și afișe" },
    { href: "/autocolante", label: "Autocolante decorative" },
    { href: "/materiale/plexiglass", label: "Plexiglas și panouri rigide" },
    { href: "/banner", label: "Bannere și mesh" },
    { href: "/rollup", label: "Roll-up și window graphics" },
    { href: "/pliante", label: "Pliante, flyere, cărți de vizită" },
    { href: "/tricouri", label: "Tricouri, hanorace, șepci" },
    { href: "/fonduri-pnrr", label: "Kituri fonduri UE" },
];

const GUIDE_LINKS = [
    { href: "/material", label: "Materiale pentru decor și print" },
    { href: "/stil", label: "Stiluri de design" },
    { href: "/servicii", label: "Finisaje și montaj" },
    { href: "/blog", label: "Ghiduri de măsurare și montaj" },
    { href: "/judet", label: "Livrare pe județe" },
    { href: "/dimensiuni", label: "Prețuri pe dimensiuni" },
    { href: "/preturi", label: "Prețuri pe cantități" },
    { href: "/comparatii", label: "Ce material aleg" },
    { href: "/sectoare-bucuresti", label: "Sectoare București" },
];

const COMPANY_LINKS = [
    { href: "/print-romania", label: "Print cu livrare în România" },
    { href: "/pregatire-fisiere", label: "Pregătirea fișierelor" },
    { href: "/ghid-print", label: "Ghid de alegere și prețuri" },
    { href: "/despre-noi", label: "Despre HomePrint" },
    { href: "/industrii", label: "Decor pentru birouri și spații comerciale" },
    { href: "/seap", label: "Achiziții SEAP / SICAP" },
    { href: "/contact", label: "Ofertă pentru designeri și proiecte" },
    { href: "/livrare", label: "Livrare și termene" },
    { href: "/urmareste-comanda", label: "Status comandă" },
    { href: "/noutati", label: "Noutăți" },
];


export default function Footer() {
    const pathname = usePathname();

    if (pathname?.startsWith("/admin") || pathname === "/editor") return null;


    return (
        <footer className="brand-footer bg-[#F3ECE1] text-stone-600 relative isolate border-t border-[#E4D9C8] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#1F4D3A]/50 to-transparent" />

            <div className="container mx-auto px-6 lg:px-12 !max-w-7xl py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 mb-8">
                    {/* Brand */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <Link href="/" className="inline-block"><Image src="/logo.svg" alt={brandDesign.name} width={340} height={90} className="brand-footer-logo-image" /></Link>
                        <p className="brand-footer-intro">{brandDesign.intro}</p>
                        <div className="space-y-3 text-sm">
                            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 hover:text-stone-900 transition-colors">
                                <Mail size={16} className="text-[#1F4D3A] shrink-0" />
                                <span>{CONTACT_EMAIL}</span>
                            </a>
                            <div className="flex items-center gap-3">
                                <Clock size={16} className="text-[#1F4D3A] shrink-0" />
                                <span>Luni - Vineri 09:00 - 18:00</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-[#1F4D3A] shrink-0 mt-0.5" />
                                <span>{COMPANY.address.full}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                            {siteConfig.socialLinks.filter((l) => l.title !== "Twitter" && l.title !== "Email").map((link) => (
                                <Link
                                    key={link.title}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={link.title}
                                    className="w-8 h-8 rounded-full bg-white border border-[#E4D9C8] flex items-center justify-center text-stone-500 hover:text-white hover:bg-[#1F4D3A] hover:border-[#1F4D3A] transition-colors"
                                >
                                    <link.icon size={14} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-12"><Link href="/#configuratoare" className="design-text-link">Toate configuratoarele</Link></div>
                    <FooterColumn title="Produse" links={PRODUCT_LINKS} />
                    <FooterColumn title="Ghiduri" links={GUIDE_LINKS} />
                    <FooterColumn title="Firme & instituții" links={COMPANY_LINKS} />
                    <LegalFooterColumn className="lg:col-span-2" titleClassName="text-stone-900 text-xs font-bold uppercase tracking-widest mb-4" listClassName="space-y-1.5 text-[13px]" linkClassName="hover:text-[#1F4D3A] transition-colors" extraLinks={[{ href: "/harta-site", label: "Harta site" }]} />
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-[#E4D9C8] text-xs text-stone-500">
                    <FooterLegal showLinks={false} linkClassName="hover:text-[#1F4D3A] transition-colors" />
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
    return (
        <div className="lg:col-span-2">
            <h4 className="text-stone-900 text-xs font-bold uppercase tracking-widest mb-4">{title}</h4>
            <ul className="space-y-1.5 text-[13px]">
                {[...links.filter((l) => l.href === "/judet" || l.href === "/dimensiuni" || l.href === "/preturi"), ...links.filter((l) => l.href !== "/judet" && l.href !== "/dimensiuni" && l.href !== "/preturi")].slice(0, 6).map((l) => (
                    <li key={l.href}>
                        <Link href={l.href} className="hover:text-[#1F4D3A] transition-colors">
                            {l.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
