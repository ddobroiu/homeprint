// Fonturile editorului: 42 de familii Google Fonts, toate sub SIL Open Font License 1.1
// (sau Apache 2.0), deci se pot folosi în materiale tipărite comerciale.
// Fiecare a fost verificată (fontkit, fișierele latin + latin-ext) că are ă â î ș ț și majusculele lor;
// au fost scoase cele fără ș/ț (Righteous, Satisfy, Courgette, Lato, Russo One, Titan One etc.).

export type FontCategory = "sans" | "condensat" | "serif" | "script" | "decorativ";

export type EditorFont = {
    family: string;
    category: FontCategory;
    weights: number[];
    italic?: boolean;
};

export const FONT_CATEGORIES: Array<{ id: FontCategory; label: string }> = [
    { id: "sans", label: "Moderne" },
    { id: "condensat", label: "Titluri / condensate" },
    { id: "serif", label: "Serif / elegante" },
    { id: "script", label: "Scris de mână" },
    { id: "decorativ", label: "Decorative" },
];

const W = (...w: number[]) => w;

export const EDITOR_FONTS: EditorFont[] = [
    { family: "Montserrat", category: "sans", weights: W(300, 400, 500, 600, 700, 800, 900), italic: true },
    { family: "Inter", category: "sans", weights: W(300, 400, 500, 600, 700, 800, 900), italic: true },
    { family: "Poppins", category: "sans", weights: W(300, 400, 500, 600, 700, 800, 900), italic: true },
    { family: "Roboto", category: "sans", weights: W(300, 400, 500, 700, 900), italic: true },
    { family: "Open Sans", category: "sans", weights: W(300, 400, 600, 700, 800), italic: true },
    { family: "Raleway", category: "sans", weights: W(300, 400, 600, 700, 800, 900), italic: true },
    { family: "Nunito", category: "sans", weights: W(300, 400, 600, 700, 800, 900), italic: true },
    { family: "Rubik", category: "sans", weights: W(300, 400, 500, 700, 900), italic: true },
    { family: "Manrope", category: "sans", weights: W(300, 400, 500, 700, 800) },
    { family: "Outfit", category: "sans", weights: W(300, 400, 500, 600, 700, 800, 900) },
    { family: "DM Sans", category: "sans", weights: W(400, 500, 700, 900), italic: true },
    { family: "Plus Jakarta Sans", category: "sans", weights: W(400, 500, 700, 800), italic: true },
    { family: "Fira Sans", category: "sans", weights: W(300, 400, 500, 700, 900), italic: true },
    { family: "Josefin Sans", category: "sans", weights: W(300, 400, 600, 700), italic: true },
    { family: "Oswald", category: "condensat", weights: W(300, 400, 500, 600, 700) },
    { family: "Bebas Neue", category: "condensat", weights: W(400) },
    { family: "Anton", category: "condensat", weights: W(400) },
    { family: "Archivo Black", category: "condensat", weights: W(400) },
    { family: "Barlow Condensed", category: "condensat", weights: W(400, 500, 600, 700, 800, 900), italic: true },
    { family: "League Spartan", category: "condensat", weights: W(400, 500, 600, 700, 800, 900) },
    { family: "Staatliches", category: "condensat", weights: W(400) },
    { family: "Kanit", category: "condensat", weights: W(300, 400, 500, 700, 900), italic: true },
    { family: "Playfair Display", category: "serif", weights: W(400, 500, 600, 700, 800, 900), italic: true },
    { family: "Merriweather", category: "serif", weights: W(300, 400, 700, 900), italic: true },
    { family: "Lora", category: "serif", weights: W(400, 500, 600, 700), italic: true },
    { family: "Libre Baskerville", category: "serif", weights: W(400, 700), italic: true },
    { family: "Cormorant Garamond", category: "serif", weights: W(300, 400, 500, 600, 700), italic: true },
    { family: "EB Garamond", category: "serif", weights: W(400, 500, 600, 700, 800), italic: true },
    { family: "DM Serif Display", category: "serif", weights: W(400), italic: true },
    { family: "Cinzel", category: "serif", weights: W(400, 500, 600, 700, 800, 900) },
    { family: "Abril Fatface", category: "serif", weights: W(400) },
    { family: "Alfa Slab One", category: "serif", weights: W(400) },
    { family: "Dancing Script", category: "script", weights: W(400, 500, 600, 700) },
    { family: "Pacifico", category: "script", weights: W(400) },
    { family: "Great Vibes", category: "script", weights: W(400) },
    { family: "Caveat", category: "script", weights: W(400, 500, 600, 700) },
    { family: "Kaushan Script", category: "script", weights: W(400) },
    { family: "Allura", category: "script", weights: W(400) },
    { family: "Lobster", category: "decorativ", weights: W(400) },
    { family: "Bangers", category: "decorativ", weights: W(400) },
    { family: "Bungee", category: "decorativ", weights: W(400) },
    { family: "Black Ops One", category: "decorativ", weights: W(400) },
    { family: "Amatic SC", category: "decorativ", weights: W(400, 700) },
    { family: "Baloo 2", category: "decorativ", weights: W(400, 500, 600, 700, 800) },
];

export const DEFAULT_FONT = "Montserrat";

export function fontByFamily(family: string): EditorFont {
    return EDITOR_FONTS.find((f) => f.family === family) ?? EDITOR_FONTS[0];
}

/** Grosimea disponibilă cea mai apropiată. */
export function nearestWeight(font: EditorFont, weight: number): number {
    return font.weights.reduce((best, w) => (Math.abs(w - weight) < Math.abs(best - weight) ? w : best), font.weights[0]);
}

const WEIGHT_NAMES: Record<number, string> = { 300: "Subțire", 400: "Normal", 500: "Mediu", 600: "Semi-bold", 700: "Bold", 800: "Extra-bold", 900: "Black" };
export function weightName(w: number): string {
    return WEIGHT_NAMES[w] ?? String(w);
}

function familyParam(font: EditorFont): string {
    const name = font.family.replace(/ /g, "+");
    if (font.weights.length === 1 && font.weights[0] === 400 && !font.italic) return `family=${name}`;
    if (font.italic) {
        const pairs = [...font.weights.map((w) => `0,${w}`), ...font.weights.map((w) => `1,${w}`)];
        return `family=${name}:ital,wght@${pairs.join(";")}`;
    }
    return `family=${name}:wght@${font.weights.join(";")}`;
}

/** Foaia de stil Google Fonts pentru toate fonturile (fișierele se descarcă doar când sunt folosite). */
export function googleFontsCssUrl(fonts: EditorFont[] = EDITOR_FONTS): string {
    return `https://fonts.googleapis.com/css2?${fonts.map(familyParam).join("&")}&display=swap`;
}

export function cssFontFamily(family: string): string {
    return `"${family}", ${fontByFamily(family).category === "serif" ? "serif" : fontByFamily(family).category === "script" ? "cursive" : "sans-serif"}`;
}
