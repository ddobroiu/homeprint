import { Facebook, Instagram, Mail, Music } from "lucide-react";

export const siteConfig = {
    name: "HomePrint",
    domain: "HomePrint.ro",
    url: "https://www.HomePrint.ro",
    description: "HomePrint.ro - Tipografie Digitală Online.",
    email: "contact@HomePrint.ro",
    phone: "0750 473 111",
    address: "Jud. Buzău, Sat Topliceni, Com. Topliceni, G Topliceni, nr. 214",
    // --- MENIUL PRINCIPAL (HEADER) ---
    headerNav: [
        {
            href: "/publicitar",
            label: "Publicitar",
            // icon: Tag,
            children: [
                { href: "/configurator/banner", label: "Banner" },
                { href: "/configurator/banner-verso", label: "Banner Față Verso" },
                { href: "/configurator/mesh", label: "Mesh publicitar" },
                { href: "/configurator/autocolante", label: "Autocolante" },
                { href: "/configurator/carti-vizita", label: "Cărți de vizită" },
                { href: "/configurator/afise", label: "Afișe" },
                { href: "/configurator/flayere", label: "Flyere" },
                { href: "/configurator/pliante", label: "Pliante" },
                { href: "/configurator/rollup", label: "Rollup" },
                { href: "/configurator/window-graphics", label: "Window Graphics" },
            ],
        },
        {
            href: "/decor",
            label: "Decor",
            // icon: Image,
            children: [
                { href: "/configurator/canvas", label: "Canvas Personalizat" },
                { href: "/configurator/tapet", label: "Fototapet Personalizat" },
            ],
        },
        {
            href: "/materiale",
            label: "Materiale",
            // icon: LayoutGrid,
            children: [
                { href: "/materiale/carton", label: "Carton" },
                { href: "/materiale/plexiglass", label: "Plexiglas" },
                { href: "/materiale/alucobond", label: "Alucobond" },
                { href: "/materiale/polipropilena", label: "Polipropilenă" },
                { href: "/materiale/pvc-forex", label: "PVC Forex" },
            ],
        },
        {
            href: "#",
            label: "Textile",
            children: [
                { href: "/tricouri", label: "Tricouri" },
                { href: "/hanorace", label: "Hanorace" },
                { href: "/sepci", label: "Șepci" },
            ],
        },

        {
            href: "#",
            label: "Fonduri UE",
            // icon: Star,
            children: [
                { href: "/fonduri-pnrr", label: "Fonduri PNRR" },
                { href: "/fonduri-regio", label: "Fonduri REGIO" },
                { href: "/fonduri-nationale", label: "Fonduri Naționale" },
            ],
        },
        {
            href: "/shop",
            label: "Shop",
            children: [
                { href: "/configuratoare", label: "Configuratoare" },
                { href: "/shop/bannere", label: "Bannere" },
                { href: "/shop/canvas", label: "Tablouri Canvas" },
                { href: "/shop/fonduri-europene", label: "Kituri Fonduri UE" },
            ],
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
