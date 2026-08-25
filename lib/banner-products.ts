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
        id: "banner-banner-service-auto-1",
        slug: "banner-service-auto-1",
        title: "Banner Banner Service Auto 1",
        description: "Model grafic predefinit pentru Banner Service Auto 1. Personalizează dimensiunile și comandă online.",
        image: "/products/banner/banner-service-auto-1.jpg",
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
    // ... rest of the products will be added in subsequent edits to avoid hitting token limits in a single call if too large
    // actually, I'll try to write a significant portion or use a different approach.
];
