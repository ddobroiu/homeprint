import { PRODUSE_NOI_LIST, produsNouFromPrice } from "@/lib/produseNoi/definitions";

export interface ConfiguratorProduct {
    id: string;
    slug: string;
    routeSlug: string;
    title: string;
    description: string;
    image: string;
    price: string | number;
    category: string;
    tags: string[];
}

export const configuratorProducts: ConfiguratorProduct[] = [
    {
        id: "configurator-banner",
        slug: "configurator-banner",
        routeSlug: "configurator/banner",
        title: "Print Banners",
        description: "Configurează online bannerul tău personalizat. Alege dimensiunile, materialul și încărcă grafica.",
        image: "/products/homeprint-studio/banner.webp",
        price: "De la 65 LEI/mp",
        category: "Configuratoare",
        tags: ["banner", "print", "outdoor", "configurator"]
    },
    {
        id: "configurator-banner-verso",
        slug: "configurator-banner-verso",
        routeSlug: "configurator/banner-verso",
        title: "Print Banner Față-Verso",
        description: "Banner cu print pe ambele fețe (Blockout). Ideal pentru expunere stradală vizibilă din ambele sensuri.",
        image: "/products/homeprint-studio/banner-verso.webp",
        price: "De la 126 LEI/mp",
        category: "Configuratoare",
        tags: ["banner", "double sided", "blockout", "configurator"]
    },
    {
        id: "configurator-mesh",
        slug: "configurator-banner", // Using banner configurator but implies mesh material choice usually, or generic
        routeSlug: "configurator/banner",
        title: "Print Mesh Publicitar",
        description: "Material perforat ideal pentru suprafețe mari și zone cu vânt puternic. Permite trecerea aerului.",
        image: "/products/homeprint-studio/banner.webp",
        price: "De la 65 LEI/mp",
        category: "Configuratoare",
        tags: ["mesh", "outdoor", "wind", "configurator"]
    },
    {
        id: "configurator-autocolant",
        slug: "configurator-autocolante",
        routeSlug: "configurator/autocolante",
        title: "Print Autocolant",
        description: "Autocolant PVC mat sau lucios pentru diverse aplicații. Decor vitrine, auto, panouri.",
        image: "/products/homeprint-studio/autocolante.webp",
        price: "De la 84 LEI/mp",
        category: "Configuratoare",
        tags: ["autocolant", "sticker", "indoor", "outdoor", "configurator"]
    },
    {
        id: "configurator-canvas",
        slug: "configurator-canvas",
        routeSlug: "configurator/canvas",
        title: "Tablouri Canvas",
        description: "Transformă-ți fotografiile în tablouri canvas. Print de înaltă rezoluție pe pânză de bumbac.",
        image: "/products/homeprint-studio/canvas.webp",
        price: "De la 82 LEI",
        category: "Configuratoare",
        tags: ["canvas", "tablou", "decor", "configurator"]
    },
    {
        id: "configurator-afise",
        slug: "configurator-afise",
        routeSlug: "configurator/afise",
        title: "Afișe & Postere",
        description: "Tipar digital rapid pentru afișe, postere și concerte. Diverse dimensiuni standard. ",
        image: "/products/homeprint-studio/afise.webp",
        price: "De la 3 LEI/buc",
        category: "Configuratoare",
        tags: ["afise", "postere", "hartie", "configurator"]
    },
    {
        id: "configurator-pliante",
        slug: "configurator-pliante",
        routeSlug: "configurator/pliante",
        title: "Pliante & Flyere",
        description: "Promovează-ți afacerea cu pliante și flyere de calitate. Diverse tipuri de hârtie și plieri.",
        image: "/products/homeprint-studio/pliante.webp",
        price: "De la 0.35 LEI/buc",
        category: "Configuratoare",
        tags: ["pliante", "flyere", "marketing", "configurator"]
    },
    {
        id: "configurator-rollup",
        slug: "configurator-rollup",
        routeSlug: "configurator/rollup",
        title: "Sisteme Roll-up",
        description: "Sisteme expoziționale portabile, ușor de montat. Include structură, print și geantă de transport.",
        image: "/products/homeprint-studio/rollup.webp",
        price: "De la 199 LEI",
        category: "Configuratoare",
        tags: ["rollup", "expozitional", "stand", "configurator"]
    },
    {
        id: "configurator-tapet",
        slug: "configurator-tapet",
        routeSlug: "configurator/tapet",
        title: "Tapet Personalizat",
        description: "Tapet imprimat cu grafica ta. Ideal pentru decor interior personalizat acasă sau la birou.",
        image: "/products/homeprint-studio/tapet.webp",
        price: "De la 85 LEI/mp",
        category: "Configuratoare",
        tags: ["tapet", "decor", "perete", "configurator"]
    },
    {
        id: "configurator-window-graphics",
        slug: "configurator-window-graphics",
        routeSlug: "configurator/window-graphics",
        title: "Window Graphics",
        description: "Autocolant perforat pentru geamuri. Permite vizibilitatea din interior spre exterior.",
        image: "/products/homeprint-studio/window-graphics.webp",
        price: "De la 185 LEI/mp",
        category: "Configuratoare",
        tags: ["window graphics", "owv", "geam", "configurator"]
    },
    {
        id: "configurator-semnalistica",
        slug: "configurator-semnalistica",
        routeSlug: "configurator/semnalistica",
        title: "Semnalistică & Panouri",
        description: "Panouri rigide din PVC (Forex), Bond sau alte materiale pentru semnalistică și reclame.",
        image: "/products/homeprint-studio/pvc-forex.webp",
        price: "De la 85 LEI/mp",
        category: "Configuratoare",
        tags: ["semnalistica", "forex", "panou", "configurator"]
    },
    {
        id: "materiale-pvc-forex",
        slug: "pvc-forex",
        routeSlug: "configurator/materiale/pvc-forex",
        title: "Print PVC Forex",
        description: "Plăci PVC Forex alb, grosimi 3mm, 5mm sau 10mm. Ideale pentru semnalistică economică și rigidă.",
        image: "/products/homeprint-studio/pvc-forex.webp",
        price: "De la 155 LEI/mp",
        category: "Configuratoare",
        tags: ["forex", "pvc", "rigid", "configurator"]
    },
    {
        id: "configurator-fonduri",
        slug: "configurator-fonduri-eu",
        routeSlug: "configurator/fonduri-pnrr",
        title: "Panouri Fonduri Europene",
        description: "Panouri și autocolante conforme pentru proiecte finanțate prin fonduri europene (PNRR, REGIO etc).",
        image: "/products/homeprint-studio/fonduri-eu.webp",
        price: "De la 55 LEI",
        category: "Configuratoare",
        tags: ["fonduri", "pnrr", "proiecte", "configurator"]
    },
    {
        id: "configuratoare-carton",
        slug: "materiale-carton",
        routeSlug: "configurator/materiale/carton",
        title: "Display Carton (Ondulat & Fagure)",
        description: "Comandă plăci din carton ondulat sau fagure personalizate. Imprimare UV de înaltă calitate, tăiere la dimensiune. Soluții eco-friendly.",
        image: "/products/homeprint-studio/carton.webp", // Fallback, will ideally use their specific folder if exists
        price: "De la 25 LEI",
        category: "Configuratoare",
        tags: ["carton", "fagure", "eco", "configurator"]
    },
    {
        id: "configuratoare-plexiglass",
        slug: "materiale-plexiglass",
        routeSlug: "configurator/materiale/plexiglass",
        title: "Print Plexiglass",
        description: "Imprimare directă UV pe panouri din plexiglass (acril). Ideal pentru semnalistică premium și firme luminoase.",
        image: "/products/grafica-originala/placa-plexiglas-transparenta-grafica-birou-decupata.png",
        price: "De la 95 LEI/mp",
        category: "Configuratoare",
        tags: ["plexiglass", "acril", "semnalistica", "configurator"]
    },
    {
        id: "configuratoare-alucobond",
        slug: "materiale-alucobond",
        routeSlug: "configurator/materiale/alucobond",
        title: "Panouri Alucobond (Dibond)",
        description: "Semnalistică rigidă și rezistentă pe panouri compozite din aluminiu. Recomandate pentru expunere pe termen lung.",
        image: "/products/homeprint-studio/alucobond.webp",
        price: "De la 445 LEI/mp",
        category: "Configuratoare",
        tags: ["alucobond", "dibond", "aluminiu", "semnalistica", "configurator"]
    },
    {
        id: "configuratoare-polipropilena",
        slug: "materiale-polipropilena",
        routeSlug: "configurator/materiale/polipropilena",
        title: "Plăci Polipropilenă (PP)",
        description: "Material sintetic subțire, extrem de flexibil și rezistent la rupere, ideal pentru afișaj suspendat și roll-up.",
        image: "/products/homeprint-studio/polipropilena.webp",
        price: "De la 210 LEI/mp",
        category: "Configuratoare",
        tags: ["polipropilena", "pp", "sintetic", "configurator"]
    },
    {
        id: "configurator-tricouri",
        slug: "configurator-tricouri",
        routeSlug: "configurator/tricouri",
        title: "Tricouri Personalizate",
        description: "Personalizează tricouri premium din bumbac. Print DTF de înaltă rezistență. Ideal pentru firmă sau evenimente.",
        image: "/products/homeprint-studio/tricouri.webp",
        price: "De la 73 LEI",
        category: "Configuratoare",
        tags: ["tricou", "tricouri", "textile", "personalizat", "configurator"]
    },
    {
        id: "configurator-hanorace",
        slug: "configurator-hanorace",
        routeSlug: "configurator/hanorace",
        title: "Hanorace Personalizate",
        description: "Hanorace premium, groase, personalizate cu designul tău. Calitate maximă a printului DTF.",
        image: "/products/homeprint-studio/hanorace.webp",
        price: "De la 200 LEI",
        category: "Configuratoare",
        tags: ["hanorac", "hanorace", "textile", "personalizat", "configurator"]
    },
    {
        id: "configurator-sepci",
        slug: "configurator-sepci",
        routeSlug: "configurator/sepci",
        title: "Șepci Personalizate",
        description: "Șepci premium personalizate cu logo-ul sau designul tău. Print DTF de înaltă calitate.",
        image: "/products/homeprint-studio/sepci.webp",
        price: "De la 61 LEI",
        category: "Configuratoare",
        tags: ["sapca", "sepci", "textile", "personalizat", "configurator"]
    },
    {
        id: "carti-vizita",
        slug: "carti-vizita",
        routeSlug: "configurator/carti-vizita",
        title: "Cărți de Vizită",
        description: "Cărți de vizită premium tipărite pe carton mat/lucios, plastic PVC, lemn sau variante metalice.",
        image: "/products/homeprint-studio/carti-vizita.webp",
        price: "De la 0.36 LEI",
        category: "Configuratoare",
        tags: ["carti de vizita", "print", "standard", "business", "plastic", "metal"]
    },
    // Calendare, steaguri beachflag, X-banner, panou stradal (lib/produseNoi/definitions.ts)
    ...PRODUSE_NOI_LIST.map((d): ConfiguratorProduct => ({
        id: `configurator-${d.id}`,
        slug: `configurator-${d.id}`,
        routeSlug: d.path.slice(1),
        title: d.name,
        description: d.seoDescription,
        image: d.gallery(d.initial())[0],
        price: `De la ${String(Math.round(produsNouFromPrice(d.id) * 100) / 100)} LEI`,
        category: "Configuratoare",
        tags: [...d.keywords.slice(0, 5), "configurator"],
    })),
];
