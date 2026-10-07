/**
 * Verificarea feedului Google Merchant (XML /api/products/feed + CSV /feed.csv), fără server pornit.
 *
 * Pică (exit 1) când:
 *  - prețul din feed ≠ prețul pe care îl arată pagina (lib/merchant/pagePrice.ts) sau pagina nu are preț cunoscut;
 *  - link-ul nu e o rută a site-ului; id duplicat / > 50 caractere; titlu lipsă sau > 150 caractere;
 *  - poza e logo-ul, lipsește din public/ sau nu are extensia unei imagini;
 *  - CSV-ul are alte articole / prețuri decât XML-ul.
 *
 * Opțional, cu serverul pornit: --live=http://localhost:3000 deschide câteva pagini din fiecare tip
 * și caută în HTML prețul din feed (verifică și calculul paginii, nu doar regula din lib/merchant).
 *
 * Rulare: npm run check:merchant   (sau: npx tsx scripts/check-merchant-feed.ts [--live=URL] [--per-group=3])
 */
import fs from "fs";
import path from "path";

process.env.DATABASE_URL = "postgresql://none:none@127.0.0.1:9/none";

const root = process.cwd();
const appDir = path.join(root, "app");
const publicDir = path.join(root, "public");
const errors: string[] = [];
const warnings: string[] = [];
const arg = (name: string) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");

function walkPages(dir: string, out: string[] = []): string[] {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
            if (e.name === "api" || e.name.startsWith("_") || e.name === "admin") continue;
            walkPages(full, out);
        } else if (/^page\.(tsx|ts|jsx|js)$/.test(e.name)) {
            out.push(path.relative(appDir, dir).split(path.sep).join("/"));
        }
    }
    return out;
}
const routes = walkPages(appDir).map((d) => {
    const segs = d.split("/").filter((s) => s && !/^\(.*\)$/.test(s));
    const re = segs
        .map((s) => (/^\[\[?\.\.\..+\]?\]$/.test(s) ? ".+" : /^\[.+\]$/.test(s) ? "[^/]+" : s.replace(/[.*+?^${}()|\\]/g, "\\$&")))
        .join("/");
    return new RegExp(`^/${re}$`);
});
const isRoute = (p: string) => p === "/" || routes.some((r) => r.test(p));

type Item = { id: string; title: string; link: string; image: string; price: number };
const tag = (block: string, name: string) => {
    const m = block.match(new RegExp(`<g:${name}>([\\s\\S]*?)</g:${name}>`));
    return m ? m[1].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&") : "";
};

function parseCsv(text: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [], cell = "", q = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (q) {
            if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
            else if (c === '"') q = false;
            else cell += c;
        } else if (c === '"') q = true;
        else if (c === ",") { row.push(cell); cell = ""; }
        else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
        else cell += c;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows;
}

async function main() {
    console.error = () => {};
    const { GET: xmlGet } = await import("../app/api/products/feed/route");
    const { GET: csvGet } = await import("../app/feed.csv/route");
    const { merchantPagePrice } = await import("../lib/merchant/pagePrice");
    const { merchantFeedRows } = await import("../lib/merchant/feedRows");

    const xmlRes: Response = await xmlGet();
    if (xmlRes.status !== 200) throw new Error(`feed XML: HTTP ${xmlRes.status}`);
    const xml = await xmlRes.text();
    if (!xml.includes('xmlns:g="http://base.google.com/ns/1.0"')) errors.push("XML fără namespace-ul g:");
    if (/&(?!(amp|lt|gt|quot|apos|#\d+);)/.test(xml)) errors.push("XML cu & neescapat");
    const items: Item[] = (xml.match(/<item>[\s\S]*?<\/item>/g) || []).map((b) => ({
        id: tag(b, "id"),
        title: tag(b, "title"),
        link: tag(b, "link"),
        image: tag(b, "image_link"),
        price: Number(tag(b, "price").replace(/\s*RON$/, "")),
    }));

    const ids = new Set<string>();
    let priceOk = 0;
    for (const it of items) {
        const t = it.id || "(fără id)";
        if (!it.id) errors.push(`articol fără id: ${it.title}`);
        else if (ids.has(it.id)) errors.push(`id duplicat: ${it.id}`);
        ids.add(it.id);
        if (it.id.length > 50) errors.push(`${t}: id > 50 caractere`);
        if (!it.title) errors.push(`${t}: fără titlu`);
        else if (it.title.length > 150) errors.push(`${t}: titlu > 150 (${it.title.length})`);
        if (!it.image) errors.push(`${t}: fără poză`);
        else {
            const u = new URL(it.image);
            if (u.pathname === "/logo.png") errors.push(`${t}: poza e logo-ul`);
            else if (!/\.(jpe?g|png|gif|webp)$/i.test(u.pathname)) errors.push(`${t}: poza nu e JPG/PNG/GIF/WebP: ${it.image}`);
            else if (/(^|\.)((www\.)?[a-z0-9-]+\.ro)$/i.test(u.hostname) && new URL(it.link).hostname === u.hostname) {
                if (!fs.existsSync(path.join(publicDir, decodeURIComponent(u.pathname)))) errors.push(`${t}: lipsește public${decodeURIComponent(u.pathname)}`);
            }
        }
        if (!it.link) { errors.push(`${t}: fără link`); continue; }
        const lu = new URL(it.link);
        if (!isRoute(lu.pathname)) { errors.push(`${t}: link-ul nu e o rută a site-ului: ${it.link}`); continue; }
        if (!(it.price > 0)) { errors.push(`${t}: preț invalid`); continue; }
        const page = merchantPagePrice(it.link);
        if (!page) errors.push(`${t}: nu știu ce preț arată pagina ${lu.pathname}${lu.search}`);
        else if (Math.abs(page.price - it.price) > 0.005) errors.push(`${t}: feed ${it.price.toFixed(2)} ≠ pagină ${page.price.toFixed(2)} (${lu.pathname}${lu.search})`);
        else priceOk++;
    }

    // CSV-ul trebuie să aibă aceleași articole și prețuri
    const csvRes: Response = await csvGet();
    const csv = parseCsv(await csvRes.text());
    const head = csv[0] || [];
    const iId = head.indexOf("id"), iPrice = head.indexOf("price");
    const csvRows = csv.slice(1).filter((r) => r.length > 1);
    const xmlPrice = new Map(items.map((i) => [i.id, i.price]));
    if (csvRows.length !== items.length) errors.push(`CSV are ${csvRows.length} articole, XML ${items.length}`);
    for (const r of csvRows) {
        const p = Number(String(r[iPrice]).replace(/\s*RON$/, ""));
        if (!xmlPrice.has(r[iId])) errors.push(`CSV: ${r[iId]} nu e în XML`);
        else if (Math.abs((xmlPrice.get(r[iId]) ?? 0) - p) > 0.005) errors.push(`CSV: ${r[iId]} preț ${p} ≠ XML ${xmlPrice.get(r[iId])}`);
    }

    // Ce a rămas în afara feedului (informativ)
    const { getProducts } = await import("../lib/products");
    const M = await import("../lib/merchantFeed");
    const Mx = M as unknown as Record<string, unknown>;
    const linkFor = (Mx.euPrintMerchantProductLink ?? Mx.merchantProductCanonicalLink) as (p: any, b: string) => string;
    const { dropped } = merchantFeedRows((await getProducts()).filter(M.includeProductInMerchantFeed), "https://www.example.ro", linkFor);
    const byReason = new Map<string, Map<string, number>>();
    for (const d of dropped) {
        const segs = new URL(d.link).pathname.split("/").filter(Boolean);
        const group = "/" + segs.slice(0, segs[0] === "configurator" || segs[0] === "materiale" ? 2 : 1).join("/");
        const m = byReason.get(d.reason) ?? new Map<string, number>();
        m.set(group, (m.get(group) ?? 0) + 1);
        byReason.set(d.reason, m);
    }

    // Opțional: prețul chiar apare în pagina randată de server
    const live = arg("live");
    if (live) {
        const perGroup = Number(arg("per-group") ?? 3);
        const groups = new Map<string, Item[]>();
        for (const it of items) {
            const segs = new URL(it.link).pathname.split("/").filter(Boolean);
            const g = "/" + segs.slice(0, segs[0] === "configurator" ? 2 : 1).join("/");
            groups.set(g, [...(groups.get(g) ?? []), it]);
        }
        let liveOk = 0, liveBad = 0;
        for (const [g, list] of groups) {
            const sample = list.length <= perGroup ? list : Array.from({ length: perGroup }, (_, k) => list[Math.floor((k * list.length) / perGroup)]);
            for (const it of sample) {
                const u = new URL(it.link);
                const res = await fetch(new URL(u.pathname + u.search, live));
                const html = (await res.text()).replace(/<!-- -->/g, "").replace(/&nbsp;| | /g, " ");
                const forms = new Set([
                    new Intl.NumberFormat("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(it.price),
                    new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 2 }).format(it.price),
                    it.price.toFixed(2),
                    String(it.price),
                ]);
                const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                const found = [...forms].some((f) => new RegExp(`(^|[^\\d.,])${esc(f)}\\s*(lei|RON)`, "i").test(html))
                    // datele structurate ale paginii (prețul calculat de configurator la deschidere)
                    || [it.price.toFixed(2), String(it.price)].some((f) => new RegExp(`"price"\\s*:\\s*"?${esc(f)}"?[,}]`).test(html));
                if (res.status !== 200 || !found) {
                    liveBad++;
                    warnings.push(`live ${g}: ${u.pathname}${u.search} HTTP ${res.status}, prețul ${it.price} lei ${found ? "găsit" : "NEGĂSIT în HTML"}`);
                } else liveOk++;
            }
        }
        console.log(`Live (${live}): ${liveOk} pagini cu prețul din feed în HTML, ${liveBad} de verificat.`);
    }

    console.log(`Feed: ${items.length} articole; ${priceOk} cu prețul = prețul paginii. CSV: ${csvRows.length} articole.`);
    console.log(`În afara feedului: ${dropped.length} produse`);
    for (const [reason, m] of byReason) console.log(`  - ${reason}: ${[...m].sort((a, b) => b[1] - a[1]).map(([g, n]) => `${g} ${n}`).join(", ")}`);
    for (const w of warnings.slice(0, 50)) console.log(`AVERTISMENT ${w}`);
    if (errors.length) {
        for (const e of errors.slice(0, 80)) console.log(`EROARE ${e}`);
        if (errors.length > 80) console.log(`... încă ${errors.length - 80} erori`);
        console.log(`\n${errors.length} erori.`);
        process.exit(1);
    }
    console.log("0 erori.");
    process.exit(0);
}

main().catch((e) => {
    process.stdout.write(`EROARE ${e?.stack || e}\n`);
    process.exit(1);
});
