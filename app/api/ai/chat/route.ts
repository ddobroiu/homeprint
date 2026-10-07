import { faraCredite } from "@/lib/alerts";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { CHAT_MODEL, chatOptions } from "@/lib/ai-model";
import { trackOpenAI } from "@/lib/aiUsage";
import { randomUUID } from "crypto";
import { siteConfig } from "@/lib/siteConfig";
import { ALL_CONFIGURATORS, CONFIGURATORS_REGISTRY } from "@/lib/configurators-registry";
import { AI_CONFIGURATOR_IDS, configuratorIndex, listConfiguratorOptions, quoteConfigurator } from "@/lib/ai-configurators";
import { FREE_SHIPPING_THRESHOLD, MAX_RAMBURS_LIMIT } from "@/lib/paymentRules";
import { logConversation } from "@/lib/chat-logger";
import { brandKey, type BrandKey } from "@/lib/brandDesign";

export const runtime = "nodejs";

type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

function getOpenAiClient() {
  // Lazy init so `next build` (and Docker builds) don't crash
  // when OPENAI_API_KEY isn't present at build-time.
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

function waPhoneE164(roPhone: string) {
  const digits = roPhone.replace(/[^\d]/g, "");
  if (digits.startsWith("40")) return digits;
  if (digits.startsWith("0")) return `40${digits.slice(1)}`;
  return digits;
}

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.PUBLIC_BASE_URL ||
    siteConfig.url
  );
}

function buildWhatsAppUrl(message: string) {
  const phone = waPhoneE164(siteConfig.phone);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function extractBannerIntent(messages: ChatMsg[]) {
  // IMPORTANT: only consider user messages; assistant greeting contains "banner/autocolant/canvas"
  // and would otherwise bias routing incorrectly.
  const all = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join("\n")
    .toLowerCase();
  if (all.includes("banner")) return true;
  return false;
}

function normalize(s: string) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function findConfiguratorMatches(query: string, limit = 5) {
  const q = normalize(query);
  if (!q) return [];

  const scored = CONFIGURATORS_REGISTRY.map((c) => {
    const hay = normalize(
      [c.name, c.slug, c.category, ...(c.keywords || []), ...(c.useCases || [])].join(" | ")
    );
    let score = 0;
    // direct contains
    if (hay.includes(q)) score += 6;
    // token overlap
    const tokens = q.split(/[\s,.;/|]+/).filter(Boolean);
    for (const t of tokens) {
      if (t.length < 3) continue;
      if (hay.includes(t)) score += 2;
    }
    // prefer exact slug hits
    if (q.includes(normalize(c.slug))) score += 3;
    return { c, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((x) => x.c);
}

function isListAllIntent(text: string) {
  const t = normalize(text);
  return (
    t.includes("toate configuratoarele") ||
    t.includes("toate configurator") ||
    t.includes("ce configuratoare") ||
    t.includes("ce aveti") ||
    t.includes("ce oferi") ||
    t.includes("ce produse") ||
    t.includes("vreau sa stie de toate")
  );
}

function isOrderIntent(text: string) {
  const t = normalize(text);
  return (
    t.includes("plasa comanda") ||
    t.includes("plasez comanda") ||
    t.includes("cum comand") ||
    t.includes("cum pot comanda") ||
    t.includes("unde comand") ||
    t.includes("unde pot plasa") ||
    t.includes("unde pot comanda") ||
    t.includes("vreau sa comand")
  );
}

function isOperatorIntent(last: string, prevAssistant = "") {
  const t = last.trim().toLowerCase();
  // „da”/„ok” înseamnă operator doar ca răspuns la oferta de operator (altfel e răspuns la o întrebare a asistentului).
  const offeredOperator = /operator|whatsapp/i.test(prevAssistant);
  return (
    ((t === "da" || t === "ok") && offeredOperator) ||
    t === "operator" ||
    t.includes("whatsapp") ||
    t.includes("operator uman") ||
    t.includes("vreau operator") ||
    t.includes("contact") ||
    /^\+?\d[\d\s-]{7,}$/.test(t) // looks like a phone number
  );
}

// ---------------------------------------------------------------------------
// Ce știe asistentul: doar configuratoarele (index + unelte de preț) și câteva fapte fixe.
// Promptul NU conține date din cerere, ca să rămână identic între cereri (cache OpenAI).
// ---------------------------------------------------------------------------
/** Cine e site-ul, în vocea lui (același brand ca homepage-ul, lib/brandDesign.ts). */
const SITE_VOICE: Record<BrandKey, string> = {
  shopprint: "tipografie online din România cu producție proprie",
  adbanner: "atelier de publicitate outdoor din România, cu producție proprie: bannere, mesh, roll-up și folii de vitrină, plus restul printului",
  euprint: "tipografie online din România cu producție proprie, specializată în materiale pentru proiecte cu fonduri UE (afișe, plăci, panouri) și panouri rigide, plus restul printului",
  homeprint: "atelier online de print pentru decor, cu producție proprie în România: fototapet, tablouri canvas și postere, plus restul printului",
  prynt: "tipografie online din România cu producție proprie: textile personalizate și print mic (cărți de vizită, flyere, afișe), plus formate mari",
  tablou: "atelier online din România care face tablouri canvas din fotografiile clienților, cu producție proprie; în același atelier se printează și fototapet, textile, afișe, bannere și panouri",
};

function buildSystemPrompt(baseUrl: string) {
  const wa = buildWhatsAppUrl("Bună! Am o întrebare (mesaj din chat-ul de pe site).");
  return [
    `Ești asistentul de chat al ${siteConfig.name} (${baseUrl}), ${SITE_VOICE[brandKey]}. Răspunzi în română, scurt, prietenos, la persoana a II-a („tu”).`,
    "Știi DOAR ce e în configuratoarele de mai jos și ce întorc uneltele. Pentru orice altceva trimite clientul la configuratorul potrivit sau la contact; nu inventa produse, materiale, termene sau politici.",
    "",
    "Reguli de preț:",
    "- Prețurile vin EXCLUSIV din unealta get_quote; nu calcula, nu estima, nu rotunji alt preț. Dă totalul exact (lei) și linkul `url` întors de unealtă, neschimbat.",
    "- Dacă lipsește ceva esențial (dimensiuni, cantitate, format), întreabă exact ce lipsește. Opțiunile nespecificate rămân implicite: dă prețul pe configurația implicită și spune ce include (default_configuration); nu întreba de opțiuni înainte de primul preț.",
    "- Pentru opțiuni/variante valide folosește list_configurator_options. Dacă get_quote întoarce error, explică pe scurt și dă configurator_url sau contactul.",
    "- Dacă nu vindem produsul cerut, spune clar că nu îl avem și propune, doar dacă se potrivește, un configurator din listă.",
    "",
    "Fapte fixe:",
    "- Comanda: configurator → dimensiuni, cantitate, opțiuni → încarci grafica (sau ceri design) → coș → checkout. Plată cu cardul, ordin de plată sau ramburs (ramburs doar în România, comenzi de cel mult " + MAX_RAMBURS_LIMIT + " lei, fără textile).",
    `- Livrare: curier ${siteConfig.shipping.provider} în toată România (și în unele țări din UE). De regulă 2–4 zile lucrătoare producție + livrare, de la confirmarea comenzii/plății și a fișierelor; termenul exact apare pe pagina produsului și în coș. Transportul se calculează în coș; gratuit pentru produse de cel puțin ${FREE_SHIPPING_THRESHOLD} lei. Detalii: ${baseUrl}/livrare`,
    `- Retur: produsele personalizate (făcute după grafica clientului) nu se pot returna, dar dacă sunt neconforme (defect de material/tipar, alt produs) le refacem gratuit — reclamație la ${baseUrl}/reclamatii. Produsele standard (nepersonalizate): retragere în 14 zile pentru persoane fizice. Detalii: ${baseUrl}/politica-retur`,
    `- Contact: telefon ${siteConfig.phone}, e-mail ${siteConfig.email}, WhatsApp ${wa}`,
    "- Nu cere telefonul clientului și nu promite că îl contactăm noi.",
    "",
    `Linkuri: URL-uri complete și simple (fără markdown, fără [text](url)): cele din unelte neschimbate, cele din listă cu ${baseUrl} în față.`,
    "",
    "Configuratoare (id | nume | link | descriere | ce trebuie pentru preț; opțiuni):",
    configuratorIndex(baseUrl),
  ].join("\n");
}

const CHAT_TOOLS: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "get_quote",
      description:
        "Prețul exact al unui configurator (același ca pe pagină) + linkul configuratorului precompletat. Opțiunile omise rămân implicite.",
      parameters: {
        type: "object",
        additionalProperties: false,
        properties: {
          configurator: { type: "string", enum: AI_CONFIGURATOR_IDS },
          width_cm: { type: "number", description: "Lățimea în cm (produse cu dimensiuni libere, canvas, roll-up)." },
          height_cm: { type: "number", description: "Înălțimea în cm." },
          quantity: { type: "integer", description: "Număr de bucăți." },
          size: { type: "string", description: "Format fix: afișe (A3, A2…), flyere (A6, A5, 21x10), canvas pe șasiu (ex. 60x90), canvas sezonier." },
          options: {
            type: "object",
            description: "Opțiuni cheie → valoare, ca în list_configurator_options (ex. {\"material\":\"frontlit_510\",\"gauri_vant\":\"da\"}).",
            additionalProperties: { type: ["string", "number", "boolean"] },
          },
        },
        required: ["configurator"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "list_configurator_options",
      description: "Opțiunile, formatele, limitele de dimensiuni și cantitățile minime valide ale unui configurator.",
      parameters: {
        type: "object",
        additionalProperties: false,
        properties: { configurator: { type: "string", description: "id din lista de configuratoare" } },
        required: ["configurator"],
      },
    },
  },
];

function runChatTool(name: string, args: Record<string, unknown>, baseUrl: string) {
  if (name === "get_quote") return quoteConfigurator(args, baseUrl);
  if (name === "list_configurator_options") return listConfiguratorOptions(String(args.configurator ?? ""), baseUrl);
  return { error: `Unealtă necunoscută: ${name}` };
}

function getMissingKeyError() {
  return NextResponse.json(
    {
      error: "OPENAI_API_KEY missing",
      message:
        "Lipsește OPENAI_API_KEY în environment. Adaugă cheia în `.env` și repornește serverul.",
    },
    { status: 500 }
  );
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) return getMissingKeyError();

  try {
    const client = getOpenAiClient();
    const body = (await req.json().catch(() => null)) as {
      messages?: ChatMsg[];
      conversationId?: string;
    } | null;

    const userMessages = Array.isArray(body?.messages) ? body!.messages.filter(m => (m.role === "user" || m.role === "assistant") && typeof m.content === "string") : [];
    const last = userMessages[userMessages.length - 1];
    if (!last?.content) {
      return NextResponse.json(
        { error: "No message", message: "Trimite un mesaj." },
        { status: 400 }
      );
    }

    const conversationId =
      typeof body?.conversationId === "string" &&
      body.conversationId.trim().length > 0
        ? body.conversationId.trim().slice(0, 200)
        : `web-${randomUUID()}`;
    const lastUserText =
      typeof last.content === "string"
        ? last.content
        : String(last.content ?? "");

    const jsonReply = (reply: string) => {
      void logConversation("web", conversationId, [
        { role: "user", content: lastUserText },
        { role: "assistant", content: reply },
      ]);
      return NextResponse.json({ reply });
    };

    const baseUrl = getBaseUrl();
    // Doar mesaje user: salutul asistentului menționează „banner/autocolant/canvas”
    // și falsifica potrivirea de configuratoare („bună ziua” → Banner PVC).
    const convoText = userMessages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .join("\n");

    // If user asks "all configurators", return a deterministic catalog of links.
    if (isListAllIntent(last.content)) {
      const grouped = new Map<string, { name: string; url: string }[]>();
      for (const c of ALL_CONFIGURATORS) {
        const cat = c.category || "altele";
        const arr = grouped.get(cat) || [];
        arr.push({ name: c.name, url: `${baseUrl}${c.url}` });
        grouped.set(cat, arr);
      }

      const lines: string[] = [
        "Avem aceste configuratoare/pagini (click pe link):",
        "",
      ];
      for (const [cat, items] of [...grouped.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
        lines.push(`## ${cat}`);
        for (const it of items) {
          lines.push(`- ${it.name}: ${it.url}`);
        }
        lines.push("");
      }

      return jsonReply(lines.join("\n"));
    }

    // Deterministic "how to order" answer: send correct configurator/page + WhatsApp + email.
    if (isOrderIntent(last.content)) {
      const matches = findConfiguratorMatches(convoText, 3);
      const primary = matches[0];
      const primaryUrl = primary ? `${baseUrl}${primary.url}` : `${baseUrl}/#configurator`;
      const waUrl = buildWhatsAppUrl(
        "Bună! Vreau ajutor pentru plasarea unei comenzi (mesaj din chat-ul de pe site)."
      );

      return jsonReply(
        [
          "Poți plasa comanda online aici:",
          `- Configurator: ${primaryUrl}`,
          "",
          "Dacă vrei un operator:",
          `- WhatsApp: ${waUrl}`,
          `- Telefon: ${siteConfig.phone}`,
          `- Email: ${siteConfig.email}`,
        ].join("\n")
      );
    }

    // Deterministic handoff: never "we will contact you".
    // Always return a direct WhatsApp link + relevant configurator links.
    const prevAssistant = [...userMessages.slice(0, -1)].reverse().find((m) => m.role === "assistant")?.content ?? "";
    if (isOperatorIntent(last.content, prevAssistant)) {
      const base = baseUrl;
      const isBanner = extractBannerIntent(userMessages);
      const configuratorUrl = isBanner
        ? `${base}/configurator/banner`
        : `${base}/#configurator`;

      const waUrl = buildWhatsAppUrl(
        `Bună! Vreau să discut cu un operator ${siteConfig.name} pentru o comandă. (Mesaj trimis din chat-ul de pe site)`
      );

      return jsonReply(
        [
          "Sigur — te conectez direct cu un operator.",
          "",
          `- WhatsApp operator: ${waUrl}`,
          `- Telefon: ${siteConfig.phone}`,
          `- Plasează comanda aici: ${configuratorUrl}`,
          "",
          "Apasă link-ul WhatsApp și scrie acolo. Eu nu pot iniția conversația în locul tău.",
        ].join("\n")
      );
    }

    const system: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
      role: "system",
      content: buildSystemPrompt(baseUrl),
    };

    const trimmed = userMessages.slice(-12);
    // Prefix stabil (sistem + unelte) primul: OpenAI il refoloseste din cache automat (>= 1024 tokeni).
    const convo: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      system,
      ...trimmed.map((m) => ({ role: m.role, content: m.content })),
    ];

    for (let hop = 0; hop < 4; hop++) {
      const res = await trackOpenAI("chat-site", CHAT_MODEL, () =>
        client.chat.completions.create({
          model: CHAT_MODEL,
          ...chatOptions(CHAT_MODEL, { temperature: 0.2 }),
          messages: convo,
          tools: CHAT_TOOLS,
          tool_choice: "auto",
          prompt_cache_key: `${brandKey}-chat-v2`,
        })
      );

      const msg = res.choices?.[0]?.message;
      const toolCalls = msg?.tool_calls;

      if (!msg) {
        return jsonReply(
          "Nu am putut genera un răspuns. Încearcă din nou sau apasă „Operator (WhatsApp)”."
        );
      }

      // Always append assistant message (may contain tool_calls).
      convo.push(msg);

      if (!toolCalls?.length) {
        const content = msg.content || "Nu am putut genera un răspuns.";
        return jsonReply(content);
      }

      for (const tc of toolCalls) {
        if (tc.type !== "function") continue;
        let args: Record<string, unknown> = {};
        try {
          const parsed = tc.function.arguments ? JSON.parse(tc.function.arguments) : {};
          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) args = parsed;
        } catch {
          args = {};
        }
        let out: unknown;
        try {
          out = runChatTool(tc.function.name, args, baseUrl);
        } catch (e: any) {
          out = { error: "Nu am putut calcula. Trimite clientul în configurator.", detail: String(e?.message ?? "").slice(0, 200) };
        }
        convo.push({ role: "tool", tool_call_id: tc.id, content: JSON.stringify(out) });
      }
    }

    return jsonReply(
      "Nu am reușit să calculez automat. Spune-mi produsul, dimensiunile și cantitatea sau deschide configuratorul produsului."
    );
  } catch (e: any) {
    if (faraCredite(e)) {
    }
    const status = Number(e?.status) || Number(e?.response?.status) || 500;
    const code =
      e?.code ||
      e?.error?.code ||
      e?.error?.type ||
      e?.type ||
      "unknown_error";

    if (status === 401 || code === "invalid_api_key") {
      return NextResponse.json(
        {
          error: "invalid_api_key",
          message:
            "Cheia OpenAI nu este validă (401). Generează o cheie nouă în contul OpenAI și pune-o în `.env` la `OPENAI_API_KEY`, apoi repornește `npm run dev`.",
          reply:
            "Nu pot răspunde acum: cheia OpenAI este invalidă (401). Apasă „Operator (WhatsApp)” sau actualizează `OPENAI_API_KEY` și repornește serverul.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        error: code,
        message: e?.message ?? "Eroare internă.",
        reply:
          "A apărut o eroare la asistent. Încearcă din nou sau apasă „Operator (WhatsApp)”.",
      },
      { status: status >= 400 && status < 600 ? status : 500 }
    );
  }
}

