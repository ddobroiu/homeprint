// Poza principala a fiecarui produs (nume bune pentru SEO), pentru locurile care o cauta dupa id
const P = "/products/poze-produse-seo/";

export const PRODUCT_HERO_IMAGES: Record<string, string> = {
    banner: `${P}banner-publicitar-personalizat.webp`,
    bannere: `${P}banner-publicitar-personalizat.webp`,
    "banner-verso": `${P}banner-fata-verso-personalizat.webp`,
    mesh: `${P}banner-mesh-publicitar-personalizat.webp`,
    afise: `${P}afis-personalizat.webp`,
    autocolante: `${P}autocolant-vinil-personalizat.webp`,
    "carti-vizita": `${P}carti-de-vizita-personalizate.webp`,
    flayere: `${P}flyere-personalizate.webp`,
    pliante: `${P}pliant-personalizat.webp`,
    rollup: `${P}roll-up-personalizat.webp`,
    tapet: `${P}tapet-personalizat-rola.webp`,
    "window-graphics": `${P}folie-microperforata-geam-personalizata.webp`,
    tricouri: `${P}tricou-alb-personalizat-fata.webp`,
    hanorace: `${P}hanorac-personalizat-fata.webp`,
    sepci: `${P}sapca-personalizata-fata.webp`,
    "fonduri-eu": `${P}kit-vizibilitate-ue-fonduri-europene.webp`,
    plexiglass: `${P}placa-plexiglas-personalizata.webp`,
    "pvc-forex": `${P}placa-pvc-forex-personalizata.webp`,
    alucobond: `${P}placa-alucobond-personalizata.webp`,
    carton: `${P}carton-plume-personalizat.webp`,
    polipropilena: `${P}placa-polipropilena-celulara-personalizata.webp`,
    canvas: "/products/grafica-originala/tablou-canvas-peisaj-montan-sasiu.webp",
};

export const productHeroImage = (id: string) => PRODUCT_HERO_IMAGES[id] ?? `${P}banner-publicitar-personalizat.webp`;
