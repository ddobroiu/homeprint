// Brandul site-ului în editorul online (/editor). Editorul (components/PrintEditor/*, lib/editor/*)
// e același pe cele 6 site-uri de print; diferă doar acest fișier, lib/editor/templates/site.ts
// și components/PrintEditor/theme.css (culorile, vezi lib/editor/README-THEME.md).

export const EDITOR_BRAND = {
    name: "HomePrint",
    href: "/",
    /** prefixul fișierelor exportate (homeprint-banner-200x100cm.pdf) */
    filePrefix: "homeprint",
    /** culoarea brandului (selecția pe planșă, forma nouă), aceeași ca --pe-brand din theme.css */
    color: "#87573f",
    /** fundalul paginii până se încarcă editorul */
    bg: "#f8f5ef",
};

/** Ordinea produselor pe ecranul de start: focusul site-ului primul, restul după lib/editor/products.ts. */
export const EDITOR_PRODUCT_ORDER: string[] = ["tapet", "canvas", "autocolante", "afise", "window-graphics", "plexiglass", "pvc-forex"];

/** Poze pe ecranul de start pentru produsele a căror poză din registru lipsește pe acest site. */
export const EDITOR_IMAGE_OVERRIDES: Record<string, string> = {};

export const EDITOR_META = {
    title: "Editor online pentru fototapet, canvas și postere – design gratuit | HomePrint",
    description: "Creează gratuit designul pentru fototapet, tablou canvas, poster sau autocolant decorativ: șabloane, colaje, 44 de fonturi cu diacritice, la dimensiunea reală. Descarci PDF-ul de tipar sau comanzi direct.",
};
