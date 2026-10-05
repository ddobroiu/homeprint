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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
        price: "De la 29 LEI/mp",
        category: "Configuratoare",
        tags: ["banner", "print", "outdoor", "configurator"]
    },
    {
        id: "configurator-banner-verso",
        slug: "configurator-banner-verso",
        routeSlug: "configurator/banner-verso",
        title: "Print Banner Față-Verso",
        description: "Banner cu print pe ambele fețe (Blockout). Ideal pentru expunere stradală vizibilă din ambele sensuri.",
        image: "/products/grafica-originala/banner-fata-verso-blockout-grafica-eveniment.webp",
        price: "De la 55 LEI/mp",
        category: "Configuratoare",
        tags: ["banner", "double sided", "blockout", "configurator"]
    },
    {
        id: "configurator-mesh",
        slug: "configurator-banner", // Using banner configurator but implies mesh material choice usually, or generic
        routeSlug: "configurator/banner",
        title: "Print Mesh Publicitar",
        description: "Material perforat ideal pentru suprafețe mari și zone cu vânt puternic. Permite trecerea aerului.",
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
        price: "De la 35 LEI/mp",
        category: "Configuratoare",
        tags: ["mesh", "outdoor", "wind", "configurator"]
    },
    {
        id: "configurator-autocolant",
        slug: "configurator-autocolante",
        routeSlug: "configurator/autocolante",
        title: "Print Autocolant",
        description: "Autocolant PVC mat sau lucios pentru diverse aplicații. Decor vitrine, auto, panouri.",
        image: "/products/grafica-originala/autocolant-vinil-grafica-botanica.webp",
        price: "De la 39 LEI/mp",
        category: "Configuratoare",
        tags: ["autocolant", "sticker", "indoor", "outdoor", "configurator"]
    },
    {
        id: "configurator-canvas",
        slug: "configurator-canvas",
        routeSlug: "configurator/canvas",
        title: "Tablouri Canvas",
        description: "Transformă-ți fotografiile în tablouri canvas. Print de înaltă rezoluție pe pânză de bumbac.",
        image: "/products/grafica-originala/tablou-canvas-peisaj-montan-sasiu.webp",
        price: "De la 65 LEI",
        category: "Configuratoare",
        tags: ["canvas", "tablou", "decor", "configurator"]
    },
    {
        id: "configurator-afise",
        slug: "configurator-afise",
        routeSlug: "configurator/afise",
        title: "Afișe & Postere",
        description: "Tipar digital rapid pentru afișe, postere și concerte. Diverse dimensiuni standard. ",
        image: "/products/grafica-originala/afis-publicitar-grafica-festival-cultural.webp",
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
        image: "/products/grafica-originala/pliant-triptic-grafica-meniu-restaurant.webp",
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
        image: "/products/grafica-originala/roll-up-personalizat-grafica-expozitie.webp",
        price: "De la 120 LEI",
        category: "Configuratoare",
        tags: ["rollup", "expozitional", "stand", "configurator"]
    },
    {
        id: "configurator-tapet",
        slug: "configurator-tapet",
        routeSlug: "configurator/tapet",
        title: "Tapet Personalizat",
        description: "Tapet imprimat cu grafica ta. Ideal pentru decor interior personalizat acasă sau la birou.",
        image: "/products/grafica-originala/fototapet-personalizat-grafica-botanica-rola.webp",
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
        image: "/products/grafica-originala/folie-microperforata-geam-grafica-cafenea.webp",
        price: "De la 55 LEI/mp",
        category: "Configuratoare",
        tags: ["window graphics", "owv", "geam", "configurator"]
    },
    {
        id: "configurator-semnalistica",
        slug: "configurator-semnalistica",
        routeSlug: "configurator/semnalistica",
        title: "Semnalistică & Panouri",
        description: "Panouri rigide din PVC (Forex), Bond sau alte materiale pentru semnalistică și reclame.",
        image: "/products/materiale/pvc-forex/pvc-forex-1.webp",
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
        image: "/products/grafica-originala/placa-pvc-forex-grafica-receptie.webp",
        price: "De la 85 LEI/mp",
        category: "Configuratoare",
        tags: ["forex", "pvc", "rigid", "configurator"]
    },
    {
        id: "configurator-fonduri",
        slug: "configurator-fonduri-eu",
        routeSlug: "configurator/fonduri-pnrr",
        title: "Panouri Fonduri Europene",
        description: "Panouri și autocolante conforme pentru proiecte finanțate prin fonduri europene (PNRR, REGIO etc).",
        image: "/products/grafica-originala/kit-vizibilitate-proiect-panou-afis-etichete.webp",
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
        image: "/products/grafica-originala/carton-plume-panou-grafica-expozitie.webp", // Fallback, will ideally use their specific folder if exists
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
        image: "/products/grafica-originala/placa-alucobond-compozit-grafica-studio.webp",
        price: "De la 120 LEI/mp",
        category: "Configuratoare",
        tags: ["alucobond", "dibond", "aluminiu", "semnalistica", "configurator"]
    },
    {
        id: "configuratoare-polipropilena",
        slug: "materiale-polipropilena",
        routeSlug: "configurator/materiale/polipropilena",
        title: "Plăci Polipropilenă (PP)",
        description: "Material sintetic subțire, extrem de flexibil și rezistent la rupere, ideal pentru afișaj suspendat și roll-up.",
        image: "/products/grafica-originala/placa-polipropilena-celulara-grafica-directie.webp",
        price: "De la 45 LEI/mp",
        category: "Configuratoare",
        tags: ["polipropilena", "pp", "sintetic", "configurator"]
    },
    {
        id: "configurator-tricouri",
        slug: "configurator-tricouri",
        routeSlug: "configurator/tricouri",
        title: "Tricouri Personalizate",
        description: "Personalizează tricouri premium din bumbac. Print DTF de înaltă rezistență. Ideal pentru firmă sau evenimente.",
        image: "/products/grafica-originala/tricou-personalizat-grafica-munte-aventura.webp",
        price: "De la 60 LEI",
        category: "Configuratoare",
        tags: ["tricou", "tricouri", "textile", "personalizat", "configurator"]
    },
    {
        id: "configurator-hanorace",
        slug: "configurator-hanorace",
        routeSlug: "configurator/hanorace",
        title: "Hanorace Personalizate",
        description: "Hanorace premium, groase, personalizate cu designul tău. Calitate maximă a printului DTF.",
        image: "/products/grafica-originala/hanorac-personalizat-grafica-oras-noaptea.webp",
        price: "De la 160 LEI",
        category: "Configuratoare",
        tags: ["hanorac", "hanorace", "textile", "personalizat", "configurator"]
    },
    {
        id: "configurator-sepci",
        slug: "configurator-sepci",
        routeSlug: "configurator/sepci",
        title: "Șepci Personalizate",
        description: "Șepci premium personalizate cu logo-ul sau designul tău. Print DTF de înaltă calitate.",
        image: "/products/grafica-originala/sapca-personalizata-grafica-val-ocean.webp",
        price: "De la 45 LEI",
        category: "Configuratoare",
        tags: ["sapca", "sepci", "textile", "personalizat", "configurator"]
    },
    {
        id: "carti-vizita",
        slug: "carti-vizita",
        routeSlug: "configurator/carti-vizita",
        title: "Cărți de Vizită",
        description: "Cărți de vizită premium tipărite pe carton mat/lucios, plastic PVC, lemn sau variante metalice.",
        image: "/products/grafica-originala/carti-vizita-personalizate-grafica-atelier.webp",
        price: "De la 0.18 LEI",
        category: "Configuratoare",
        tags: ["carti de vizita", "print", "standard", "business", "plastic", "metal"]
    }
];
