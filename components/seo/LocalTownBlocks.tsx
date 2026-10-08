import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { CONFIGURATORS_REGISTRY } from "@/lib/configurators-registry";
import { getCatalogFamily } from "@/lib/catalog/families";
import { getProductBySlug } from "@/lib/products";
import { getProductDisplayName } from "@/lib/seo/localTitle";
import { getFromPrice } from "@/lib/seo/fromPrice";
import { getPopularSizes, isDimensionProduct } from "@/lib/seo/dimensionPages";
import { getDimensionPricing, formatLei } from "@/lib/seo/dimensionPricing";
import { getLocalityData, getCountyData, withDisplayName } from "@/lib/seo/localityData";
import { getLocalEditorial } from "@/lib/seo/localEditorial";
import { deliveryFacts, deliveryDaysText, shippingCostText, paymentText } from "@/lib/seo/localDelivery";
import { isIndexableLocalPage } from "@/lib/seo/localIndexPolicy";
import { specialtyLocalSlugs } from "@/lib/seo/priorityLocalities";
import { configuratorPath, siteKeyFromOrigin } from "@/lib/seo/siteSpecialization";
import { getTown, topTowns, townsOfCounty } from "@/lib/seo/localTowns";
import { nearestTownsFor, villagesByTown } from "@/lib/seo/villageTowns";
import { localUseCases, townProfile } from "@/lib/seo/localUseCases";
import { SourceNote } from "@/components/seo/LocalitySeo";

/**
 * Blocurile unice ale paginilor /judet/... (oraș și oraș × produs), randate pe server din date reale:
 * livrarea (regulile din coș), prețuri pentru mărimile cele mai cerute (același motor ca
 * configuratorul), exemple de utilizare din domeniile firmelor locale, blocul editorial opțional
 * (data/local-content/...), orașele apropiate cu distanța. Fără JavaScript pe client.
 *
 * FIȘIER IDENTIC ÎN TOATE CELE 6 REPO-URI.
 */

type Place = { judetSlug: string; locSlug: string; locName: string; judetName?: string };

const origin = () => String(siteConfig.url || "").replace(/\/+$/, "").toLowerCase();
const fmtInt = (n: number) => Math.round(n).toLocaleString("ro-RO");
const fmtKm = (n: number) => n.toLocaleString("ro-RO", { maximumFractionDigits: 1 });

function Section({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
    return (
        <section className={className ?? "border-t border-slate-100 bg-white py-10"}>
            <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h2>
                {children}
            </div>
        </section>
    );
}

/** Numele afișat și adresa configuratorului pentru o cheie de produs sau o familie din catalog. */
export function productInfo(key: string): { name: string; configUrl: string } | undefined {
    const cfg = CONFIGURATORS_REGISTRY.find((c) => c.id === key || c.slug === key);
    if (cfg) return { name: getProductDisplayName([cfg.id], cfg.name), configUrl: configuratorPath(origin(), cfg.url) };
    const fam = getCatalogFamily(key);
    if (fam) return { name: fam.name, configUrl: `/produse/${fam.category}` };
    // Produse fără configurator în registru (ex. semnalistica): titlul și adresa produsului.
    const prod = getProductBySlug(key) as { title?: string; routeSlug?: string } | undefined;
    if (prod?.title && prod.routeSlug) return { name: getProductDisplayName([key], prod.title), configUrl: configuratorPath(origin(), prod.routeSlug) };
    return undefined;
}

/** Legătura pentru produsul `key` într-o localitate: pagina locală dacă e indexabilă, altfel configuratorul. */
export function localOrConfigHref(judetSlug: string, locSlug: string, key: string): string {
    if (isIndexableLocalPage(origin(), judetSlug, locSlug, [key])) return `/judet/${judetSlug}/${locSlug}/${key}`;
    return productInfo(key)?.configUrl ?? `/judet/${judetSlug}/${locSlug}`;
}

// ------------------------------------------------------------------- livrare

export function LocalDeliveryBlock({ judetSlug, locSlug, locName, judetName, productKey }: Place & { productKey?: string }) {
    const f = deliveryFacts();
    const d = getLocalityData(judetSlug, locSlug);
    const county = getCountyData(judetSlug);
    const rows: Array<{ label: string; value: React.ReactNode }> = [
        { label: "Termen", value: `${deliveryDaysText(f)}, producție inclusă${f.cutoffHour != null ? ` (comenzile confirmate până la ${f.cutoffHour}:00 intră în lucru în aceeași zi lucrătoare)` : ""}` },
        { label: "Curier", value: `${f.courier}, la adresa ta din ${locName} sau la un locker / punct ${f.courier} ales la finalizarea comenzii` },
        { label: "Transport", value: shippingCostText(f) },
        { label: "Plata", value: paymentText(productKey, f) },
    ];
    if (d && !d.ambiguous) {
        if (d.postalCode) rows.push({ label: "Cod poștal", value: d.postalCode });
        if (typeof d.distanceToCountySeatKm === "number" && county?.seat?.name && county.seat.slug !== locSlug) {
            rows.push({ label: `Distanța până la ${county.seat.name}`, value: `~${fmtKm(d.distanceToCountySeatKm)} km în linie dreaptă` });
        }
    }
    return (
        <Section title={`Livrare în ${locName}${judetName ? `, județul ${judetName}` : ""}`}>
            <dl className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                {rows.map((r) => (
                    <div key={r.label}>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{r.label}</dt>
                        <dd className="mt-0.5 text-slate-700">{r.value}</dd>
                    </div>
                ))}
            </dl>
            <p className="mt-3 text-[11px] leading-snug text-slate-400">Aceleași reguli ca în coș: termenul și costul exact apar înainte de plată.</p>
        </Section>
    );
}

// ------------------------------------------------------------------- prețuri

type PriceRow = { key: string; name: string; href: string; sizes: Array<{ label: string; price: string }>; from?: string; basis?: string };

function priceRow(judetSlug: string, locSlug: string, key: string): PriceRow | undefined {
    const info = productInfo(key);
    if (!info) return undefined;
    const href = localOrConfigHref(judetSlug, locSlug, key);
    if (isDimensionProduct(key)) {
        // Primele 3 din aceleași 6 mărimi populare din care se calculează „de la” (getFromPrice): prețuri identice cu pagina produsului.
        const sizes = getPopularSizes(key, 6)
            .map((s) => ({ s, p: getDimensionPricing(key, s.w, s.h) }))
            .filter((x) => x.p && x.p.fromPrice > 0)
            .slice(0, 3)
            .map(({ s, p }) => ({ label: `${s.w}×${s.h} cm${s.label && !/\d\s*[x×]\s*\d/.test(s.label) ? ` (${s.label})` : ""}`, price: formatLei(p!.fromPrice) }));
        const from = getFromPrice([key]);
        if (sizes.length) return { key, name: info.name, href, sizes, from: from?.text, basis: from?.basis };
    }
    const from = getFromPrice([key]);
    return { key, name: info.name, href, sizes: [], from: from?.text, basis: from?.basis };
}

/** Prețurile produselor de specialitate ale site-ului, pentru mărimile cele mai cerute. */
export function LocalSpecialtyPrices({ judetSlug, locSlug, locName, exclude }: Place & { exclude?: string }) {
    const rows = specialtyLocalSlugs(origin())
        .filter((k) => k !== exclude)
        .map((k) => priceRow(judetSlug, locSlug, k))
        .filter((r): r is PriceRow => Boolean(r) && (r!.sizes.length > 0 || Boolean(r!.from)));
    if (!rows.length) return null;
    return (
        <Section title={exclude ? `Alte produse cu livrare în ${locName}` : `Prețuri pentru comenzile din ${locName}`}>
            <p className="mt-2 text-sm text-slate-600">Prețuri „de la”, pe bucată, pentru mărimile cele mai cerute, calculate cu același motor ca în configurator (furnizorul nu este plătitor de TVA). Transportul se adaugă în coș.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rows.map((r) => (
                    <div key={r.key} className="rounded-2xl border border-slate-200 p-4">
                        <h3 className="font-bold text-slate-900">
                            <Link href={r.href} className="hover:text-emerald-700 hover:underline">{r.name}{r.href.startsWith("/judet/") ? ` în ${locName}` : ""}</Link>
                        </h3>
                        {r.sizes.length > 0 ? (
                            <ul className="mt-2 space-y-1 text-sm text-slate-700">
                                {r.sizes.map((s) => (
                                    <li key={s.label} className="flex justify-between gap-3"><span>{s.label}</span><span>de la <b className="text-slate-900">{s.price}</b></span></li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-2 text-sm text-slate-700">de la <b className="text-slate-900">{r.from}</b>{r.basis ? ` (${r.basis})` : ""}</p>
                        )}
                    </div>
                ))}
            </div>
        </Section>
    );
}

// ------------------------------------------------------------------- utilizări

export function LocalUseCasesBlock({ judetSlug, locSlug, locName }: Place) {
    const d = getLocalityData(judetSlug, locSlug);
    const editorial = getLocalEditorial(origin(), judetSlug, locSlug);
    const site = siteKeyFromOrigin(origin()) ?? "shopprint";
    const specialty = new Set(specialtyLocalSlugs(origin()));
    const town = getTown(judetSlug, locSlug);
    const sections = d && !d.ambiguous ? d.firms?.topSections : undefined;
    const cases = localUseCases(site, sections, (k) => specialty.has(k));
    const profile = d && !d.ambiguous ? townProfile({ isCountySeat: town?.isCountySeat, typeLabel: d.typeLabel, sections }) : [];
    const editorialCases = editorial?.useCases ?? [];
    if (!cases.length && !editorialCases.length) return null;
    const pop = d && !d.ambiguous && typeof d.population === "number" && d.population > 0 ? d.population : undefined;
    return (
        <Section title={`Pentru ce se comandă în ${locName}`}>
            {(d?.typeLabel || pop || d?.firms?.count) && !d?.ambiguous ? (
                <p className="mt-2 text-sm text-slate-600">
                    {d?.typeLabel ? `${locName}: ${d.typeLabel}` : locName}
                    {pop ? `, ${fmtInt(pop)} locuitori (RPL 2021)` : ""}
                    {d?.firms?.count ? `, ${fmtInt(d.firms.count)} firme active` : ""}
                    {profile.length ? ` — ${profile.join(", ")}` : ""}.
                </p>
            ) : null}
            <ul className="mt-4 space-y-3">
                {cases.map((c) => (
                    <li key={c.section} className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">{c.section.charAt(0).toUpperCase() + c.section.slice(1)}</span>
                        {typeof c.count === "number" ? ` (${fmtInt(c.count)} firme)` : ""}: {c.text}.{" "}
                        <Link href={localOrConfigHref(judetSlug, locSlug, c.productKey)} className="font-semibold text-emerald-700 hover:underline">
                            {productInfo(c.productKey)?.name ?? c.productKey}
                        </Link>
                    </li>
                ))}
                {editorialCases.map((u) => (
                    <li key={u} className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">{u}</li>
                ))}
            </ul>
            {cases.length > 0 && <SourceNote judetSlug={judetSlug} keys={["firms", "siruta", "population"]} />}
        </Section>
    );
}

// ------------------------------------------------------------------- editorial

export function LocalEditorialBlock({ judetSlug, locSlug, locName }: Place) {
    const e = getLocalEditorial(origin(), judetSlug, locSlug);
    if (!e?.intro) return null;
    return (
        <Section title={`Despre comenzile din ${locName}`}>
            <p className="mt-3 text-base leading-relaxed text-slate-700">{e.intro}</p>
            {e.updatedAt && <p className="mt-2 text-xs text-slate-400">Actualizat la {e.updatedAt.split("-").reverse().join(".")}</p>}
        </Section>
    );
}

// ------------------------------------------------------------------- orașe apropiate

/** Cele mai apropiate 6 orașe; pe o pagină de produs leagă același produs, dacă pagina e indexabilă acolo. */
export function NearestTownsBlock({ judetSlug, locSlug, locName, productKey, productName, max = 6 }: Place & { productKey?: string; productName?: string; max?: number }) {
    const towns = nearestTownsFor(judetSlug, locSlug, max);
    if (!towns.length) return null;
    const hasKm = towns.some((t) => typeof t.km === "number");
    return (
        <Section title={productName ? `${productName} și în orașele apropiate de ${locName}` : `Orașe apropiate de ${locName}`}>
            <ul className="mt-4 flex flex-wrap gap-2">
                {towns.map((t) => {
                    const withProduct = productKey && isIndexableLocalPage(origin(), t.judetSlug, t.slug, [productKey]);
                    const href = withProduct ? `/judet/${t.judetSlug}/${t.slug}/${productKey}` : `/judet/${t.judetSlug}/${t.slug}`;
                    return (
                        <li key={`${t.judetSlug}/${t.slug}`}>
                            <Link href={href} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-emerald-400 hover:text-emerald-700">
                                {withProduct && productName ? `${productName} ${t.name}` : t.name}
                                {typeof t.km === "number" && <small className="font-normal text-slate-500">{fmtKm(t.km)} km</small>}
                            </Link>
                        </li>
                    );
                })}
                <li>
                    <Link href={`/judet/${judetSlug}`} className="inline-flex rounded-xl border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-600 hover:text-emerald-700">Toate localitățile din județ</Link>
                </li>
            </ul>
            {hasKm && <SourceNote judetSlug={judetSlug} keys={["osm"]} prefix="Distanțe în linie dreaptă" />}
        </Section>
    );
}

// ------------------------------------------------------------------- pagina configuratorului

/** Pe pagina unui produs (configurator): cele mai mari 12 orașe, cu pagina locală a produsului (doar dacă e indexabilă). */
export function TopTownsForProduct({ productKey, max = 12 }: { productKey: string; max?: number }) {
    const info = productInfo(productKey);
    if (!info) return null;
    const towns = topTowns(40).filter((t) => isIndexableLocalPage(origin(), t.judetSlug, t.slug, [productKey])).slice(0, max);
    if (!towns.length) return null;
    return (
        <section className="border-t border-slate-100 bg-white py-10">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                <h2 className="text-xl font-bold text-slate-900">{info.name} cu livrare în orașele mari</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                    {towns.map((t) => (
                        <li key={`${t.judetSlug}/${t.slug}`}>
                            <Link href={`/judet/${t.judetSlug}/${t.slug}/${productKey}`} className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:border-emerald-400 hover:text-emerald-700">
                                {info.name} {t.name}
                            </Link>
                        </li>
                    ))}
                    <li><Link href="/judet" className="inline-flex rounded-xl border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-600 hover:text-emerald-700">Toate județele</Link></li>
                </ul>
            </div>
        </section>
    );
}

/** Toate blocurile unice, în ordinea pentru pagina de oraș sau oraș × produs. */
export function LocalTownSections({ hideNearest, ...props }: Place & { productKey?: string; productName?: string; hideNearest?: boolean }) {
    return (
        <>
            <LocalEditorialBlock {...props} />
            <LocalDeliveryBlock {...props} />
            <LocalSpecialtyPrices {...props} exclude={props.productKey} />
            <LocalUseCasesBlock {...props} />
            {!hideNearest && <NearestTownsBlock {...props} />}
        </>
    );
}

// ------------------------------------------------------------------- pagina județului

/**
 * Pagina județului: toate orașele (legături), iar comunele și satele grupate sub orașul cel mai
 * apropiat. Satele fără pagină indexabilă apar ca text (pagina lor rămâne accesibilă, noindex);
 * cele cu afișări în Search Console păstrează legătura.
 */
export function CountyLocalitiesByTown({ judetSlug, judetName, localitati }: { judetSlug: string; judetName: string; localitati: Array<{ slug: string; name: string }> }) {
    const bySlug = new Map(localitati.map((l) => [l.slug, withDisplayName(judetSlug, l) ?? l]));
    const towns = townsOfCounty(judetSlug).filter((t) => bySlug.has(t.slug));
    const groups = villagesByTown(judetSlug);
    const total = localitati.length;
    return (
        <details className="group mt-6 rounded-2xl border border-slate-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-semibold text-slate-900">
                Toate cele {total} de localități din județul {judetName}, după orașul cel mai apropiat
                <span className="text-emerald-600 transition group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <div className="space-y-4 border-t border-slate-100 p-5">
                {towns.map((t) => {
                    const list = (groups.get(t.slug) ?? [])
                        .map((v) => ({ ...v, name: bySlug.get(v.slug)?.name }))
                        .filter((v): v is { slug: string; km?: number; name: string } => Boolean(v.name))
                        .sort((a, b) => a.name.localeCompare(b.name, "ro"));
                    return (
                        <div key={t.slug} className="text-sm leading-7 text-slate-600">
                            <Link href={`/judet/${judetSlug}/${t.slug}`} className="font-semibold text-slate-900 hover:text-emerald-700">{bySlug.get(t.slug)?.name ?? t.name}</Link>
                            {list.length > 0 && <span className="text-slate-400"> — livrăm și în: </span>}
                            {list.map((v, i) => (
                                <React.Fragment key={v.slug}>
                                    {i > 0 && <span className="text-slate-300"> · </span>}
                                    {isIndexableLocalPage(origin(), judetSlug, v.slug) ? (
                                        <Link href={`/judet/${judetSlug}/${v.slug}`} className="hover:text-emerald-700">{v.name}</Link>
                                    ) : (
                                        <span>{v.name}</span>
                                    )}
                                    {typeof v.km === "number" && <small className="text-slate-400"> ({v.km} km)</small>}
                                </React.Fragment>
                            ))}
                        </div>
                    );
                })}
            </div>
        </details>
    );
}
