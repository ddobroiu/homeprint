// lib/merchant/landingPrice.ts
//
// Ce preț arată pagina când e deschisă la o anumită adresă (cu parametri ?w=&h=...).
// Refolosește exact inițializarea configuratoarelor (lib/configuratorPresets.ts) și funcțiile
// lor de preț (lib/pricing.ts). Folosit de:
//   - scripts/check-merchant-prices.ts (prețul din feed == prețul paginii),
//   - LandingOfferJsonLd (datele structurate ale paginii au același preț ca feedul).

import {
    calculateAlucobondPrice,
    calculateBannerPrice,
    calculateBannerVersoPrice,
    calculateBusinessCardPrice,
    calculateCanvasPrice,
    calculateCanvasMartisorPrice,
    calculateCanvas8MartiePrice,
    calculateFlyerPrice,
    calculateFonduriEUPrice,
    calculatePVCForexPrice,
    calculatePliantePrice,
    calculatePosterPrice,
    calculateRollupPrice,
    calculateTapetPrice,
    calculateTextilePrice,
    calculateWindowGraphicsPrice,
    calculateAutocolantePrice,
    calculateCartonPrice,
    calculatePlexiglassPrice,
    calculatePolipropilenaPrice,
} from "@/lib/pricing";
import {
    configuratorInitialQuantity,
    contourInitialState,
    seasonalCanvasInitialInput,
    afiseInitialState,
    alucobondInitialInput,
    autocolanteInitialInput,
    bannerInitialInput,
    bannerVersoInitialInput,
    canvasInitialState,
    cartiVizitaInitialInput,
    dispatcherInitialDims,
    flyerInitialState,
    fonduriInitialSelections,
    plianteInitialState,
    pvcForexInitialInput,
    rollupInitialInput,
    stockBannerDefaultInput,
    tapetInitialInput,
    windowGraphicsInitialInput,
    type ParamSource,
} from "@/lib/quickPrintPresets";
import { bannerProducts } from "@/lib/products/banner-products";
import { HANORACE_MODELS, SEPCI_MODELS, type TextileModel } from "@/lib/products/textile-models";
import { findSearchProduct, searchProductPrice } from "@/lib/searchProductDefinitions";
import { PRODUSE_NOI_LIST, produsNouLandingPrice } from "@/lib/produseNoi/definitions";

export type LandingPrice = { configurator: string; price: number };

/**
 * Tricourile: components/TextileConfigurator.tsx pornește cu primul model ("Tricou Basic"),
 * imprimare față și cantitatea din ?q. Componenta nu e mutată pe lib/configuratorPresets.ts
 * (e în lucru separat), deci regula e copiată aici — verificată de scripts/check-merchant-prices.ts.
 */
function textileInitialQuantity(sp: ParamSource): number {
    const pQ = sp.get("q");
    return pQ ? parseInt(pQ) : 1;
}

/**
 * Hanorace / șepci: același TextileConfigurator — primul model, a doua mărime și a doua culoare
 * (sau prima, dacă nu există), imprimare față, cantitatea din ?q. Regula e copiată din componentă.
 */
function textileModelPrice(type: "hanorace" | "sepci", models: TextileModel[], sp: ParamSource): number {
    const m = models[0];
    return calculateTextilePrice({
        type,
        model: m.id,
        quantity: textileInitialQuantity(sp),
        size: m.sizes[1] || m.sizes[0],
        color: m.colors[1] || m.colors[0],
        printPosition: "fata",
        designOption: "upload",
    }).finalPrice;
}

/**
 * Decor cu fotografia copilului (components/configurator/ChildPhotoConfigurator.tsx): pornește la
 * 70×100 cm, 1 buc, PVC 3 mm decupat pe contur + 50 lei prelucrarea fotografiei. Regula e copiată din componentă.
 */
export function childPhotoDecorInitialPrice(sp?: ParamSource): number {
    const initial = contourInitialState(sp ?? new URLSearchParams());
    const cost = calculatePVCForexPrice({
        width_cm: initial.width, height_cm: initial.height, quantity: initial.quantity, thickness_mm: 3, contour_cut: true, designOption: "upload", stock_model: true,
    });
    return Math.round((cost.finalPrice + 50) * 100) / 100;
}

/** Personaj propriu decupat pe contur (components/configurator/OwnCharacterConfigurator.tsx): aceeasi regula ca
 * decorul cu fotografia copilului — 70×100 cm, 1 buc, PVC 3 mm decupat pe contur + 50 lei prelucrarea. */
export function ownCharacterInitialPrice(): number {
    return childPhotoDecorInitialPrice();
}

/** Prețul afișat la deschiderea paginii `pathname` + `sp`, sau null dacă nu e o pagină cunoscută. */
export function landingPriceFor(pathname: string, sp: ParamSource): LandingPrice | null {
    const path = pathname.replace(/\/+$/, "") || "/";
    const dims = dispatcherInitialDims(sp);

    switch (path) {
        case "/configurator/banner":
            return { configurator: "banner", price: calculateBannerPrice(bannerInitialInput(sp)).finalPrice };
        case "/configurator/mesh":
            return {
                configurator: "mesh",
                price: calculateBannerPrice(
                    bannerInitialInput(sp, { initW: dims.initialWidth, initH: dims.initialHeight, productKind: "mesh" })
                ).finalPrice,
            };
        case "/configurator/banner-verso":
            return {
                configurator: "banner-verso",
                price: calculateBannerVersoPrice(
                    bannerVersoInitialInput(sp, { initW: dims.initialWidth, initH: dims.initialHeight })
                ).finalPrice,
            };
        case "/configurator/canvas":
            return {
                configurator: "canvas",
                price: calculateCanvasPrice(canvasInitialState(sp, dims.initialWidth, dims.initialHeight).input).finalPrice,
            };
        case "/configurator/rollup":
            return { configurator: "rollup", price: calculateRollupPrice(rollupInitialInput(dims.initialWidth, sp)).finalPrice };
        case "/configurator/autocolante":
            return {
                configurator: "autocolante",
                price: calculateAutocolantePrice(autocolanteInitialInput(sp, dims.initialWidth, dims.initialHeight)).finalPrice,
            };
        case "/configurator/materiale/pvc-forex":
            return {
                configurator: "pvc-forex",
                price: calculatePVCForexPrice(pvcForexInitialInput(sp, dims.initialWidth, dims.initialHeight)).finalPrice,
            };
        case "/configurator/materiale/alucobond":
            return {
                configurator: "alucobond",
                price: calculateAlucobondPrice(alucobondInitialInput(sp, dims.initialWidth, dims.initialHeight)).finalPrice,
            };
        case "/configurator/afise": {
            const s = afiseInitialState(sp);
            return { configurator: "afise", price: calculatePosterPrice({ ...s, designOption: "upload" }).finalPrice };
        }
        case "/configurator/flayere": {
            const s = flyerInitialState(sp);
            return { configurator: "flayere", price: calculateFlyerPrice({ ...s, designOption: "upload" }).finalPrice };
        }
        case "/configurator/pliante": {
            const s = plianteInitialState(sp);
            return { configurator: "pliante", price: calculatePliantePrice({ ...s, designOption: "upload" }).finalPrice };
        }
        case "/configurator/carti-vizita":
            return { configurator: "carti-vizita", price: calculateBusinessCardPrice(cartiVizitaInitialInput(sp)).finalPrice };
        case "/configurator/fonduri-eu":
        case "/configurator/fonduri-pnrr":
            return {
                configurator: "fonduri-pnrr",
                price: calculateFonduriEUPrice({ selections: fonduriInitialSelections(sp), isRegio: false }).finalPrice,
            };
        case "/configurator/tapet":
            return {
                configurator: "tapet",
                price: calculateTapetPrice(tapetInitialInput(dims.initialWidth, dims.initialHeight, sp)).finalPrice,
            };
        case "/configurator/window-graphics":
            return {
                configurator: "window-graphics",
                price: calculateWindowGraphicsPrice(windowGraphicsInitialInput(dims.initialWidth, dims.initialHeight, sp)).finalPrice,
            };
        case "/configurator/tricouri":
            return {
                configurator: "tricouri",
                price: calculateTextilePrice({
                    type: "tricouri",
                    model: "basic",
                    quantity: textileInitialQuantity(sp),
                    size: "M",
                    color: "Negru",
                    printPosition: "fata",
                    designOption: "upload",
                }).finalPrice,
            };
        case "/configurator/hanorace":
            return { configurator: "hanorace", price: textileModelPrice("hanorace", HANORACE_MODELS, sp) };
        case "/configurator/sepci":
            return { configurator: "sepci", price: textileModelPrice("sepci", SEPCI_MODELS, sp) };
        // Plăcile de mai jos: starea inițială e copiată din components/configurator/Configurator{Plexiglass,Polipropilena,Carton}.tsx
        case "/configurator/materiale/plexiglass":
            return {
                configurator: "plexiglass",
                price: calculatePlexiglassPrice({
                    width_cm: dims.initialWidth ?? 50, height_cm: dims.initialHeight ?? 50, quantity: configuratorInitialQuantity(sp), material: "alb",
                    thickness_mm: 3, print_double: false, designOption: "upload", standoffs: null,
                }).finalPrice,
            };
        case "/configurator/materiale/polipropilena":
            return {
                configurator: "polipropilena",
                price: calculatePolipropilenaPrice({
                    width_cm: dims.initialWidth ?? 60, height_cm: dims.initialHeight ?? 40, quantity: configuratorInitialQuantity(sp), thickness_mm: 3, designOption: "upload",
                }).finalPrice,
            };
        case "/configurator/materiale/carton":
            return {
                configurator: "carton",
                price: calculateCartonPrice({
                    width_cm: dims.initialWidth ?? 50, height_cm: dims.initialHeight ?? 50, quantity: configuratorInitialQuantity(sp), material: "ondulat", ondula: "E",
                    reciclatBoard: "board10", edgePerimeter_m: 0, edgeType: "board10", designOption: "upload", printDouble: false,
                }).finalPrice,
            };
        case "/configurator/decor-foto-copil":
            return { configurator: "decor-foto-copil", price: childPhotoDecorInitialPrice(sp) };
        case "/configurator/personaj-propriu":
            return { configurator: "personaj-propriu", price: childPhotoDecorInitialPrice(sp) };
        case "/configurator/canvas-martisor":
            return {configurator: "canvas-martisor", price: calculateCanvasMartisorPrice(seasonalCanvasInitialInput(sp)).finalPrice};
        case "/configurator/canvas-8-martie":
            return {configurator: "canvas-8-martie", price: calculateCanvas8MartiePrice(seasonalCanvasInitialInput(sp)).finalPrice};
    }

    // Calendare, steaguri beachflag, X-banner, panou stradal: aceeași stare inițială ca ProdusNouConfigurator
    const nou = PRODUSE_NOI_LIST.find((d) => d.path === path);
    if (nou) return { configurator: nou.id, price: produsNouLandingPrice(nou.id, sp) };

    // Modelele gata făcute (/shop/<categorie>/<slug>): components/SearchProductPage.tsx arată searchProductPrice(model)
    const model = path.match(/^\/shop\/([^/]+)\/([^/]+)$/);
    if (model) {
        const p = findSearchProduct(decodeURIComponent(model[1]), decodeURIComponent(model[2]));
        if (p) return { configurator: "search-product", price: searchProductPrice(p).total };
    }

    const stock = path.match(/^\/banner-product\/([^/]+)$/);
    if (stock && bannerProducts.some((p) => p.slug === decodeURIComponent(stock[1]))) {
        return { configurator: "banner-product", price: calculateBannerPrice(stockBannerDefaultInput(decodeURIComponent(stock[1]), sp)).finalPrice };
    }
    return null;
}

/** Același lucru, pornind de la o adresă completă (https://www.shopprint.ro/configurator/banner?w=100&h=200). */
export function landingPriceFromUrl(url: string): LandingPrice | null {
    const u = new URL(url, "https://www.shopprint.ro");
    return landingPriceFor(u.pathname, u.searchParams);
}
