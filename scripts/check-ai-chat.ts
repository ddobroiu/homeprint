// scripts/check-ai-chat.ts
//
// Ruleaza ~6 intrebari tipice prin ruta chatului AI (app/api/ai/chat/route.ts) cu cheia OpenAI reala
// (costa cativa centi) si verifica:
//   - preturile din raspuns = pretul paginii la care duce linkul (landingPriceFromUrl);
//   - linkurile duc la pagini cunoscute ale site-ului;
//   - tokenii pe cerere (usage de la OpenAI, inclusiv cei din cache).
// Scrierile in baza (logConversation, consumul AI) sunt oprite: DATABASE_URL e redirectionat spre un port inchis.
//
//   npx tsx scripts/check-ai-chat.ts --mock     (FARA OpenAI: modelul e simulat, verifica uneltele de pret + linkurile; gratuit)
//   npx tsx scripts/check-ai-chat.ts            (ruta curenta, cu cheia reala — costa)
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

// --mock: raspunsurile OpenAI sunt simulate local (nicio cerere in retea). Modelul simulat cere get_quote cu
// argumentele de mai jos, apoi raspunde cu pretul si linkul intoarse de unealta; verificarea compara pretul cu pagina.
const MOCK = process.argv.includes("--mock");
const MOCK_CASES: Array<{ q: string; quote?: Record<string, unknown> }> = [
    { q: "Cât costă un banner 200x100 cm?", quote: { configurator: "banner", width_cm: 200, height_cm: 100, quantity: 1 } },
    { q: "Preț roll-up 85x200, 1 bucată", quote: { configurator: "rollup", width_cm: 85, height_cm: 200, quantity: 1 } },
    { q: "Autocolante 10x10 cm, 100 buc, cât costă?", quote: { configurator: "autocolante", width_cm: 10, height_cm: 10, quantity: 100 } },
    { q: "Canvas 60x90 pe șasiu, cât costă?", quote: { configurator: "canvas", size: "60x90" } },
    { q: "Flyere A5, 1000 buc, preț?", quote: { configurator: "flayere", size: "A5", quantity: 1000 } },
    { q: "Afișe A3, 50 de bucăți, preț?", quote: { configurator: "afise", size: "A3", quantity: 50 } },
    { q: "Cât durează livrarea?" },
];

function mockOpenAiFetch(): typeof fetch {
    let n = 0;
    const completion = (message: Record<string, unknown>) => new Response(JSON.stringify({
        id: `mock-${++n}`, object: "chat.completion", created: Math.floor(Date.now() / 1000), model: "mock",
        choices: [{ index: 0, message: { role: "assistant", content: null, ...message }, finish_reason: message.tool_calls ? "tool_calls" : "stop", logprobs: null }],
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
    }), { status: 200, headers: { "content-type": "application/json" } });
    return (async (input: any, init?: any) => {
        const url = typeof input === "string" ? input : input?.url ?? String(input);
        if (!url.includes("/chat/completions")) throw new Error(`--mock: cerere in retea blocata: ${url}`);
        const body = JSON.parse(String(init?.body ?? "{}"));
        const msgs: any[] = body.messages ?? [];
        const last = msgs[msgs.length - 1];
        if (last?.role === "tool") {
            const out = JSON.parse(String(last.content));
            const price = out.total_lei ?? out.total ?? out.price_lei;
            return completion({ content: out.error ? `Nu pot calcula: ${out.error}` : `Prețul este ${price} lei. Comandă aici: ${out.url}` });
        }
        const userText = [...msgs].reverse().find((m) => m.role === "user")?.content ?? "";
        const c = MOCK_CASES.find((x) => x.q === userText);
        if (c?.quote) return completion({ tool_calls: [{ id: `call_${n + 1}`, type: "function", function: { name: "get_quote", arguments: JSON.stringify(c.quote) } }] });
        return completion({ content: "Livrarea durează 2–4 zile lucrătoare." });
    }) as typeof fetch;
}

const GREETING = "Salut! Te ajut să alegi produsul, materialul și finisajele, să găsești configuratorul și să plasezi comanda. Ce vrei să realizezi?";

async function main() {
    if (MOCK) {
        // cheie falsa + fara e-mail: chiar daca interceptarea ar scapa ceva, nu se plateste nimic
        process.env.OPENAI_API_KEY = "sk-mock-no-network";
        process.env.OPENAI_BASE_URL = "http://127.0.0.1:9/v1";
        delete process.env.RESEND_API_KEY;
    }
    if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY lipseste din .env");
    const usage: { input: number; cached: number; output: number }[] = [];
    // usage din raspunsurile OpenAI (SDK-ul foloseste fetch global)
    const origFetch = MOCK ? mockOpenAiFetch() : globalThis.fetch;
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

    const routeArg = process.argv.slice(2).find((a) => !a.startsWith("--"));
    const routeFile = routeArg ? path.resolve(routeArg) : path.join(process.cwd(), "app/api/ai/chat/route.ts");
    const { POST } = await import(pathToFileURL(routeFile).href);
    const { landingPriceFromUrl } = await import("../lib/merchant/landingPrice");

    let failures = 0;
    const perQuestion: number[] = [];
    for (const q of MOCK ? MOCK_CASES.map((c) => c.q) : QUESTIONS) {
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
        if (MOCK && MOCK_CASES.find((c) => c.q === q)?.quote && !checks.some((c) => c.startsWith("OK  pagina"))) {
            console.log("   BAD raspunsul simulat nu are pret + link verificabil");
            failures++;
        }
    }
    const all = usage.map((u) => u.input);
    const avg = (a: number[]) => (a.length ? Math.round(a.reduce((s, x) => s + x, 0) / a.length) : 0);
    console.log(`\nApeluri OpenAI: ${usage.length}; input mediu pe apel: ${avg(all)}; input mediu pe intrebare (cu model): ${avg(perQuestion)}; cache total: ${usage.reduce((s, u) => s + u.cached, 0)}`);
    console.log(failures ? `PRETURI GRESITE: ${failures}` : "Preturile din raspunsuri = preturile paginilor.");
    process.exit(failures ? 1 : 0);
}

main().catch((e) => { console.error(e?.message || e); process.exit(1); });
