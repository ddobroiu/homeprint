// scripts/check-ai-chat.ts
//
// Ruleaza ~6 intrebari tipice prin ruta chatului AI (app/api/ai/chat/route.ts) cu cheia OpenAI reala
// (costa cativa centi) si verifica:
//   - preturile din raspuns = pretul paginii la care duce linkul (landingPriceFromUrl);
//   - linkurile duc la pagini cunoscute ale site-ului;
//   - tokenii pe cerere (usage de la OpenAI, inclusiv cei din cache).
// Scrierile in baza (logConversation, consumul AI) sunt oprite: DATABASE_URL e redirectionat spre un port inchis.
//
//   npx tsx scripts/check-ai-chat.ts            (ruta curenta)
//   npx tsx scripts/check-ai-chat.ts <cale.ts>  (alta versiune a rutei, ex. cea veche, pentru comparatie)

import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

function loadEnv(file: string) {
    if (!fs.existsSync(file)) return;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
        if (!m || process.env[m[1]] !== undefined) continue;
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
}
loadEnv(path.join(process.cwd(), ".env.local"));
loadEnv(path.join(process.cwd(), ".env"));
process.env.DATABASE_URL = "postgresql://none:none@127.0.0.1:9/none";
process.env.NEXT_PUBLIC_SITE_URL = "https://www.homeprint.ro";

const QUESTIONS = [
    "Fototapet 300x250 cm, cât costă?",
    "Canvas 60x90 pe șasiu, cât costă?",
    "Autocolante 20x20 cm, 50 buc, preț?",
    "Afiș A2, 10 bucăți, cât costă?",
    "Cât durează livrarea?",
    "Vindeți căni personalizate?",
];

const GREETING = "Salut! Te ajut să alegi produsul, materialul și finisajele, să găsești configuratorul și să plasezi comanda. Ce vrei să realizezi?";

async function main() {
    if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY lipseste din .env");
    const usage: { input: number; cached: number; output: number }[] = [];
    // usage din raspunsurile OpenAI (SDK-ul foloseste fetch global)
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (input: any, init?: any) => {
        const res = await origFetch(input, init);
        const url = typeof input === "string" ? input : input?.url ?? String(input);
        if (url.includes("/chat/completions")) {
            res.clone().json().then((j: any) => {
                const u = j?.usage;
                if (u) usage.push({ input: u.prompt_tokens, cached: u.prompt_tokens_details?.cached_tokens ?? 0, output: u.completion_tokens });
            }).catch(() => {});
        }
        return res;
    }) as typeof fetch;
    // erorile de conectare la baza (oprita intentionat) nu intereseaza aici
    console.error = () => {};
    console.warn = () => {};

    const routeFile = process.argv[2] ? path.resolve(process.argv[2]) : path.join(process.cwd(), "app/api/ai/chat/route.ts");
    const { POST } = await import(pathToFileURL(routeFile).href);
    const { landingPriceFromUrl } = await import("../lib/merchant/landingPrice");

    let failures = 0;
    const perQuestion: number[] = [];
    for (const q of QUESTIONS) {
        const before = usage.length;
        const t0 = Date.now();
        const res: Response = await POST(new Request("http://localhost/api/ai/chat", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ messages: [{ role: "assistant", content: GREETING }, { role: "user", content: q }], conversationId: "check-ai-chat" }),
        }));
        const data = await res.json();
        const reply: string = data.reply ?? data.message ?? "";
        await new Promise((r) => setTimeout(r, 50));
        const calls = usage.slice(before);
        const inTok = calls.reduce((s, c) => s + c.input, 0);
        const cached = calls.reduce((s, c) => s + c.cached, 0);
        const outTok = calls.reduce((s, c) => s + c.output, 0);
        if (calls.length) perQuestion.push(inTok);

        // linkuri + preturi
        const urls = [...reply.matchAll(/https?:\/\/[^\s)\]]+/g)].map((m) => m[0].replace(/[),.;]+$/, ""));
        const checks: string[] = [];
        const replyNums = [...reply.replace(/(\d)\.(\d{3})(?!\d)/g, "$1$2").matchAll(/(\d+(?:[.,]\d{1,2})?)\s*(?:lei|RON)/gi)].map((m) => Number(m[1].replace(",", ".")));
        for (const u of urls) {
            if (!u.includes("homeprint.ro") || u.includes("wa.me")) continue;
            const p = new URL(u);
            const lp = p.search ? landingPriceFromUrl(u) : null;
            if (lp) {
                const ok = replyNums.some((n) => Math.abs(n - lp.price) < 0.011);
                checks.push(`${ok ? "OK " : "BAD"} pagina ${p.pathname}${p.search} = ${lp.price} lei`);
                if (!ok) failures++;
            } else {
                const exists = fs.existsSync(path.join(process.cwd(), "app", p.pathname, "page.tsx")) || p.pathname === "/";
                checks.push(`${exists ? "OK " : "?? "} link ${p.pathname}`);
            }
        }
        console.log(`\n### ${q}\n${reply}\n-- ${calls.length} apeluri, input ${inTok} (cache ${cached}), output ${outTok}, ${Date.now() - t0} ms`);
        for (const c of checks) console.log("   " + c);
    }
    const all = usage.map((u) => u.input);
    const avg = (a: number[]) => (a.length ? Math.round(a.reduce((s, x) => s + x, 0) / a.length) : 0);
    console.log(`\nApeluri OpenAI: ${usage.length}; input mediu pe apel: ${avg(all)}; input mediu pe intrebare (cu model): ${avg(perQuestion)}; cache total: ${usage.reduce((s, u) => s + u.cached, 0)}`);
    console.log(failures ? `PRETURI GRESITE: ${failures}` : "Preturile din raspunsuri = preturile paginilor.");
    process.exit(failures ? 1 : 0);
}

main().catch((e) => { console.error(e?.message || e); process.exit(1); });
