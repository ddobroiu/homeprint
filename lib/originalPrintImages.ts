// Original illustrative product mockups; customer artwork remains separate.
export const ORIGINAL_PRINT_IMAGES: Record<string, string> = {
  "banner": "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
  "banner-verso": "/products/grafica-originala/banner-fata-verso-blockout-grafica-eveniment.webp",
  "mesh": "/products/grafica-originala/banner-mesh-perforat-grafica-constructii.webp",
  "afise": "/products/grafica-originala/afis-publicitar-grafica-festival-cultural.webp",
  "autocolante": "/products/grafica-originala/autocolant-vinil-grafica-botanica.webp",
  "canvas": "/products/grafica-originala/tablou-canvas-peisaj-montan-sasiu.webp",
  "tapet": "/products/grafica-originala/fototapet-personalizat-grafica-botanica-rola.webp",
  "rollup": "/products/grafica-originala/roll-up-personalizat-grafica-expozitie.webp",
  "window-graphics": "/products/grafica-originala/folie-microperforata-geam-grafica-cafenea.webp",
  "pliante": "/products/grafica-originala/pliant-triptic-grafica-meniu-restaurant.webp",
  "flayere": "/products/grafica-originala/flyer-publicitar-grafica-atelier-creativ.webp",
  "fonduri-eu": "/products/grafica-originala/kit-vizibilitate-proiect-panou-afis-etichete.webp",
  "plexiglass": "/products/grafica-originala/placa-plexiglas-transparenta-grafica-birou-decupata.png",
  "pvc-forex": "/products/grafica-originala/placa-pvc-forex-grafica-receptie.webp",
  "alucobond": "/products/grafica-originala/placa-alucobond-compozit-grafica-studio.webp",
  "carton": "/products/grafica-originala/carton-plume-panou-grafica-expozitie.webp",
  "polipropilena": "/products/grafica-originala/placa-polipropilena-celulara-grafica-directie.webp",
  "tricouri": "/products/grafica-originala/tricou-personalizat-grafica-munte-aventura.webp",
  "hanorace": "/products/grafica-originala/hanorac-personalizat-grafica-oras-noaptea.webp",
  "sepci": "/products/grafica-originala/sapca-personalizata-grafica-val-ocean.webp",
  "carti-vizita": "/products/grafica-originala/carti-vizita-personalizate-grafica-atelier.webp",
  "banner-de-inchiriat": "/products/grafica-originala/banner-de-inchiriat-grafica-personalizata.webp",
  "banner-service-auto": "/products/grafica-originala/banner-service-auto-grafica-personalizata.webp",
  "banner-vulcanizare": "/products/grafica-originala/banner-vulcanizare-grafica-personalizata.webp",
  "banner-cafenea": "/products/grafica-originala/banner-cafenea-grafica-personalizata.webp",
  "banner-restaurant": "/products/grafica-originala/banner-restaurant-grafica-personalizata.webp",
  "banner-frizerie": "/products/grafica-originala/banner-frizerie-grafica-personalizata.webp",
  "banner-magazin-alimentar": "/products/grafica-originala/banner-magazin-alimentar-grafica-personalizata.webp",
  "banner-spalatorie-auto": "/products/grafica-originala/banner-spalatorie-auto-grafica-personalizata.webp",
  "banner-stomatologie": "/products/grafica-originala/banner-stomatologie-grafica-personalizata.webp",
  "banner-la-multi-ani": "/products/grafica-originala/banner-la-multi-ani-grafica-personalizata.webp",
  "banner-nunta": "/products/grafica-originala/banner-nunta-grafica-personalizata.webp",
  "banner-nu-blocati": "/products/grafica-originala/banner-nu-blocati-grafica-personalizata.webp",
  "banner-angajam": "/products/grafica-originala/banner-angajam-grafica-personalizata.webp",
  "banner-mobila": "/products/grafica-originala/banner-mobila-grafica-personalizata.webp",
  "banner-de-vanzare": "/products/grafica-originala/banner-de-vanzare-teren-grafica-imobiliara.webp",
  "banner-vanzare-imobil": "/products/grafica-originala/banner-de-vanzare-imobil-grafica-personalizata.webp"
};

export function getBannerExampleImage(text: string, fallback: string): string {
  const value = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (!/\bbanner(?:e|s)?\b/.test(value)) return fallback;
  if (/mesh/.test(value)) return ORIGINAL_PRINT_IMAGES.mesh;
  if (/fata.verso|blockout/.test(value)) return ORIGINAL_PRINT_IMAGES["banner-verso"];
  const themes: [RegExp, string][] = [
    [/nu.blocati|acces.parcare/, "banner-nu-blocati"],
    [/vand.teren|teren.de.vanzare/, "banner-de-vanzare"],
    [/de.vanzare|vanzare|imobiliare/, "banner-vanzare-imobil"],
    [/de.inchiriat|spatiu.comercial|apartament.*inchiri|inchiri.*apartament/, "banner-de-inchiriat"],
    [/vulcanizare/, "banner-vulcanizare"],
    [/spalatorie.auto|self.wash/, "banner-spalatorie-auto"],
    [/service.auto|reparatii.auto|mecanica|diagnoza/, "banner-service-auto"],
    [/cafenea|coffee/, "banner-cafenea"],
    [/frizerie|barber/, "banner-frizerie"],
    [/magazin.alimentar|market/, "banner-magazin-alimentar"],
    [/restaurant/, "banner-restaurant"],
    [/stomatolog|dentist/, "banner-stomatologie"],
    [/la.multi.ani|aniversare/, "banner-la-multi-ani"],
    [/bine.ati.venit|nunta|nunti/, "banner-nunta"],
    [/angajam|angajari/, "banner-angajam"],
    [/mobila.la.comanda/, "banner-mobila"],
  ];
  for (const [pattern, id] of themes) if (pattern.test(value)) return ORIGINAL_PRINT_IMAGES[id];
  return fallback;
}

export function withOriginalBannerImages<T extends { title: string; images?: string[]; key?: string }>(items: Record<string, T>): Record<string, T> {
  return Object.fromEntries(Object.entries(items).map(([key, item]) => {
    const old = item.images || [];
    const image = getBannerExampleImage(`banner ${key} ${item.title}`, old[0] || ORIGINAL_PRINT_IMAGES.banner);
    return [key, { ...item, images: [image, ...old.filter(src => src !== image)] }];
  }));
}
