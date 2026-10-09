// Teste: npx tsx --test lib/metaCapi.test.ts  (fără rețea: fetch e înlocuit cu un mock, niciun apel real la Meta)
import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  buildMetaPurchasePayload,
  metaBuyerFromAddress,
  metaContentsFromItems,
  metaCheckoutMetadata,
  metaContextFromMetadata,
  metaContextFromRequest,
  normalizeCity,
  normalizeCountry,
  normalizeEmail,
  normalizeName,
  normalizePhone,
  sendMetaPurchase,
  splitFullName,
  validFbc,
  validFbp,
  type MetaPurchase,
} from "./metaCapi";

const h = (v: string) => createHash("sha256").update(v).digest("hex");
const ENV_KEYS = ["META_CAPI_TOKEN", "META_PIXEL_ID", "META_TEST_EVENT_CODE", "META_CAPI_DRY_RUN"] as const;
const savedEnv = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
const realFetch = globalThis.fetch;

afterEach(() => {
  for (const k of ENV_KEYS) {
    if (savedEnv[k] === undefined) delete process.env[k];
    else process.env[k] = savedEnv[k];
  }
  globalThis.fetch = realFetch;
});

const FBP = "fb.1.1700000000000.1234567890";
const FBC = "fb.1.1700000000000.IwAR0abc_DEF-123";

function purchase(over: Partial<MetaPurchase> = {}): MetaPurchase {
  return {
    pixelId: "111222333",
    eventId: "order-1234",
    orderId: "1234",
    value: 249.904,
    currency: "ron",
    contents: [{ id: "banner-frontlit", quantity: 2, item_price: 100 }, { id: "afise", quantity: 1, item_price: 49.9 }],
    eventSourceUrl: "https://www.example.ro/checkout/success",
    email: "  Ion.Popescu@Example.RO ",
    phone: "0722 123 456",
    firstName: "Ion",
    lastName: "Popescu-Ștefănescu",
    city: "București",
    country: "RO",
    externalId: "user-42",
    context: { marketing: true, fbp: FBP, fbc: FBC, ip: "203.0.113.7", userAgent: "Mozilla/5.0 Test", sourceUrl: "https://www.example.ro/checkout" },
    eventTime: 1760000000,
    ...over,
  };
}

test("normalizare e-mail", () => {
  assert.equal(normalizeEmail("  Ion.Popescu@Example.RO "), "ion.popescu@example.ro");
  assert.equal(normalizeEmail("fara-arond"), undefined);
  assert.equal(normalizeEmail(""), undefined);
});

test("normalizare telefon RO -> cifre cu prefixul 40", () => {
  assert.equal(normalizePhone("0722 123 456"), "40722123456");
  assert.equal(normalizePhone("+40 722-123-456"), "40722123456");
  assert.equal(normalizePhone("0040722123456"), "40722123456");
  assert.equal(normalizePhone("40722123456"), "40722123456");
  assert.equal(normalizePhone("722123456"), "40722123456");
  assert.equal(normalizePhone("(021) 310.11.22"), "40213101122");
  assert.equal(normalizePhone("+49 151 23456789"), "4915123456789");
  assert.equal(normalizePhone("N/A"), undefined);
  assert.equal(normalizePhone("123"), undefined);
});

test("normalizare nume, oraș, țară", () => {
  assert.equal(normalizeName(" Ștefan "), "stefan");
  assert.equal(normalizeName("Popescu-Țăranu"), "popescutaranu");
  assert.equal(normalizeName("  "), undefined);
  assert.equal(normalizeCity("București"), "bucuresti");
  assert.equal(normalizeCity("Târgu Mureș"), "targumures");
  assert.equal(normalizeCity("N/A"), undefined);
  assert.equal(normalizeCountry("RO"), "ro");
  assert.equal(normalizeCountry("România"), "ro");
  assert.equal(normalizeCountry("ROU"), undefined);
});

test("împărțirea numelui complet", () => {
  assert.deepEqual(splitFullName("Ion Popescu"), { firstName: "Ion", lastName: "Popescu" });
  assert.deepEqual(splitFullName("Ana Maria Ionescu"), { firstName: "Ana", lastName: "Maria Ionescu" });
  assert.deepEqual(splitFullName("Ion"), { firstName: "Ion", lastName: undefined });
  assert.deepEqual(splitFullName("N/A"), {});
  assert.deepEqual(splitFullName(""), {});
});

test("fbp / fbc: doar formatul Meta", () => {
  assert.equal(validFbp(FBP), FBP);
  assert.equal(validFbp("altceva"), undefined);
  assert.equal(validFbc(FBC), FBC);
  assert.equal(validFbc("fb.1.17.<script>"), undefined);
});

test("metadata Stripe: goală fără acord, completă cu acord, citită înapoi", () => {
  assert.deepEqual(metaCheckoutMetadata({ marketing: false, fbp: FBP, ip: "1.2.3.4" }), {});
  const meta = metaCheckoutMetadata({ marketing: true, fbp: FBP, fbc: FBC, ip: "203.0.113.7", userAgent: "UA", sourceUrl: "https://x.ro/checkout" });
  assert.deepEqual(meta, { fb_consent: "1", fb_fbp: FBP, fb_fbc: FBC, fb_ip: "203.0.113.7", fb_ua: "UA", fb_url: "https://x.ro/checkout" });
  for (const v of Object.values(meta)) assert.ok(v.length <= 500);
  assert.deepEqual(metaContextFromMetadata(meta), { marketing: true, fbp: FBP, fbc: FBC, ip: "203.0.113.7", userAgent: "UA", sourceUrl: "https://x.ro/checkout" });
  assert.deepEqual(metaContextFromMetadata({ fb_fbp: FBP }), { marketing: false });
  assert.deepEqual(metaContextFromMetadata(null), { marketing: false });
});

test("context din cerere (ramburs): cookie-uri, IP, browser, URL", () => {
  const cookies = new Map([["_fbp", FBP], ["_fbc", FBC]]);
  const req = {
    headers: new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1", "user-agent": "UA", referer: "https://x.ro/checkout" }),
    cookies: { get: (n: string) => (cookies.has(n) ? { value: cookies.get(n)! } : undefined) },
  };
  assert.deepEqual(metaContextFromRequest(req, true), { marketing: true, fbp: FBP, fbc: FBC, ip: "203.0.113.7", userAgent: "UA", sourceUrl: "https://x.ro/checkout" });
  assert.deepEqual(metaContextFromRequest(req, false), { marketing: false });
});

test("forma payload-ului Purchase", () => {
  delete process.env.META_TEST_EVENT_CODE;
  const body = buildMetaPurchasePayload(purchase());
  assert.deepEqual(Object.keys(body), ["data"]);
  const [event] = body.data as Record<string, any>[];
  assert.equal(event.event_name, "Purchase");
  assert.equal(event.event_id, "order-1234");
  assert.equal(event.event_time, 1760000000);
  assert.equal(event.action_source, "website");
  assert.equal(event.event_source_url, "https://www.example.ro/checkout");
  assert.deepEqual(event.user_data, {
    em: [h("ion.popescu@example.ro")],
    ph: [h("40722123456")],
    fn: [h("ion")],
    ln: [h("popescustefanescu")],
    ct: [h("bucuresti")],
    country: [h("ro")],
    external_id: [h("user-42")],
    client_ip_address: "203.0.113.7",
    client_user_agent: "Mozilla/5.0 Test",
    fbp: FBP,
    fbc: FBC,
  });
  assert.deepEqual(event.custom_data, {
    currency: "RON",
    value: 249.9,
    content_type: "product",
    content_ids: ["banner-frontlit", "afise"],
    contents: [{ id: "banner-frontlit", quantity: 2, item_price: 100 }, { id: "afise", quantity: 1, item_price: 49.9 }],
    num_items: 3,
    order_id: "1234",
  });
  // nicio dată personală în clar
  const json = JSON.stringify(body);
  for (const plain of ["popescu", "0722", "722123456", "Bucure", "user-42"]) assert.ok(!json.toLowerCase().includes(plain.toLowerCase()), plain);
  assert.ok(!("access_token" in body));
});

test("payload: țara implicită ro, URL de rezervă, cod de test", () => {
  process.env.META_TEST_EVENT_CODE = "TEST123";
  const body = buildMetaPurchasePayload(purchase({ country: null, email: null, phone: "x", context: { marketing: true, userAgent: "UA" } }));
  const [event] = body.data as Record<string, any>[];
  assert.equal(body.test_event_code, "TEST123");
  assert.equal(event.event_source_url, "https://www.example.ro/checkout/success");
  assert.deepEqual(event.user_data.country, [h("ro")]);
  assert.equal(event.user_data.em, undefined);
  assert.equal(event.user_data.ph, undefined);
  assert.equal(event.user_data.fbp, undefined);
});

function mockFetch(response: unknown, status = 200) {
  const calls: { url: string; body: any }[] = [];
  globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
    calls.push({ url: String(url), body: JSON.parse(String(init?.body)) });
    return new Response(JSON.stringify(response), { status, headers: { "Content-Type": "application/json" } });
  }) as typeof fetch;
  return calls;
}

test("fără token, fără acord sau fără browser: nu trimite nimic", async () => {
  const calls = mockFetch({ events_received: 1 });
  delete process.env.META_CAPI_TOKEN;
  delete process.env.META_CAPI_DRY_RUN;
  assert.equal(await sendMetaPurchase(purchase()), false);
  process.env.META_CAPI_TOKEN = "tok-test";
  assert.equal(await sendMetaPurchase(purchase({ context: { marketing: false } })), false);
  assert.equal(await sendMetaPurchase(purchase({ context: { marketing: true } })), false);
  assert.equal(await sendMetaPurchase(purchase({ pixelId: null })), false);
  assert.equal(calls.length, 0);
});

test("dry run: doar log, fără fetch", async () => {
  const calls = mockFetch({ events_received: 1 });
  delete process.env.META_CAPI_TOKEN;
  process.env.META_CAPI_DRY_RUN = "1";
  assert.equal(await sendMetaPurchase(purchase()), false);
  assert.equal(calls.length, 0);
});

test("trimitere (mock): URL cu pixelul, token în corp, META_PIXEL_ID are prioritate", async () => {
  const calls = mockFetch({ events_received: 1, fbtrace_id: "x" });
  process.env.META_CAPI_TOKEN = "tok-test";
  delete process.env.META_CAPI_DRY_RUN;
  delete process.env.META_PIXEL_ID;
  assert.equal(await sendMetaPurchase(purchase()), true);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /^https:\/\/graph\.facebook\.com\/v\d+\.\d+\/111222333\/events$/);
  assert.equal(calls[0].body.access_token, "tok-test");
  assert.equal(calls[0].body.data[0].event_id, "order-1234");
  process.env.META_PIXEL_ID = "999";
  assert.equal(await sendMetaPurchase(purchase()), true);
  assert.match(calls[1].url, /\/999\/events$/);
});

test("răspuns de eroare: false, fără excepție", async () => {
  mockFetch({ error: { code: 100, message: "Invalid parameter" } }, 400);
  process.env.META_CAPI_TOKEN = "tok-test";
  delete process.env.META_CAPI_DRY_RUN;
  const origError = console.error;
  console.error = () => {};
  try {
    assert.equal(await sendMetaPurchase(purchase()), false);
  } finally {
    console.error = origError;
  }
});

test("produse și cumpărător din datele comenzii", () => {
  assert.deepEqual(
    metaContentsFromItems([{ productId: "banner", quantity: "2", unitAmount: 120 }, { id: "x1", name: "Afiș", price: 15 }, {}]),
    [{ id: "banner", quantity: 2, item_price: 120 }, { id: "x1", quantity: 1, item_price: 15 }, { id: "produs", quantity: 1, item_price: 0 }],
  );
  assert.deepEqual(metaContentsFromItems(undefined), []);
  assert.deepEqual(
    metaBuyerFromAddress({ nume_prenume: "Ion Popescu", email: "a@b.ro", telefon: "0722123456", localitate: "Cluj-Napoca", country: "RO" }),
    { email: "a@b.ro", phone: "0722123456", firstName: "Ion", lastName: "Popescu", city: "Cluj-Napoca", country: "RO" },
  );
  assert.deepEqual(metaBuyerFromAddress(undefined).country, "RO");
});
