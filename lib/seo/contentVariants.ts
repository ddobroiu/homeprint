/**
 * Deterministic content-variant selection for programmatic SEO pages.
 *
 * Same technique used in lib/blogPosts.ts's buildCountyPost: instead of one
 * fixed template with a name swapped in (thin/duplicate content), pick one of
 * several STRUCTURALLY different variants per page, keyed by a stable seed
 * (e.g. the page's slug) so the same page always renders the same variant.
 * This is intentionally NOT spintax (word-swap within one skeleton) - the
 * variants should differ in headline formula, section order/angle, and which
 * facts are surfaced, not just synonyms.
 */

export function hashSeed(str: string): number {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
}

/** Deterministically picks an index in [0, variantCount) from a seed string. */
export function pickVariant(seed: string, variantCount: number): number {
    return hashSeed(seed) % variantCount;
}

/** Deterministically rotates the start offset into an array, from a seed string. */
export function pickOffset(seed: string, arrayLength: number): number {
    if (arrayLength <= 0) return 0;
    return hashSeed(seed) % arrayLength;
}

/** Returns `count` items from `arr`, starting at a seeded rotating offset, wrapping around. */
export function pickRotating<T>(arr: T[], seed: string, count: number): T[] {
    if (arr.length === 0) return [];
    const offset = pickOffset(seed, arr.length);
    const out: T[] = [];
    for (let i = 0; i < count; i++) out.push(arr[(offset + i) % arr.length]);
    return out;
}
