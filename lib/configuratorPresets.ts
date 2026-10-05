import type { PriceInputBanner } from "./pricing";

export const STOCK_BANNER_DEFAULTS = {
    width: 200, height: 100, quantity: 1,
    material: "frontlit_440" as const, wantWindHoles: false,
};
export function stockBannerDefaultInput(): PriceInputBanner {
    return {
        width_cm: STOCK_BANNER_DEFAULTS.width,
        height_cm: STOCK_BANNER_DEFAULTS.height,
        quantity: STOCK_BANNER_DEFAULTS.quantity,
        material: STOCK_BANNER_DEFAULTS.material,
        banner_type: "single", want_wind_holes: STOCK_BANNER_DEFAULTS.wantWindHoles,
        want_hem_and_grommets: true, designOption: "upload",
    };
}
