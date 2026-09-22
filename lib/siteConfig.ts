import { Facebook, Instagram, Mail, Music } from "lucide-react";

export const siteConfig = {
    name: "HomePrint",
    domain: "HomePrint.ro",
    url: "https://www.homeprint.ro",
    description: "HomePrint.ro - Decor printat pentru casă și birou: fototapet personalizat, tablouri canvas, postere de artă și autocolante de perete, produse în atelier propriu și livrate în 2-4 zile lucrătoare. Tot catalogul de print publicitar rămâne disponibil: bannere, roll-up, panouri rigide, textile, kituri fonduri UE.",
    email: "contact@HomePrint.ro",
    phone: "0750 473 111",
    address: "Jud. Buzău, Sat Topliceni, Com. Topliceni, G Topliceni, nr. 214",
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
                { href: "/window-graphics", label: "Window graphics" },
                { href: "/carti-vizita", label: "Cărți de vizită" },
                { href: "/pliante", label: "Pliante" },
                { href: "/flayere", label: "Flyere" },
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
            href: "/configuratoare",
            label: "Preț instant",
            highlight: true,
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
        // TODO confirm before launch: same entity as AdBanner/EuPrint ("CULOAREA DIN
        // VIATA SA SRL", CUI 44820819) or a new/different SRL for HomePrint? Kept the
        // shared entity as the default since most of the network invoices under it.
        legalName: "CULOAREA DIN VIATA SA SRL",
        tradeName: "HomePrint",
        cui: "44820819",
        regCom: "J2021001108100",
        vatId: "44820819",
        address: {
            fullAddress: "Jud. Buzău, Sat Topliceni, Com. Topliceni, nr. 214",
            city: "Topliceni",
            county: "Buzău",
            postalCode: "127630",
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
