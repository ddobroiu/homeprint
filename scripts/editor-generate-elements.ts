// Generează lib/editor/elements.generated.json pentru editorul online (/editor).
//
// - Elementele grafice (săgeți, forme, rame, linii, decor) sunt desenele NOASTRE din PostingClips
//   (aplicatii/postingclips/src/lib/editor/elements.ts, geometrie proprie, fără artă terță),
//   transformate în SVG static recolorabil: {{c}} = culoarea principală, {{c2}} = a doua culoare.
//   Elementele cu text (butoanele CTA) nu se preiau: în editorul de print textul e element separat.
// - Iconițele vin din lucide-react (licență ISC, deja dependență a proiectului).
//
// Rulare (din shopprint-main):  npx tsx scripts/editor-generate-elements.ts
// Necesită PostingClips alături (../../aplicatii/postingclips); rezultatul JSON e comis.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const PC = path.resolve(ROOT, "../../aplicatii/postingclips/src/lib/editor/elements.ts");
const OUT = path.join(ROOT, "lib/editor/elements.generated.json");

const C1 = "#ff00f1";
const C2 = "#ff00f2";

type Out = { id: string; group: string; label: string; vw: number; vh: number; svg: string; c: string; c2?: string; keepRatio: boolean; stroke?: boolean };

const LABELS: Record<string, string> = {
    arrowStraight: "Săgeată", arrowThin: "Săgeată subțire", arrowThick: "Săgeată plină", arrowCurved: "Săgeată curbă",
    arrowCurvedDown: "Săgeată curbă jos", arrowHand: "Săgeată desenată", arrowLoop: "Săgeată buclă", arrowCircular: "Săgeată circulară",
    arrowDouble: "Săgeată dublă", arrowZigzag: "Săgeată zigzag", arrowElbow: "Săgeată cot", arrowUturn: "Săgeată întoarsă",
    arrowDashed: "Săgeată punctată", circle: "Cerc contur", circleFill: "Cerc", rect: "Dreptunghi contur", rectFill: "Dreptunghi",
    roundRect: "Dreptunghi rotunjit", star: "Stea", starOutline: "Stea contur", line: "Linie", marker: "Marker", underline: "Subliniere",
    frame: "Ramă", frameDashed: "Ramă punctată", frameRounded: "Ramă rotunjită", brackets: "Colțare",
    lineSolid: "Linie", lineDashed: "Linie întreruptă", lineDotted: "Linie punctată", lineDouble: "Linie dublă", lineWave: "Linie val",
    bolt: "Fulger", cart: "Coș", check: "Bifă", checkCircle: "Bifă în cerc", cross: "X", heart: "Inimă", mail: "Plic", sparkle: "Sclipire",
};
const GROUPS: Record<string, string> = { arrows: "sageti", shapes: "forme", frames: "rame", lines: "linii", decor: "decor" };

const ICONS: Array<[string, string]> = [
    ["phone", "Telefon"], ["mail", "Email"], ["map-pin", "Locație"], ["globe", "Site"], ["clock", "Program"], ["calendar", "Dată"],
    ["star", "Stea"], ["heart", "Inimă"], ["check", "Bifă"], ["circle-check", "Bifă cerc"], ["truck", "Livrare"], ["shopping-cart", "Coș"],
    ["shopping-bag", "Sacoșă"], ["tag", "Etichetă"], ["percent", "Procent"], ["gift", "Cadou"], ["house", "Casă"], ["key-round", "Cheie"],
    ["wrench", "Service"], ["hammer", "Construcții"], ["scissors", "Foarfecă"], ["coffee", "Cafea"], ["utensils", "Restaurant"],
    ["pizza", "Pizza"], ["car", "Mașină"], ["user", "Persoană"], ["users", "Echipă"], ["briefcase", "Job"], ["award", "Premiu"],
    ["sparkles", "Sclipiri"], ["megaphone", "Anunț"], ["arrow-right", "Săgeată"], ["wifi", "Wi-Fi"], ["parking-meter", "Parcare"],
    ["baby", "Copii"], ["paw-print", "Animale"], ["leaf", "Natural"], ["sun", "Soare"], ["snowflake", "Iarnă"], ["flame", "Hot"],
    ["zap", "Rapid"], ["thumbs-up", "Like"], ["smile", "Zâmbet"], ["music", "Muzică"], ["camera", "Foto"], ["graduation-cap", "Școală"],
    ["stethoscope", "Medical"], ["dumbbell", "Sport"], ["shirt", "Haine"], ["cake", "Tort"], ["party-popper", "Petrecere"],
    ["badge-percent", "Reducere"], ["ban", "Interzis"], ["triangle-alert", "Atenție"], ["info", "Info"], ["qr-code", "QR"],
    ["credit-card", "Card"], ["shield-check", "Garanție"], ["accessibility", "Acces"], ["dog", "Câine"],
];

function attrsToString(attrs: Record<string, unknown>): string {
    return Object.entries(attrs)
        .filter(([k]) => k !== "key")
        .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}="${String(v)}"`)
        .join(" ");
}

async function main() {
    const out: Out[] = [];

    // 1. Elementele PostingClips
    // elements.ts importă text-svg doar pentru butoanele cu text (nepreluate) -> stub
    const src = fs.readFileSync(PC, "utf8")
        .replace(/import \{ buildTextSvg \} from "@\/lib\/editor\/text-svg";/, "const buildTextSvg = (..._a: unknown[]): never => { throw new Error(\"text\"); };")
        .replace(/import type \{ TextOverlay \} from "@\/lib\/editor\/schema";/, "type TextOverlay = any;");
    const tmp = path.join(ROOT, "scripts/.editor-elements.tmp.ts");
    fs.writeFileSync(tmp, src);
    const mod = await import(pathToFileURL(tmp).href).finally(() => fs.rmSync(tmp, { force: true }));
    for (const kind of mod.ELEMENT_KINDS as Array<{ id: string; category: string; text?: boolean; color: string; color2: string }>) {
        if (kind.text || !GROUPS[kind.category]) continue;
        const res = mod.buildElementSvg({ id: kind.id, kind: kind.id, size: 100, color: C1, color2: C2 }, null, 1, `e-${kind.id}`) as { svg: string; width: number; height: number } | null;
        if (!res) continue;
        const inner = res.svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
        if (inner.includes("<filter") || inner.includes("clip-path")) continue;
        const svg = inner.split(C1).join("{{c}}").split(C2).join("{{c2}}");
        const isLine = kind.category === "lines" || kind.category === "arrows";
        // Cutie strânsă în jurul desenului (buildElementSvg lasă loc pentru umbră / animație)
        const drawing = (kind as unknown as { draw: (c: object) => { w: number; h: number }; radius?: number }).draw({ sw: 1, r: (kind as { radius?: number }).radius ?? 0, tw: 0, th: 0 });
        const widths = [...svg.matchAll(/stroke-width="([\d.]+)"/g)].map((m) => Number(m[1]));
        const pad = Math.max(0.5, ...widths) / 2 + 0.5;
        const vx = res.width / 2 - drawing.w / 2 - pad;
        const vy = res.height / 2 - drawing.h / 2 - pad;
        const vw = drawing.w + pad * 2;
        const vh = drawing.h + pad * 2;
        out.push({
            id: `pc-${kind.id}`,
            group: GROUPS[kind.category],
            label: LABELS[kind.id] ?? kind.id,
            vw: Math.round(vw * 100) / 100,
            vh: Math.round(vh * 100) / 100,
            svg: `<g transform="translate(${(-vx).toFixed(2)} ${(-vy).toFixed(2)})">${svg}</g>`,
            c: kind.color.toLowerCase() === "#ffffff" ? "#111111" : kind.color,
            c2: svg.includes("{{c2}}") ? kind.color2 : undefined,
            keepRatio: !isLine,
            stroke: svg.includes("stroke-width"),
        });
    }

    // 2. Iconițe lucide (ISC)
    const lucideDir = path.join(ROOT, "node_modules/lucide-react/dist/esm/icons");
    for (const [name, label] of ICONS) {
        const file = path.join(lucideDir, `${name}.js`);
        if (!fs.existsSync(file)) {
            console.warn("lipsește iconița", name);
            continue;
        }
        const icon = await import(pathToFileURL(file).href);
        const nodes = icon.__iconNode as Array<[string, Record<string, unknown>]>;
        const body = nodes.map(([tag, attrs]) => `<${tag} ${attrsToString(attrs)}/>`).join("");
        out.push({
            id: `ic-${name}`,
            group: "iconite",
            label,
            vw: 24,
            vh: 24,
            svg: `<g fill="none" stroke="{{c}}" stroke-width="{{sw}}" stroke-linecap="round" stroke-linejoin="round">${body}</g>`,
            c: "#075746",
            keepRatio: true,
            stroke: true,
        });
    }

    fs.writeFileSync(OUT, JSON.stringify(out));
    const groups = out.reduce<Record<string, number>>((a, e) => ((a[e.group] = (a[e.group] ?? 0) + 1), a), {});
    console.log(`${out.length} elemente ->`, OUT, groups);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
