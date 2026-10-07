import { stockBannerFormat } from './bannerProductFormats';
import type { PriceInputBanner } from "./pricing";

export const STOCK_BANNER_DEFAULTS = {
    width: 200, height: 100, quantity: 1,
    material: "frontlit_440" as const, wantWindHoles: false,
};
export function stockBannerDefaultInput(slug = ""): PriceInputBanner {
    return {
        width_cm: stockBannerFormat(slug).width,
        height_cm: stockBannerFormat(slug).height,
        quantity: STOCK_BANNER_DEFAULTS.quantity,
        material: stockBannerFormat(slug).material,
        banner_type: "single", want_wind_holes: stockBannerFormat(slug).material === "mesh" ? false : STOCK_BANNER_DEFAULTS.wantWindHoles,
        want_hem_and_grommets: true, designOption: "upload",
    };
}
