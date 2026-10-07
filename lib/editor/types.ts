// Modelul de date al editorului online de print (/editor).
// Toate coordonatele sunt în MILIMETRI, cu originea în colțul stânga-sus al formatului final
// (zona de tăiere). Bleed-ul se întinde de la -bleedMm la latura + bleedMm.

export type GradientStop = { offset: number; color: string };
export type Paint =
    | { kind: "solid"; color: string }
    | { kind: "linear"; angle: number; stops: GradientStop[] }
    | { kind: "radial"; stops: GradientStop[] };

export type PatternKind = "dots" | "stripes" | "grid" | "checker" | "diagonal" | "waves" | "zigzag";

export type Background =
    | Paint
    | { kind: "pattern"; pattern: PatternKind; fg: string; bg: string; sizeMm: number }
    | { kind: "image"; src: string; iw: number; ih: number };

export type Shadow = { color: string; blur: number; dx: number; dy: number; opacity: number };

type Base = {
    id: string;
    name?: string;
    x: number;
    y: number;
    w: number;
    h: number;
    rotation: number;
    opacity: number;
    locked?: boolean;
    hidden?: boolean;
    groupId?: string;
    flipX?: boolean;
    flipY?: boolean;
    /** doar în șabloane: cum se adaptează la alt format */
    tpl?: { stretchX?: boolean; stretchY?: boolean; anchorX?: "left" | "right"; anchorY?: "top" | "bottom" };
};

export type TextEl = Base & {
    type: "text";
    text: string;
    fontFamily: string;
    fontWeight: number;
    italic?: boolean;
    /** mărimea fontului în mm (în interfață se afișează în pt) */
    fontSize: number;
    lineHeight: number;
    /** spațiere între litere, în miimi de em (ca în Canva) */
    letterSpacing: number;
    align: "left" | "center" | "right";
    uppercase?: boolean;
    underline?: boolean;
    /** text tăiat cu o linie */
    strike?: boolean;
    /** listă: fiecare paragraf primește „• ” sau „1. ” */
    list?: "bullet" | "number";
    fill: Paint;
    stroke?: { color: string; width: number } | null; // width în % din font
    shadow?: Shadow | null;
    /** -100..100: text pe arc */
    curve?: number;
    /** fundal (evidențiere) în spatele textului */
    bg?: { color: string; padding: number; radius: number } | null;
    /** micșorează automat fontul ca textul să încapă în casetă */
    autoFit?: boolean;
};

export type ShapeKind = "rect" | "ellipse" | "triangle" | "star" | "polygon" | "line";

export type ShapeEl = Base & {
    type: "shape";
    shape: ShapeKind;
    fill: Paint | null;
    stroke?: { color: string; width: number; dash?: "solid" | "dash" | "dot" } | null;
    radius?: number; // mm, rect
    points?: number; // star / polygon
    shadow?: Shadow | null;
};

export type SvgEl = Base & {
    type: "svg";
    /** id din biblioteca de elemente */
    ref: string;
    color: string;
    color2?: string;
    strokeScale?: number;
    shadow?: Shadow | null;
};

export type ImageEl = Base & {
    type: "image";
    /** URL (proxy / public) sau "asset:<id>" pentru pozele încărcate (păstrate în IndexedDB) */
    src: string;
    iw: number;
    ih: number;
    /** zoom în casetă (>=1) și poziția decupajului (-1..1) */
    zoom?: number;
    ox?: number;
    oy?: number;
    radius?: number; // mm
    mask?: "none" | "circle";
    filters?: { brightness?: number; contrast?: number; saturate?: number; grayscale?: number; blur?: number };
    border?: { color: string; width: number } | null;
    shadow?: Shadow | null;
    /** casetă goală dintr-un șablon („Pune poza ta aici”) */
    placeholder?: boolean;
    credit?: string;
};

export type El = TextEl | ShapeEl | SvgEl | ImageEl;

export type EditorDoc = {
    version: 1;
    productId: string;
    sizeKey?: string;
    /** formatul final (fără bleed), mm */
    wMm: number;
    hMm: number;
    bleedMm: number;
    safeMm: number;
    background: Background;
    elements: El[];
    name?: string;
    templateId?: string;
};

export type EditorSize = {
    key: string;
    label: string;
    wMm: number;
    hMm: number;
    /** parametrii adresei configuratorului pentru această dimensiune */
    params: Record<string, string>;
};

export type EditorProduct = {
    id: string;
    label: string;
    /** pagina configuratorului (fără parametri) */
    path: string;
    bleedMm: number;
    safeMm: number;
    /** DPI recomandat la scară 1:1 */
    dpi: number;
    sizes: EditorSize[];
    /** dimensiune liberă (cm), dacă produsul o acceptă */
    custom: { minCm: number; maxCm: number } | null;
    note?: string;
    icon: string;
    /** poza produsului (din registrul configuratoarelor), pentru ecranul de start */
    image?: string;
};
