// Constructori scurți pentru șabloane și presetări (coordonate în mm, în spațiul de bază al șablonului).
import { uid } from "./doc";
import type { ImageEl, Paint, ShapeEl, SvgEl, TextEl } from "./types";

export const solid = (color: string): Paint => ({ kind: "solid", color });
export const linear = (angle: number, ...colors: string[]): Paint => ({
    kind: "linear",
    angle,
    stops: colors.map((color, i) => ({ offset: colors.length === 1 ? 0 : i / (colors.length - 1), color })),
});

type TextOpts = Partial<Omit<TextEl, "type" | "id" | "text">>;
export function T(text: string, x: number, y: number, w: number, size: number, o: TextOpts = {}): TextEl {
    return {
        id: uid(),
        type: "text",
        text,
        x,
        y,
        w,
        h: size * 1.2,
        fontSize: size,
        fontFamily: "Montserrat",
        fontWeight: 800,
        lineHeight: 1.12,
        letterSpacing: 0,
        align: "center",
        fill: solid("#111111"),
        rotation: 0,
        opacity: 1,
        ...o,
    };
}

type ShapeOpts = Partial<Omit<ShapeEl, "type" | "id" | "shape">>;
export function S(shape: ShapeEl["shape"], x: number, y: number, w: number, h: number, fill: Paint | string | null, o: ShapeOpts = {}): ShapeEl {
    return {
        id: uid(),
        type: "shape",
        shape,
        x,
        y,
        w,
        h,
        rotation: 0,
        opacity: 1,
        fill: typeof fill === "string" ? solid(fill) : fill,
        ...o,
    };
}

export function V(ref: string, x: number, y: number, w: number, h: number, color: string, o: Partial<Omit<SvgEl, "type" | "id" | "ref">> = {}): SvgEl {
    return { id: uid(), type: "svg", ref, x, y, w, h, rotation: 0, opacity: 1, color, ...o };
}

export function P(x: number, y: number, w: number, h: number, o: Partial<Omit<ImageEl, "type" | "id">> = {}): ImageEl {
    return { id: uid(), type: "image", src: "", iw: 1600, ih: 1200, placeholder: true, x, y, w, h, rotation: 0, opacity: 1, name: "Poza ta", ...o };
}
