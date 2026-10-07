// Randator de machete: pune "suprafata" produsului (grafica clientului la proportia produsului)
// in zona de tipar a unei scene: deformare in perspectiva (omografie), deplasare dupa falduri,
// umbrire multiplicativa + luciu, latura canvasului, umbra produsului pe fundal.
// Lucreaza pe tablouri RGBA simple, fara DOM: acelasi cod ruleaza in browser (ImageData)
// si in Node (scripts/mockups/contact-sheets.mts). Fara importuri (Node il incarca direct).

export type Pt = [number, number];

export type SceneGeometry = {
    w: number;
    h: number;
    quad: Pt[]; // TL, TR, BR, BL in pixeli
    aspect: number; // proportia estimata a zonei (latime / inaltime)
    edge?: { side: "top" | "right" | "bottom" | "left"; quad: Pt[] };
    /** culoarea mediana langa zona (tesatura tricoului etc.) */
    around?: [number, number, number];
    /** granulatia tesaturii care lipseste din harta de umbrire (abatere standard, 0..255) */
    grain?: number;
    /** fotografia are sub zona tesatura reala (varianta goala): se foloseste direct */
    empty?: boolean;
};

export type SceneLook = {
    surround: "material" | "fabric" | "background";
    material?: string;
    displace?: number;
    seeThrough?: number;
    aspect?: number;
    /** cat de inchisa e umbra produsului pe fundal (surround=background), implicit 0.3 */
    shadow?: number;
    /** cand produsul e mai mic decat zona: unde se lipeste (0 = stanga/sus, 0.5 = centru, 1 = dreapta/jos), ex. tinut in mana */
    anchor?: { u?: number; v?: number };
};

export type RGBAImage = { width: number; height: number; data: Uint8ClampedArray | Uint8Array };

export type PreparedScene = {
    geo: SceneGeometry;
    look: SceneLook;
    base: RGBAImage;
    fx: RGBAImage;
    disp: Float32Array | null; // dx, dy pe pixel
    shadeRef: number;
    bbox: [number, number, number, number];
};

export type ProductRect = { u0: number; u1: number; v0: number; v1: number };

type H = number[]; // 3x3, pe linii

/** omografia care duce patratul unitate (0,0)-(1,1) in patrulaterul q (TL, TR, BR, BL) */
export function squareToQuad(q: Pt[]): H {
    const [x0, y0] = q[0], [x1, y1] = q[1], [x2, y2] = q[2], [x3, y3] = q[3];
    const sx = x0 - x1 + x2 - x3;
    const sy = y0 - y1 + y2 - y3;
    if (Math.abs(sx) < 1e-9 && Math.abs(sy) < 1e-9) {
        return [x1 - x0, x3 - x0, x0, y1 - y0, y3 - y0, y0, 0, 0, 1];
    }
    const dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2;
    const den = dx1 * dy2 - dx2 * dy1;
    const g = (sx * dy2 - dx2 * sy) / den;
    const h = (dx1 * sy - sx * dy1) / den;
    return [x1 - x0 + g * x1, x3 - x0 + h * x3, x0, y1 - y0 + g * y1, y3 - y0 + h * y3, y0, g, h, 1];
}

export function invert3(m: H): H {
    const [a, b, c, d, e, f, g, h, i] = m;
    const A = e * i - f * h, B = -(d * i - f * g), C = d * h - e * g;
    const det = a * A + b * B + c * C;
    const s = 1 / det;
    return [
        A * s, -(b * i - c * h) * s, (b * f - c * e) * s,
        B * s, (a * i - c * g) * s, -(a * f - c * d) * s,
        C * s, -(a * h - b * g) * s, (a * e - b * d) * s,
    ];
}

export function sceneAspect(scene: { geo: SceneGeometry; look: SceneLook }): number {
    return scene.look.aspect || scene.geo.aspect;
}

/** unde sta produsul (proportia lui reala) in zona scenei, centrat */
export function productRect(sceneAsp: number, productAspect: number, anchor?: { u?: number; v?: number }): ProductRect {
    // proportia zonei e estimata din perspectiva (±10%): diferentele mici nu lasa margini false
    if (!(productAspect > 0) || Math.abs(Math.log(productAspect / sceneAsp)) <= 0.1) return { u0: 0, u1: 1, v0: 0, v1: 1 };
    if (productAspect >= sceneAsp) {
        const f = sceneAsp / productAspect;
        const v0 = (1 - f) * (anchor?.v ?? 0.5);
        return { u0: 0, u1: 1, v0, v1: v0 + f };
    }
    const f = productAspect / sceneAsp;
    const u0 = (1 - f) * (anchor?.u ?? 0.5);
    return { u0, u1: u0 + f, v0: 0, v1: 1 };
}

function quadSize(q: Pt[]) {
    const d = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    return { w: Math.max(d(q[0], q[1]), d(q[3], q[2])), h: Math.max(d(q[0], q[3]), d(q[1], q[2])) };
}

/** marimea recomandata (px) a suprafetei produsului (exact la proportia produsului) pentru scena data */
export function surfaceSize(geo: SceneGeometry, rect: ProductRect, productAspect: number, maxEdge = 2048): { w: number; h: number } {
    const qs = quadSize(geo.quad);
    const big = Math.max(qs.w * (rect.u1 - rect.u0), qs.h * (rect.v1 - rect.v0)) * 1.3;
    const a = productAspect > 0 ? productAspect : 1;
    let w = a >= 1 ? big : big * a;
    let h = a >= 1 ? big / a : big;
    const k = Math.min(1, maxEdge / Math.max(w, h));
    w = Math.max(16, Math.round(w * k));
    h = Math.max(16, Math.round(h * k));
    return { w, h };
}

function boxBlur(src: Float32Array, w: number, h: number, r: number): Float32Array {
    const tmp = new Float32Array(w * h);
    const out = new Float32Array(w * h);
    const n = 2 * r + 1;
    for (let y = 0; y < h; y++) {
        let acc = 0;
        const row = y * w;
        for (let k = -r; k <= r; k++) acc += src[row + Math.min(w - 1, Math.max(0, k))];
        for (let x = 0; x < w; x++) {
            tmp[row + x] = acc / n;
            acc += src[row + Math.min(w - 1, x + r + 1)] - src[row + Math.max(0, x - r)];
        }
    }
    for (let x = 0; x < w; x++) {
        let acc = 0;
        for (let k = -r; k <= r; k++) acc += tmp[Math.min(h - 1, Math.max(0, k)) * w + x];
        for (let y = 0; y < h; y++) {
            out[y * w + x] = acc / n;
            acc += tmp[Math.min(h - 1, y + r + 1) * w + x] - tmp[Math.max(0, y - r) * w + x];
        }
    }
    return out;
}

/** calcule facute o singura data pe scena (deplasare din falduri, cadru, nivel de umbrire) */
export function prepareScene(geo: SceneGeometry, look: SceneLook, base: RGBAImage, fx: RGBAImage): PreparedScene {
    const { width: w, height: h } = fx;
    const f = fx.data;
    let x0 = w, y0 = h, x1 = 0, y1 = 0;
    let shadeSum = 0, shadeN = 0;
    for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            if (f[i + 3] === 0) continue;
            if (x < x0) x0 = x;
            if (x > x1) x1 = x;
            if (y < y0) y0 = y;
            if (y > y1) y1 = y;
            if (f[i + 3] === 255 && f[i + 2] < 64) { shadeSum += f[i]; shadeN++; }
        }
    // nivelul mediu de lumina al zonei: tesatura de sub grafica se lumineaza relativ la el
    const shadeRef = Math.max(40, shadeN ? shadeSum / shadeN : 255) / 255;

    let disp: Float32Array | null = null;
    const strength = (look.displace || 0) * (Math.max(w, h) / 1200);
    if (strength > 0) {
        const s = new Float32Array(w * h);
        for (let i = 0; i < w * h; i++) s[i] = f[i * 4 + 3] ? f[i * 4] / 255 : shadeRef;
        const r = Math.max(3, Math.round(Math.max(w, h) / 110));
        const b = boxBlur(boxBlur(s, w, h, r), w, h, r);
        disp = new Float32Array(w * h * 2);
        const k = strength * 60;
        const lim = strength * 1.6;
        for (let y = 1; y < h - 1; y++)
            for (let x = 1; x < w - 1; x++) {
                const i = y * w + x;
                if (!f[i * 4 + 3]) continue;
                const gx = (b[i + 1] - b[i - 1]) / 2;
                const gy = (b[i + w] - b[i - w]) / 2;
                disp[i * 2] = Math.max(-lim, Math.min(lim, -gx * k));
                disp[i * 2 + 1] = Math.max(-lim, Math.min(lim, -gy * k));
            }
    }
    return { geo, look, base, fx, disp, shadeRef, bbox: [x0, y0, x1, y1] };
}

function hexToRgb(hex: string | undefined, fallback: [number, number, number]): [number, number, number] {
    if (!hex) return fallback;
    const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
    if (!m) return fallback;
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * Compune macheta. surface = produsul la proportia lui (RGBA, poate avea transparenta),
 * rect = unde sta in zona scenei (vezi productRect). Intoarce o imagine noua, marimea scenei.
 */
export function renderMockup(scene: PreparedScene, surface: RGBAImage, rect: ProductRect): RGBAImage {
    const { geo, look, base, fx, disp, shadeRef } = scene;
    const W = base.width, Hh = base.height;
    const out = new Uint8ClampedArray(base.data.length);
    out.set(base.data);
    const bd = base.data, fd = fx.data, sd = surface.data;
    const sw = surface.width, sh = surface.height;
    const sx = W / geo.w, sy = Hh / geo.h; // geometria e la 1200 px; imaginea poate fi alta marime
    const q = geo.quad.map(([x, y]) => [x * sx, y * sy] as Pt);
    const Hi = invert3(squareToQuad(q));
    const qs = quadSize(q);
    const ru = rect.u1 - rect.u0, rv = rect.v1 - rect.v0;
    const mat = hexToRgb(look.material, [255, 255, 255]);
    const seeThrough = look.seeThrough || 0;
    const fab = geo.around || mat;
    const grain = look.surround === "fabric" && !geo.empty ? (geo.grain || 0) * 1.6 : 0;
    // zgomot determinist (aceeasi macheta la fiecare randare)
    const noise = (x: number, y: number) => {
        let n = (x * 374761393 + y * 668265263) | 0;
        n = Math.imul(n ^ (n >>> 13), 1274126177);
        return ((n ^ (n >>> 16)) & 1023) / 1023 - 0.5;
    };
    const shadowScale = 0.014 * Math.hypot(qs.w, qs.h);
    const shadowK = look.shadow ?? 0.3;
    const shadowAt = (u: number, v: number) => {
        // umbra de contact a produsului pe fundal, putin deplasata in jos
        const du = Math.max(rect.u0 - u, 0, u - rect.u1) * qs.w;
        const dv = Math.max(rect.v0 - (v - 0.006), 0, v - 0.006 - rect.v1) * qs.h;
        const d = Math.hypot(du, dv);
        const inside = u >= rect.u0 && u <= rect.u1 && v >= rect.v0 && v <= rect.v1;
        return inside ? 1 : 1 - shadowK * Math.exp(-d / shadowScale);
    };

    let He: H | null = null;
    const edge = geo.edge;
    if (edge) He = invert3(squareToQuad(edge.quad.map(([x, y]) => [x * sx, y * sy] as Pt)));
    const touches = edge
        ? edge.side === "right" ? rect.u1 > 0.999 : edge.side === "left" ? rect.u0 < 0.001 : edge.side === "top" ? rect.v0 < 0.001 : rect.v1 > 0.999
        : false;

    // esantionare biliniara cu margine transparenta (margini netede), culoare premultiplicata
    const px = [0, 0, 0, 0];
    const sample = (u: number, v: number) => {
        const fx_ = u * sw - 0.5, fy_ = v * sh - 0.5;
        const x0 = Math.floor(fx_), y0 = Math.floor(fy_);
        const ax = fx_ - x0, ay = fy_ - y0;
        px[0] = px[1] = px[2] = px[3] = 0;
        for (let j = 0; j < 2; j++) {
            const yy = y0 + j;
            if (yy < 0 || yy >= sh) continue;
            const wy = j ? ay : 1 - ay;
            for (let i = 0; i < 2; i++) {
                const xx = x0 + i;
                if (xx < 0 || xx >= sw) continue;
                const wgt = wy * (i ? ax : 1 - ax);
                const o = (yy * sw + xx) * 4;
                const a = (sd[o + 3] / 255) * wgt;
                px[0] += sd[o] * a;
                px[1] += sd[o + 1] * a;
                px[2] += sd[o + 2] * a;
                px[3] += a;
            }
        }
    };

    const fw = fx.width, fh = fx.height;
    const kx = fw / W, ky = fh / Hh;
    const [bx0, by0, bx1, by1] = scene.bbox;
    const X0 = Math.max(0, Math.floor(bx0 / kx) - 1), X1 = Math.min(W - 1, Math.ceil(bx1 / kx) + 1);
    const Y0 = Math.max(0, Math.floor(by0 / ky) - 1), Y1 = Math.min(Hh - 1, Math.ceil(by1 / ky) + 1);

    for (let y = Y0; y <= Y1; y++) {
        for (let x = X0; x <= X1; x++) {
            const fi = (Math.min(fh - 1, (y * ky) | 0) * fw + Math.min(fw - 1, (x * kx) | 0));
            const cov = fd[fi * 4 + 3] / 255;
            if (cov === 0) continue;
            const o = (y * W + x) * 4;
            const shade = fd[fi * 4] / 255;
            const gloss = fd[fi * 4 + 1] / 255;
            const flag = fd[fi * 4 + 2];
            const isEdge = flag > 192;
            const isRing = flag > 64 && flag <= 192;
            const b0 = bd[o], b1 = bd[o + 1], b2 = bd[o + 2];
            let r: number, g: number, b: number;

            if (isRing) {
                // fundal reconstruit langa produs: doar umbra produsului
                if (grain > 0) {
                    const nz = noise(x, y) * grain;
                    r = b0 + nz; g = b1 + nz; b = b2 + nz;
                    out[o] = b0 + (r - b0) * cov; out[o + 1] = b1 + (g - b1) * cov; out[o + 2] = b2 + (b - b2) * cov;
                    continue;
                }
                if (look.surround !== "background" || shadowK <= 0) continue;
                const X = x + 0.5, Y = y + 0.5;
                const w3 = Hi[6] * X + Hi[7] * Y + Hi[8];
                const k = shadowAt((Hi[0] * X + Hi[1] * Y + Hi[2]) / w3, (Hi[3] * X + Hi[4] * Y + Hi[5]) / w3);
                r = b0 * k; g = b1 * k; b = b2 * k;
            } else if (isEdge && He) {
                // latura canvasului: continuarea graficii (oglindita) pe grosimea ramei, mai intunecata
                const X = x + 0.5, Y = y + 0.5;
                const w3 = He[6] * X + He[7] * Y + He[8];
                const s = (He[0] * X + He[1] * Y + He[2]) / w3;
                const t = (He[3] * X + He[4] * Y + He[5]) / w3;
                let su = 0, sv = 0, along = 0;
                const side = edge!.side;
                if (side === "right" || side === "left") {
                    along = t;
                    const depth = side === "right" ? s : 1 - s;
                    sv = (along - rect.v0) / rv;
                    su = side === "right" ? 1 - depth * 0.05 : depth * 0.05;
                } else {
                    along = s;
                    const depth = side === "bottom" ? t : 1 - t;
                    su = (along - rect.u0) / ru;
                    sv = side === "bottom" ? 1 - depth * 0.05 : depth * 0.05;
                }
                if (touches && along >= (side === "right" || side === "left" ? rect.v0 : rect.u0) - 0.002 && along <= (side === "right" || side === "left" ? rect.v1 : rect.u1) + 0.002) {
                    sample(Math.min(0.9999, Math.max(0.0001, su)), Math.min(0.9999, Math.max(0.0001, sv)));
                    const a = px[3];
                    const k = shade * 0.92;
                    r = (px[0] + (1 - a) * 245) * k;
                    g = (px[1] + (1 - a) * 245) * k;
                    b = (px[2] + (1 - a) * 245) * k;
                } else {
                    r = b0; g = b1; b = b2;
                }
            } else {
                let X = x + 0.5, Y = y + 0.5;
                if (disp) {
                    X += disp[fi * 2] / kx;
                    Y += disp[fi * 2 + 1] / ky;
                }
                const w3 = Hi[6] * X + Hi[7] * Y + Hi[8];
                const u = (Hi[0] * X + Hi[1] * Y + Hi[2]) / w3;
                const v = (Hi[3] * X + Hi[4] * Y + Hi[5]) / w3;
                sample((u - rect.u0) / ru, (v - rect.v0) / rv);
                const a = px[3];
                // ce e sub grafica (sau in jurul produsului)
                let ur: number, ug: number, ub: number;
                if (look.surround === "material") {
                    ur = mat[0] * shade; ug = mat[1] * shade; ub = mat[2] * shade;
                    ur = 255 - (255 - ur) * (1 - gloss); ug = 255 - (255 - ug) * (1 - gloss); ub = 255 - (255 - ub) * (1 - gloss);
                } else if (look.surround === "fabric") {
                    // tesatura: culoarea din jurul zonei, cu faldurile si textura din harta de umbrire
                    const k = Math.min(1.08, shade / shadeRef);
                    const nz = noise(x, y) * grain;
                    if (geo.empty) {
                        ur = b0; ug = b1; ub = b2;
                    } else {
                        ur = fab[0] * k + nz; ug = fab[1] * k + nz; ub = fab[2] * k + nz;
                    }
                } else {
                    const k = shadowK > 0 ? shadowAt(u, v) : 1;
                    ur = b0 * k; ug = b1 * k; ub = b2 * k;
                }
                // grafica, luminata ca suprafata din fotografie
                let dr = px[0] * shade, dg = px[1] * shade, db = px[2] * shade;
                dr = dr + (255 * a - dr) * gloss; dg = dg + (255 * a - dg) * gloss; db = db + (255 * a - db) * gloss;
                if (grain > 0) {
                    const nz = noise(x, y) * grain * 0.6 * a;
                    dr += nz; dg += nz; db += nz;
                }
                r = dr + ur * (1 - a);
                g = dg + ug * (1 - a);
                b = db + ub * (1 - a);
                if (seeThrough > 0) {
                    r = r * (1 - seeThrough) + b0 * seeThrough;
                    g = g * (1 - seeThrough) + b1 * seeThrough;
                    b = b * (1 - seeThrough) + b2 * seeThrough;
                }
            }
            out[o] = b0 + (r - b0) * cov;
            out[o + 1] = b1 + (g - b1) * cov;
            out[o + 2] = b2 + (b - b2) * cov;
            out[o + 3] = 255;
        }
    }
    return { width: W, height: Hh, data: out };
}
