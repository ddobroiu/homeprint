export interface BannerProduct {
    id: string;
    slug: string;
    title: string;
    description: string;
    image: string;
    price: string | number;
    category: string;
    tags: string[];
    metadata?: {
        type: 'banner-predefinit';
        variants: Array<{
            size: string;
            price: number;
            id: string;
        }>;
    };
}

export const bannerProducts: BannerProduct[] = [
    {
        id: "banner-banner-personalizat-acces-parcare-nu-blocati-6107382",
        slug: "banner-personalizat-acces-parcare-nu-blocati-6107382",
        title: "Banner Banner Personalizat Acces Parcare Nu Blocati 6107382",
        description: "Model grafic predefinit pentru Banner Personalizat Acces Parcare Nu Blocati 6107382. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-personalizat-acces-parcare-nu-blocati_6107382.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-service-auto",
        slug: "banner-service-auto",
        title: "Banner Banner Service Auto",
        description: "Model grafic predefinit pentru Banner Service Auto. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-service-auto.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },

    {
        id: "banner-banner-spalatorie-haine",
        slug: "banner-spalatorie-haine",
        title: "Banner Banner Spalatorie Haine",
        description: "Model grafic predefinit pentru Banner Spalatorie Haine. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-spalatorie-haine.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-spalatorie-haine-1",
        slug: "banner-spalatorie-haine-1",
        title: "Banner Banner Spalatorie Haine 1",
        description: "Model grafic predefinit pentru Banner Spalatorie Haine 1. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-spalatorie-haine-1.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-inchiriere-auto",
        slug: "banner-inchiriere-auto",
        title: "Banner Banner închiriere Auto",
        description: "Model grafic predefinit pentru Banner închiriere Auto. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-inchiriere-auto.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },

    {
        id: "banner-detaling-auto",
        slug: "detaling-auto",
        title: "Banner Detaling Auto",
        description: "Model grafic predefinit pentru Detaling Auto. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-spalatorie-auto.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-piese-auto",
        slug: "piese-auto",
        title: "Banner Piese Auto",
        description: "Model grafic predefinit pentru Piese Auto. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-rent-a-car",
        slug: "rent-a-car",
        title: "Banner Rent A Car",
        description: "Model grafic predefinit pentru Rent A Car. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/rent-a-car.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-service-auto",
        slug: "service-auto",
        title: "Banner Service Auto",
        description: "Model grafic predefinit pentru Service Auto. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/service-auto.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-spalatorie-haine",
        slug: "spalatorie-haine",
        title: "Banner Spalatorie Haine",
        description: "Model grafic predefinit pentru Spalatorie Haine. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/spalatorie-haine.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-vulcanizare",
        slug: "vulcanizare",
        title: "Banner Vulcanizare",
        description: "Model grafic predefinit pentru Vulcanizare. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/vulcanizare.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-vulcanizare-banner",
        slug: "vulcanizare-banner",
        title: "Banner Vulcanizare Banner",
        description: "Model grafic predefinit pentru Vulcanizare Banner. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/vulcanizare-banner.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },

    {
        id: "banner-banner-magazin-alimentar",
        slug: "banner-magazin-alimentar",
        title: "Banner Banner Magazin Alimentar",
        description: "Model grafic predefinit pentru Banner Magazin Alimentar. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-magazin-alimentar.jpg",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },

    {
        id: "banner-black-friday",
        slug: "black-friday",
        title: "Banner Black Friday",
        description: "Model grafic predefinit pentru Black Friday. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-fructe-si-legume",
        slug: "fructe-si-legume",
        title: "Banner Fructe și Legume",
        description: "Model grafic predefinit pentru Fructe și Legume. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/fructe-si-legume.jpg",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-lichidare-totala",
        slug: "lichidare-totala",
        title: "Banner Lichidare Totala",
        description: "Model grafic predefinit pentru Lichidare Totala. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-alimentar",
        slug: "magazin-alimentar",
        title: "Banner Magazin Alimentar",
        description: "Model grafic predefinit pentru Magazin Alimentar. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/magazin-alimentar.jpg",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-decoratiuni",
        slug: "magazin-decoratiuni",
        title: "Banner Magazin Decoratiuni",
        description: "Model grafic predefinit pentru Magazin Decoratiuni. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-electro-it",
        slug: "magazin-electro-it",
        title: "Banner Magazin Electro It",
        description: "Model grafic predefinit pentru Magazin Electro It. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-electrocasnice",
        slug: "magazin-electrocasnice",
        title: "Banner Magazin Electrocasnice",
        description: "Model grafic predefinit pentru Magazin Electrocasnice. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-handmade",
        slug: "magazin-handmade",
        title: "Banner Magazin Handmade",
        description: "Model grafic predefinit pentru Magazin Handmade. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-pescuit",
        slug: "magazin-pescuit",
        title: "Banner Magazin Pescuit",
        description: "Model grafic predefinit pentru Magazin Pescuit. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-second-hand",
        slug: "magazin-second-hand",
        title: "Banner Magazin Second Hand",
        description: "Model grafic predefinit pentru Magazin Second Hand. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-sport",
        slug: "magazin-sport",
        title: "Banner Magazin Sport",
        description: "Model grafic predefinit pentru Magazin Sport. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-incaltaminte",
        slug: "magazin-incaltaminte",
        title: "Banner Magazin încaltaminte",
        description: "Model grafic predefinit pentru Magazin încaltaminte. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-oferta-exclusiva",
        slug: "oferta-exclusiva",
        title: "Banner Oferta Exclusiva",
        description: "Model grafic predefinit pentru Oferta Exclusiva. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-oferta-valabila-pana-la",
        slug: "oferta-valabila-pana-la",
        title: "Banner Oferta Valabila Pana La...",
        description: "Model grafic predefinit pentru Oferta Valabila Pana La.... Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-pet-shop",
        slug: "pet-shop",
        title: "Banner Pet Shop",
        description: "Model grafic predefinit pentru Pet Shop. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-produse-bio-eco",
        slug: "produse-bio-eco",
        title: "Banner Produse Bio Eco",
        description: "Model grafic predefinit pentru Produse Bio Eco. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-produse-noi-disponibile",
        slug: "produse-noi-disponibile",
        title: "Banner Produse Noi Disponibile",
        description: "Model grafic predefinit pentru Produse Noi Disponibile. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-reduceri-de-toamna",
        slug: "reduceri-de-toamna",
        title: "Banner Reduceri De Toamna",
        description: "Model grafic predefinit pentru Reduceri De Toamna. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-transport-marfa",
        slug: "transport-marfa",
        title: "Banner Transport Marfa",
        description: "Model grafic predefinit pentru Transport Marfa. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-angajam-personal",
        slug: "angajam-personal",
        title: "Banner Angajam Personal",
        description: "Model grafic predefinit pentru Angajam Personal. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-baner-baebershop1",
        slug: "baner-baebershop1",
        title: "Banner Baner Baebershop1",
        description: "Model grafic predefinit pentru Baner Baebershop1. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/baner-baebershop1.jpg",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },

    {
        id: "banner-banner-1",
        slug: "banner-1",
        title: "Banner Banner 1",
        description: "Model grafic predefinit pentru Banner 1. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-2",
        slug: "banner-2",
        title: "Banner Banner 2",
        description: "Model grafic predefinit pentru Banner 2. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-3",
        slug: "banner-3",
        title: "Banner Banner 3",
        description: "Model grafic predefinit pentru Banner 3. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-4",
        slug: "banner-4",
        title: "Banner Banner 4",
        description: "Model grafic predefinit pentru Banner 4. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-personalizat-direct-de-la-fermier-6107374",
        slug: "banner-personalizat-direct-de-la-fermier-6107374",
        title: "Banner Banner Personalizat Direct De La Fermier 6107374",
        description: "Model grafic predefinit pentru Banner Personalizat Direct De La Fermier 6107374. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-personalizat-direct-de-la-fermier_6107374.jpg",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-personalizat-direct-de-la-fermier-6107375",
        slug: "banner-personalizat-direct-de-la-fermier-6107375",
        title: "Banner Banner Personalizat Direct De La Fermier 6107375",
        description: "Model grafic predefinit pentru Banner Personalizat Direct De La Fermier 6107375. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-personalizat-direct-de-la-fermier_6107375.jpg",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-cadouri-personalizate",
        slug: "cadouri-personalizate",
        title: "Banner Cadouri Personalizate",
        description: "Model grafic predefinit pentru Cadouri Personalizate. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-centru-de-copiere",
        slug: "centru-de-copiere",
        title: "Banner Centru De Copiere",
        description: "Model grafic predefinit pentru Centru De Copiere. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-cizmarie",
        slug: "cizmarie",
        title: "Banner Cizmarie",
        description: "Model grafic predefinit pentru Cizmarie. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-deschis-acum",
        slug: "deschis-acum",
        title: "Banner Deschis Acum",
        description: "Model grafic predefinit pentru Deschis Acum. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-livram-la-domiciliu",
        slug: "livram-la-domiciliu",
        title: "Banner Livram La Domiciliu",
        description: "Model grafic predefinit pentru Livram La Domiciliu. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-livram-in-toata-tara",
        slug: "livram-in-toata-tara",
        title: "Banner Livram în Toata Tara",
        description: "Model grafic predefinit pentru Livram în Toata Tara. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-mobila-la-comanda",
        slug: "mobila-la-comanda",
        title: "Banner Mobila La Comanda",
        description: "Model grafic predefinit pentru Mobila La Comanda. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-nu-blocati",
        slug: "nu-blocati",
        title: "Banner Nu Blocati",
        description: "Model grafic predefinit pentru Nu Blocati. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/nu-blocati.jpg",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-promotie-de-vara",
        slug: "promotie-de-vara",
        title: "Banner Promotie De Vara",
        description: "Model grafic predefinit pentru Promotie De Vara. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-recrutam-personal",
        slug: "recrutam-personal",
        title: "Banner Recrutam Personal",
        description: "Model grafic predefinit pentru Recrutam Personal. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-showroom-deschis",
        slug: "showroom-deschis",
        title: "Banner Showroom Deschis",
        description: "Model grafic predefinit pentru Showroom Deschis. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-tipografie",
        slug: "tipografie",
        title: "Banner Tipografie",
        description: "Model grafic predefinit pentru Tipografie. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-winter-sale",
        slug: "winter-sale",
        title: "Banner Winter Sale",
        description: "Model grafic predefinit pentru Winter Sale. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-in-stoc",
        slug: "in-stoc",
        title: "Banner în Stoc",
        description: "Model grafic predefinit pentru în Stoc. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-inchiriere-utilaje",
        slug: "inchiriere-utilaje",
        title: "Banner închiriere Utilaje",
        description: "Model grafic predefinit pentru închiriere Utilaje. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-inchis-pentru-renovare",
        slug: "inchis-pentru-renovare",
        title: "Banner închis Pentru Renovare",
        description: "Model grafic predefinit pentru închis Pentru Renovare. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-atelier-mecanic",
        slug: "atelier-mecanic",
        title: "Banner Atelier Mecanic",
        description: "Model grafic predefinit pentru Atelier Mecanic. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-service-auto.jpg",
        price: "De la 49 LEI/mp",
        category: "Evenimente",
        tags: ["banner", "evenimente", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-personalizat-la-multi-ani-6107372",
        slug: "banner-personalizat-la-multi-ani-6107372",
        title: "Banner Banner Personalizat La Mulți Ani 6107372",
        description: "Model grafic predefinit pentru Banner Personalizat La Mulți Ani 6107372. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-personalizat-la-multi-ani_6107372.jpg",
        price: "De la 49 LEI/mp",
        category: "Evenimente",
        tags: ["banner", "evenimente", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },

    {
        id: "banner-la-multi-ani",
        slug: "la-multi-ani",
        title: "Banner La Mulți Ani",
        description: "Model grafic predefinit pentru La Mulți Ani. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/la-multi-ani.jpg",
        price: "De la 49 LEI/mp",
        category: "Evenimente",
        tags: ["banner", "evenimente", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-produs-in-romania",
        slug: "produs-in-romania",
        title: "Banner Produs în Romania",
        description: "Model grafic predefinit pentru Produs în Romania. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/produs-in-romania.jpg",
        price: "De la 49 LEI/mp",
        category: "Evenimente",
        tags: ["banner", "evenimente", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-vrei-sa-fii-sotia-mea",
        slug: "vrei-sa-fii-sotia-mea",
        title: "Banner Vrei Sa Fii Sotia Mea",
        description: "Model grafic predefinit pentru Vrei Sa Fii Sotia Mea. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/vrei-sa-fii-sotia-mea.jpg",
        price: "De la 49 LEI/mp",
        category: "Evenimente",
        tags: ["banner", "evenimente", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-fastfood",
        slug: "banner-fastfood",
        title: "Banner Banner Fastfood",
        description: "Model grafic predefinit pentru Banner Fastfood. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-fastfood.jpg",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-fastfood-1",
        slug: "banner-fastfood-1",
        title: "Banner Banner Fastfood 1",
        description: "Model grafic predefinit pentru Banner Fastfood 1. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-fastfood-1.jpg",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-barbershop",
        slug: "barbershop",
        title: "Banner Barbershop",
        description: "Model grafic predefinit pentru Barbershop. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/barbershop.jpg",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-brutarie",
        slug: "brutarie",
        title: "Banner Brutarie",
        description: "Model grafic predefinit pentru Brutarie. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-fastfood",
        slug: "fastfood",
        title: "Banner Fastfood",
        description: "Model grafic predefinit pentru Fastfood. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/fastfood.jpg",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-panificatie",
        slug: "panificatie",
        title: "Banner Panificatie",
        description: "Model grafic predefinit pentru Panificatie. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-pizzerie",
        slug: "pizzerie",
        title: "Banner Pizzerie",
        description: "Model grafic predefinit pentru Pizzerie. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-restaurant",
        slug: "restaurant",
        title: "Banner Restaurant",
        description: "Model grafic predefinit pentru Restaurant. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-terasa",
        slug: "terasa",
        title: "Banner Terasa",
        description: "Model grafic predefinit pentru Terasa. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-apartament-de-inchiriat",
        slug: "apartament-de-inchiriat",
        title: "Banner Apartament De Închiriat",
        description: "Model grafic predefinit pentru Apartament De Închiriat. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/apartament-de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-110",
        slug: "banner-de-vanzare-110",
        title: "Banner Banner De Vânzare 110",
        description: "Model grafic predefinit pentru Banner De Vânzare 110. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-110-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-111",
        slug: "banner-de-vanzare-111",
        title: "Banner Banner De Vânzare 111",
        description: "Model grafic predefinit pentru Banner De Vânzare 111. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-111-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-112",
        slug: "banner-de-vanzare-112",
        title: "Banner Banner De Vânzare 112",
        description: "Model grafic predefinit pentru Banner De Vânzare 112. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-112-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-113",
        slug: "banner-de-vanzare-113",
        title: "Banner Banner De Vânzare 113",
        description: "Model grafic predefinit pentru Banner De Vânzare 113. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-113-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-114",
        slug: "banner-de-vanzare-114",
        title: "Banner Banner De Vânzare 114",
        description: "Model grafic predefinit pentru Banner De Vânzare 114. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-114-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-115",
        slug: "banner-de-vanzare-115",
        title: "Banner Banner De Vânzare 115",
        description: "Model grafic predefinit pentru Banner De Vânzare 115. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-115-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-116",
        slug: "banner-de-vanzare-116",
        title: "Banner Banner De Vânzare 116",
        description: "Model grafic predefinit pentru Banner De Vânzare 116. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-116-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-117",
        slug: "banner-de-vanzare-117",
        title: "Banner Banner De Vânzare 117",
        description: "Model grafic predefinit pentru Banner De Vânzare 117. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-117-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-118",
        slug: "banner-de-vanzare-118",
        title: "Banner Banner De Vânzare 118",
        description: "Model grafic predefinit pentru Banner De Vânzare 118. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-118-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-119",
        slug: "banner-de-vanzare-119",
        title: "Banner Banner De Vânzare 119",
        description: "Model grafic predefinit pentru Banner De Vânzare 119. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-119-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-120",
        slug: "banner-de-vanzare-120",
        title: "Banner Banner De Vânzare 120",
        description: "Model grafic predefinit pentru Banner De Vânzare 120. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-120.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-121",
        slug: "banner-de-vanzare-121",
        title: "Banner Banner De Vânzare 121",
        description: "Model grafic predefinit pentru Banner De Vânzare 121. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-121.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-122",
        slug: "banner-de-vanzare-122",
        title: "Banner Banner De Vânzare 122",
        description: "Model grafic predefinit pentru Banner De Vânzare 122. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-122.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-123",
        slug: "banner-de-vanzare-123",
        title: "Banner Banner De Vânzare 123",
        description: "Model grafic predefinit pentru Banner De Vânzare 123. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-123-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-1",
        slug: "banner-de-vanzare-de-inchiriat-1",
        title: "Banner Banner De Vânzare De Închiriat 1",
        description: "Model grafic predefinit pentru Banner De Vânzare De Închiriat 1. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-1.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-10",
        slug: "banner-de-vanzare-de-inchiriat-10",
        title: "Banner Banner De Vânzare De Închiriat 10",
        description: "Model grafic predefinit pentru Banner De Vânzare De Închiriat 10. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-10.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-11",
        slug: "banner-de-vanzare-de-inchiriat-11",
        title: "Banner Banner De Vânzare De Închiriat 11",
        description: "Model grafic predefinit pentru Banner De Vânzare De Închiriat 11. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-11.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-13",
        slug: "banner-de-vanzare-de-inchiriat-13",
        title: "Banner Banner De Vânzare De Închiriat 13",
        description: "Model grafic predefinit pentru Banner De Vânzare De Închiriat 13. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-13.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-14",
        slug: "banner-de-vanzare-de-inchiriat-14",
        title: "Banner Banner De Vânzare De Închiriat 14",
        description: "Model grafic predefinit pentru Banner De Vânzare De Închiriat 14. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-14.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-2",
        slug: "banner-de-vanzare-de-inchiriat-2",
        title: "Banner Banner De Vânzare De Închiriat 2",
        description: "Model grafic predefinit pentru Banner De Vânzare De Închiriat 2. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-2.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-3",
        slug: "banner-de-vanzare-de-inchiriat-3",
        title: "Banner Banner De Vânzare De Închiriat 3",
        description: "Model grafic predefinit pentru Banner De Vânzare De Închiriat 3. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-3.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-4",
        slug: "banner-de-vanzare-de-inchiriat-4",
        title: "Banner Banner De Vânzare De Închiriat 4",
        description: "Model grafic predefinit pentru Banner De Vânzare De Închiriat 4. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-4.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-5",
        slug: "banner-de-vanzare-de-inchiriat-5",
        title: "Banner Banner De Vânzare De Închiriat 5",
        description: "Model grafic predefinit pentru Banner De Vânzare De Închiriat 5. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-5.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-6",
        slug: "banner-de-vanzare-de-inchiriat-6",
        title: "Banner Banner De Vânzare De Închiriat 6",
        description: "Model grafic predefinit pentru Banner De Vânzare De Închiriat 6. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-6.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-8",
        slug: "banner-de-vanzare-de-inchiriat-8",
        title: "Banner Banner De Vânzare De Închiriat 8",
        description: "Model grafic predefinit pentru Banner De Vânzare De Închiriat 8. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-8.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-9",
        slug: "banner-de-vanzare-de-inchiriat-9",
        title: "Banner Banner De Vânzare De Închiriat 9",
        description: "Model grafic predefinit pentru Banner De Vânzare De Închiriat 9. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-9.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-legume-de-vanzare",
        slug: "banner-legume-de-vanzare",
        title: "Banner Banner Legume De Vânzare",
        description: "Model grafic predefinit pentru Banner Legume De Vânzare. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-legume-de-vanzare.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },

    {
        id: "banner-banner-personalizat-de-vanzare-apartament-sau-teren-6107378",
        slug: "banner-personalizat-de-vanzare-apartament-sau-teren-6107378",
        title: "Banner Banner Personalizat De Vânzare Apartament Sau Teren 6107378",
        description: "Model grafic predefinit pentru Banner Personalizat De Vânzare Apartament Sau Teren 6107378. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-personalizat-de-vanzare-apartament-sau-teren_6107378.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-casa-de-vanzare",
        slug: "casa-de-vanzare",
        title: "Banner Casa De Vânzare",
        description: "Model grafic predefinit pentru Casa De Vânzare. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/casa-de-vanzare.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-casa-de-inchiriat",
        slug: "casa-de-inchiriat",
        title: "Banner Casa De Închiriat",
        description: "Model grafic predefinit pentru Casa De Închiriat. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/casa-de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-de-inchiriat",
        slug: "de-inchiriat",
        title: "Banner De Închiriat",
        description: "Model grafic predefinit pentru De Închiriat. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-garsoniera-de-vanzare",
        slug: "garsoniera-de-vanzare",
        title: "Banner Garsoniera De Vânzare",
        description: "Model grafic predefinit pentru Garsoniera De Vânzare. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/garsoniera-de-vanzare.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-garsoniera-de-inchiriat",
        slug: "garsoniera-de-inchiriat",
        title: "Banner Garsoniera De Închiriat",
        description: "Model grafic predefinit pentru Garsoniera De Închiriat. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/garsoniera-de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-spatiu-de-vanzare",
        slug: "spatiu-de-vanzare",
        title: "Banner Spatiu De Vânzare",
        description: "Model grafic predefinit pentru Spatiu De Vânzare. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/spatiu-de-vanzare.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-spatiu-de-inchiriat",
        slug: "spatiu-de-inchiriat",
        title: "Banner Spatiu De Închiriat",
        description: "Model grafic predefinit pentru Spatiu De Închiriat. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/spatiu-de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-teren-de-vanzare",
        slug: "teren-de-vanzare",
        title: "Banner Teren De Vânzare",
        description: "Model grafic predefinit pentru Teren De Vânzare. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/teren-de-vanzare.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-teren-de-inchiriat",
        slug: "teren-de-inchiriat",
        title: "Banner Teren De Închiriat",
        description: "Model grafic predefinit pentru Teren De Închiriat. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/teren-de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-teren-mp-de-vanzare",
        slug: "teren-mp-de-vanzare",
        title: "Banner Teren Mp De Vânzare",
        description: "Model grafic predefinit pentru Teren Mp De Vânzare. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/teren-mp-de-vanzare.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-vila-de-vanzare",
        slug: "vila-de-vanzare",
        title: "Banner Vila De Vânzare",
        description: "Model grafic predefinit pentru Vila De Vânzare. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/vila-de-vanzare.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-vila-de-inchiriat",
        slug: "vila-de-inchiriat",
        title: "Banner Vila De Închiriat",
        description: "Model grafic predefinit pentru Vila De Închiriat. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/vila-de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-inchiriere-birouri",
        slug: "inchiriere-birouri",
        title: "Banner închiriere Birouri",
        description: "Model grafic predefinit pentru închiriere Birouri. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-cabinet-dentar",
        slug: "banner-cabinet-dentar",
        title: "Banner Banner Cabinet Dentar",
        description: "Model grafic predefinit pentru Banner Cabinet Dentar. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-cabinet-dentar.jpg",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-cabinet-dentar-1",
        slug: "banner-cabinet-dentar-1",
        title: "Banner Banner Cabinet Dentar 1",
        description: "Model grafic predefinit pentru Banner Cabinet Dentar 1. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-cabinet-dentar-1.jpg",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-personalizat-santier-in-lucru-nu-blocati-6107381",
        slug: "banner-personalizat-santier-in-lucru-nu-blocati-6107381",
        title: "Banner Banner Personalizat Santier în Lucru Nu Blocati 6107381",
        description: "Model grafic predefinit pentru Banner Personalizat Santier în Lucru Nu Blocati 6107381. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-personalizat-santier-in-lucru-nu-blocati_6107381.jpg",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-servicii-medicale",
        slug: "banner-servicii-medicale",
        title: "Banner Banner Servicii Medicale",
        description: "Model grafic predefinit pentru Banner Servicii Medicale. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-servicii-medicale.jpg",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },

    {
        id: "banner-cabinet-stomatologic",
        slug: "cabinet-stomatologic",
        title: "Banner Cabinet Stomatologic",
        description: "Model grafic predefinit pentru Cabinet Stomatologic. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/cabinet-stomatologic.jpg",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-croitorie-retusari",
        slug: "croitorie-retusari",
        title: "Banner Croitorie Retusari",
        description: "Model grafic predefinit pentru Croitorie Retusari. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-curatenie-la-domiciliu",
        slug: "curatenie-la-domiciliu",
        title: "Banner Curatenie La Domiciliu",
        description: "Model grafic predefinit pentru Curatenie La Domiciliu. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-curatenie-profesionala",
        slug: "curatenie-profesionala",
        title: "Banner Curatenie Profesionala",
        description: "Model grafic predefinit pentru Curatenie Profesionala. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-curier-local",
        slug: "curier-local",
        title: "Banner Curier Local",
        description: "Model grafic predefinit pentru Curier Local. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-reparam-telefoane",
        slug: "reparam-telefoane",
        title: "Banner Reparam Telefoane",
        description: "Model grafic predefinit pentru Reparam Telefoane. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-servicii-medicale",
        slug: "servicii-medicale",
        title: "Banner Servicii Medicale",
        description: "Model grafic predefinit pentru Servicii Medicale. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/servicii-medicale.jpg",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
];

