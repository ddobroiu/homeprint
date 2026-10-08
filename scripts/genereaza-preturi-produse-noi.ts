/**
 * Prețurile produselor noi (calendare, steaguri beachflag, X-banner, panou stradal) din costurile de producție.
 *
 * Regula proprietarului: prețul nostru = DUBLUL costului.
 *   preț fără TVA = 2 × cost fără TVA;   preț afișat pe site = preț fără TVA × 1,21 (ca la celelalte produse).
 *
 * Costurile stau în data/productie/costuri-produse-noi.json (sursă, link, dată, bază TVA). Dacă există
 * _deploy/printcenter-preturi/preturi.json (prețurile din comenzile noastre reale) și are o intrare cu același
 * nume PrintCenter (pcName), costul din comenzi are prioritate față de prețul de pe site.
 *
 * Scrie lib/produseNoi/preturi.generated.ts (doar prețurile de vânzare, fără costuri) și afișează tabelul.
 *
 * Rulare: npx tsx scripts/genereaza-preturi-produse-noi.ts            (scrie fișierul)
 *         npx tsx scripts/genereaza-preturi-produse-noi.ts --check    (doar verifică dacă fișierul e la zi)
 */
import fs from "fs";
import path from "path";

type Tier = { min: number; cost: number };
type CostItem = {
    id: string;
    group: string;
    pcName: string;
    unit: "buc" | "m2";
    currency: "RON" | "EUR";
    tiers: Tier[];
    source: string;
    url?: string;
    observedAt?: string;
    vatBasis?: string;
    note?: string;
};
type CostFile = { markup: number; vatRate: number; eurRon: number; items: CostItem[] };

const root = process.cwd();
const COSTS = path.join(root, "data", "productie", "costuri-produse-noi.json");
const OUT = path.join(root, "lib", "produseNoi", "preturi.generated.ts");
const ORDERS = path.resolve(root, "..", "..", "_deploy", "printcenter-preturi", "preturi.json");

const norm = (s: unknown) =>
    String(s ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

/** Intrările din comenzi (formatul lui lib/productie/costModel.ts: product, material, unit, currency, tiers[{from,to,price}]). */
function orderPrices(): Map<string, { tiers: Tier[]; currency: "RON" | "EUR"; source: string; observedAt?: string }> {
    const out = new Map<string, { tiers: Tier[]; currency: "RON" | "EUR"; source: string; observedAt?: string }>();
    if (!fs.existsSync(ORDERS)) return out;
    try {
        const raw = JSON.parse(fs.readFileSync(ORDERS, "utf8"));
        const entries: any[] = Array.isArray(raw) ? raw : Array.isArray(raw?.entries) ? raw.entries : [];
        for (const e of entries) {
            // doar prețurile din comenzi / facturi; lista publică PrintCenter e deja sursa din costuri-produse-noi.json
            if (/lista|public/i.test(String(e?.source ?? ""))) continue;
            const tiers: Tier[] = (Array.isArray(e?.tiers) ? e.tiers : [])
                .map((t: any) => ({ min: Number(t.from ?? t.min ?? 0), cost: Number(t.price ?? t.cost) }))
                .filter((t: Tier) => Number.isFinite(t.min) && Number.isFinite(t.cost) && t.cost > 0);
            if (!tiers.length) continue;
            const names = [e.product, [e.product, e.material].filter(Boolean).join(" "), e.pcName, e.name].map(norm).filter(Boolean);
            for (const n of names) out.set(n, { tiers, currency: e.currency === "EUR" ? "EUR" : "RON", source: String(e.source || "comenzi"), observedAt: e.observedAt });
        }
    } catch (err) {
        console.warn(`atenție: nu pot citi ${ORDERS}: ${(err as Error).message}`);
    }
    return out;
}

const round2 = (n: number) => Math.round(n * 100) / 100;
const round4 = (n: number) => Math.round(n * 10000) / 10000;

function main() {
    const data = JSON.parse(fs.readFileSync(COSTS, "utf8")) as CostFile;
    const fromOrders = orderPrices();
    const markup = data.markup;
    const vat = 1 + data.vatRate / 100;

    const table: Record<string, { unit: "buc" | "m2"; tiers: { min: number; price: number }[] }> = {};
    const rows: string[] = [];
    for (const it of data.items) {
        const ord = fromOrders.get(norm(it.pcName));
        const tiers = ord ? ord.tiers : it.tiers;
        const currency = ord ? ord.currency : it.currency;
        const source = ord ? `comenzi (${ord.source})` : it.source;
        const fx = currency === "EUR" ? data.eurRon : 1;
        const sorted = [...tiers].sort((a, b) => a.min - b.min);
        // buc: prețul pe bucată, rotunjit la bani; m2: tariful pe m², păstrat cu 4 zecimale (se înmulțește cu suprafața)
        const r = it.unit === "m2" ? round4 : round2;
        table[it.id] = { unit: it.unit, tiers: sorted.map((t) => ({ min: t.min, price: r(t.cost * fx * markup * vat) })) };
        const t0 = sorted[0];
        const costRon = t0.cost * fx;
        rows.push(
            `| ${it.id} | ${it.pcName} | ${t0.cost.toFixed(2)} ${currency === "EUR" ? "€" : "lei"}${it.unit === "m2" ? "/m²" : ""}${currency === "EUR" ? ` (${costRon.toFixed(2)} lei)` : ""} | ${source} | ${(costRon * markup).toFixed(2)} | ${(costRon * markup * vat).toFixed(2)} |`
        );
    }

    const body =
        `// GENERAT de scripts/genereaza-preturi-produse-noi.ts din data/productie/costuri-produse-noi.json — nu edita de mână.\n` +
        `// Prețurile de vânzare afișate pe site (lei, preț final = 2 × cost fără TVA × ${vat.toFixed(2)}), pe praguri.\n` +
        `// unit "buc": preț pe bucată de la cantitatea min; unit "m2": tarif pe m² de la suprafața totală min.\n` +
        `export type PretProdusNou = { unit: "buc" | "m2"; tiers: ReadonlyArray<{ min: number; price: number }> };\n\n` +
        `export const PRETURI_PRODUSE_NOI: Record<string, PretProdusNou> = {\n` +
        Object.entries(table)
            .map(([id, v]) => `    ${JSON.stringify(id)}: { unit: ${JSON.stringify(v.unit)}, tiers: [${v.tiers.map((t) => `{ min: ${t.min}, price: ${t.price} }`).join(", ")}] },`)
            .join("\n") +
        `\n};\n`;

    if (process.argv.includes("--check")) {
        const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
        if (cur !== body) {
            console.error("lib/produseNoi/preturi.generated.ts NU e la zi: rulează npx tsx scripts/genereaza-preturi-produse-noi.ts");
            process.exit(1);
        }
        console.log("preturi.generated.ts e la zi.");
    } else {
        fs.writeFileSync(OUT, body);
        console.log(`scris ${path.relative(root, OUT)} (${Object.keys(table).length} poziții)${fromOrders.size ? `; intrări din comenzi în preturi.json: ${fromOrders.size}` : "; preturi.json nu are prețuri din comenzi (doar lista publică), am folosit prețurile de pe site"}`);
    }
    console.log("\n| id | produs PrintCenter | cost (1 buc / primul prag) | sursă | preț nostru fără TVA | preț afișat (cu TVA) |");
    console.log("|---|---|---|---|---|---|");
    for (const r of rows) console.log(r);
}

main();
