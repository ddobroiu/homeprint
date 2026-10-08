import { Facebook, Instagram, Mail, Music } from "lucide-react";
import { COMPANY } from "@/lib/company";

export const siteConfig = {
    name: "HomePrint",
    domain: "HomePrint.ro",
    url: "https://www.homeprint.ro",
    description: "HomePrint.ro - Decor printat pentru casă și birou: fototapet personalizat, tablouri canvas, postere de artă și autocolante de perete, produse în atelier propriu și livrate în 2-4 zile lucrătoare. Tot catalogul de print publicitar rămâne disponibil: bannere, roll-up, panouri rigide, textile, kituri fonduri UE.",
    email: "contact@HomePrint.ro",
    phone: "0750 473 111",
    address: COMPANY.address.full,
    // --- MENIUL PRINCIPAL (HEADER) ---
    // Toate familiile de produse rămân accesibile; gruparea pune decorul primul,
    // pentru că asta caută publicul HomePrint (case, designeri, birouri).
    headerNav: [
        {
            href: "/tapet",
            label: "Decor",
            children: [
                { href: "/tapet", label: "Fototapet personalizat" },
                { href: "/canvas", label: "Tablouri canvas" },
                { href: "/shop/canvas", label: "Colecția de canvas gata de agățat" },
                { href: "/configurator/personaj-propriu", label: "Personajul tău decupat pe contur" },
                { href: "/configurator/decor-foto-copil", label: "Decor cu poza copilului" },
                { href: "/shop#modele-pvc-petreceri", label: "Decoruri PVC pentru petreceri" },
                { href: "/afise", label: "Postere și afișe de artă" },
                { href: "/autocolante", label: "Autocolante decorative de perete" },
                { href: "/materiale/plexiglass", label: "Plexiglas printat pentru decor" },
            ],
        },
        {
            href: "/banner",
            label: "Birou & firmă",
            children: [
                { href: "/banner", label: "Bannere" },
                { href: "/banner-verso", label: "Banner față-verso" },
                { href: "/mesh", label: "Mesh publicitar" },
                { href: "/rollup", label: "Roll-up" },
                { href: "/configurator/x-banner", label: "X-banner cu print" },
                { href: "/configurator/beachflag", label: "Steaguri beachflag" },
                { href: "/configurator/panou-stradal", label: "Panou stradal tip A" },
                { href: "/shop#modele-rollup", label: "Roll-up gata făcut" },
                { href: "/window-graphics", label: "Window graphics" },
                { href: "/carti-vizita", label: "Cărți de vizită" },
                { href: "/configurator/calendare", label: "Calendare personalizate" },
                { href: "/pliante", label: "Pliante" },
                { href: "/flayere", label: "Flyere" },
                { href: "/shop#modele-afise", label: "Modele de afișe gata făcute" },
                { href: "/shop#modele-autocolante", label: "Modele de autocolante" },
                { href: "/shop#modele-etichete", label: "Etichete pentru produse" },
                { href: "/shop/bannere", label: "Șabloane de banner" },
            ],
        },
        {
            href: "/materiale/pvc-forex",
            label: "Panouri rigide",
            children: [
                { href: "/materiale/pvc-forex", label: "PVC Forex" },
                { href: "/materiale/alucobond", label: "Alucobond" },
                { href: "/materiale/plexiglass", label: "Plexiglas" },
                { href: "/materiale/polipropilena", label: "Polipropilenă" },
                { href: "/materiale/carton", label: "Carton plume" },
                { href: "/shop/semnalistica", label: "Semnalistică și indicatoare" },
            ],
        },
        {
            href: "/tricouri",
            label: "Textile",
            children: [
                { href: "/tricouri", label: "Tricouri" },
                { href: "/hanorace", label: "Hanorace" },
                { href: "/sepci", label: "Șepci" },
            ],
        },
        {
            href: "/fonduri-pnrr",
            label: "Fonduri UE",
            children: [
                { href: "/fonduri-pnrr", label: "Kit PNRR" },
                { href: "/fonduri-regio", label: "Programul Regional" },
                { href: "/fonduri-nationale", label: "Fonduri naționale" },
                { href: "/shop/fonduri-europene", label: "Kituri fonduri europene" },
                { href: "/seap", label: "Achiziții SEAP / SICAP" },
            ],
        },
        {
            href: "/shop",
            label: "Shop",
            highlight: false,
            children: [
                { href: "/shop?category=sisteme-de-afisaj", label: "Sisteme de afișaj" },
                { href: "/shop?category=steaguri-si-drapele", label: "Steaguri și drapele" },
                { href: "/shop?category=materiale-print", label: "Backlit, blockout, mochetă" },
                { href: "/shop?category=rame-si-suporturi", label: "Rame și suporturi" },
                { href: "/shop?category=papetarie-si-birou", label: "Papetărie și birou" },
                { href: "/shop?category=promotionale", label: "Promoționale" },
                { href: "/shop?category=decor-pentru-casa", label: "Decor pentru casă" },
                { href: "/shop?category=panouri-si-semnalizare", label: "Panouri de șantier" },
            ],
        },

    ],
    socialLinks: [
        {
            title: "Facebook",
            href: "https://www.facebook.com/HomePrint.ro/",
            icon: Facebook,
        },
        {
            title: "Instagram",
            href: "https://www.instagram.com/HomePrint.ro",
            icon: Instagram,
        },
        {
            title: "TikTok",
            href: "https://www.tiktok.com/@HomePrint.ro",
            icon: Music,
        },
        {
            title: "Email",
            href: "mailto:contact@HomePrint.ro",
            icon: Mail,
        },
    ],
    business: {
        // Operatorul confirmat de proprietar: aceeași firmă pentru toate site-urile de print (lib/company.ts).
        legalName: COMPANY.legalName,
        tradeName: "HomePrint",
        cui: COMPANY.cui,
        regCom: COMPANY.regCom,
        address: {
            fullAddress: COMPANY.address.full,
            city: "Topliceni",
            county: "Buzău",
            postalCode: COMPANY.address.postalCode,
            country: "România",
        },
        contact: {
            email: "contact@HomePrint.ro",
            phone: "0750 473 111",
            phoneDisplay: "0750 473 111",
            whatsapp: "+40750473111",
        },
    },
    shipping: {
        provider: "DPD",
        standardDelivery: {
            service: "Standard",
            price: 24,
            currency: "RON",
        },
    },
    returnPolicy: {
        returnPeriod: "14 zile",
    },
    ogImage: "/og-image.jpg",
};
