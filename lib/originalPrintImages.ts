// Original illustrative product mockups; customer artwork remains separate.
export const ORIGINAL_PRINT_IMAGES: Record<string, string> = {
  "banner": "/products/homeprint-studio/banner.webp",
  "banner-verso": "/products/homeprint-studio/banner-verso.webp",
  "mesh": "/products/homeprint-studio/mesh.webp",
  "afise": "/products/homeprint-studio/afise.webp",
  "autocolante": "/products/homeprint-studio/autocolante.webp",
  "canvas": "/products/homeprint-studio/canvas.webp",
  "tapet": "/products/homeprint-studio/tapet.webp",
  "rollup": "/products/homeprint-studio/rollup.webp",
  "window-graphics": "/products/homeprint-studio/window-graphics.webp",
  "pliante": "/products/homeprint-studio/pliante.webp",
  "flayere": "/products/homeprint-studio/flayere.webp",
  "fonduri-eu": "/products/homeprint-studio/fonduri-eu.webp",
  "plexiglass": "/products/grafica-originala/placa-plexiglas-transparenta-grafica-birou-decupata.png",
  "pvc-forex": "/products/homeprint-studio/pvc-forex.webp",
  "alucobond": "/products/homeprint-studio/alucobond.webp",
  "carton": "/products/homeprint-studio/carton.webp",
  "polipropilena": "/products/homeprint-studio/polipropilena.webp",
  "tricouri": "/products/homeprint-studio/tricouri.webp",
  "hanorace": "/products/homeprint-studio/hanorace.webp",
  "sepci": "/products/homeprint-studio/sepci.webp",
  "carti-vizita": "/products/homeprint-studio/carti-vizita.webp",
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
