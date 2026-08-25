// Curated list of real, well-known Romanian localities (all 41 județ reședințe
// plus other major municipii / orașe) used to build the județ x localitate
// sitemap section without the previous full combinatorics (every locality in
// lib/seo/ro_localitati.json, ~13k+ entries).
//
// Matching is case- and diacritics-insensitive against each județ's
// `localitati` array in ro_localitati.json. If a name below has no match in a
// given județ, it is silently skipped (see getTargetLocalitiesReport()).
import { JUDETE_FULL_DATA, Judet, Localitate } from "@/lib/localitati";

export const TARGET_LOCALITIES: string[] = [
    // Alba
    "Alba Iulia", "Aiud", "Blaj", "Sebeș", "Cugir", "Ocna Mureș",
    // Arad
    "Arad", "Ineu", "Lipova", "Chișineu-Criș", "Sântana", "Curtici", "Pecica",
    // Argeș
    "Pitești", "Câmpulung", "Curtea de Argeș", "Mioveni", "Topoloveni",
    // Bacău
    "Bacău", "Onești", "Moinești", "Comănești", "Buhuși", "Târgu Ocna",
    // Bihor
    "Oradea", "Beiuș", "Salonta", "Marghita", "Aleșd", "Ștei", "Valea lui Mihai",
    // Bistrița-Năsăud
    "Bistrița", "Năsăud", "Beclean",
    // Botoșani
    "Botoșani", "Dorohoi", "Darabani", "Săveni",
    // Brăila
    "Brăila", "Ianca", "Însurăței",
    // Brașov
    "Brașov", "Făgăraș", "Săcele", "Codlea", "Zărnești", "Râșnov", "Predeal", "Victoria", "Rupea",
    // Buzău
    "Buzău", "Râmnicu Sărat", "Nehoiu",
    // Caraș-Severin
    "Reșița", "Caransebeș", "Oravița", "Bocșa", "Oțelu Roșu", "Moldova Nouă", "Anina",
    // Călărași
    "Călărași", "Oltenița", "Budești",
    // Cluj
    "Cluj-Napoca", "Turda", "Dej", "Câmpia Turzii", "Gherla", "Huedin",
    // Constanța
    "Constanța", "Medgidia", "Mangalia", "Năvodari", "Eforie", "Cernavodă", "Ovidiu", "Techirghiol", "Murfatlar", "Hârșova",
    // Covasna
    "Sfântu Gheorghe", "Târgu Secuiesc", "Baraolt", "Întorsura Buzăului",
    // Dâmbovița
    "Târgoviște", "Moreni", "Pucioasa", "Găești", "Titu", "Fieni",
    // Dolj
    "Craiova", "Băilești", "Calafat", "Filiași",
    // Galați
    "Galați", "Tecuci",
    // Giurgiu
    "Giurgiu", "Bolintin-Vale",
    // Gorj
    "Târgu Jiu", "Motru", "Rovinari", "Târgu Cărbunești",
    // Harghita
    "Miercurea Ciuc", "Odorheiu Secuiesc", "Gheorgheni", "Toplița", "Cristuru Secuiesc", "Bălan", "Vlăhița",
    // Hunedoara
    "Deva", "Hunedoara", "Petroșani", "Orăștie", "Brad", "Vulcan", "Lupeni", "Hațeg", "Simeria", "Călan",
    // Ialomița
    "Slobozia", "Fetești", "Urziceni", "Țăndărei",
    // Iași
    "Iași", "Pașcani", "Târgu Frumos", "Hârlău",
    // Ilfov (no traditional județ reședință - covered via other orașe)
    "Voluntari", "Otopeni", "Buftea", "Pantelimon", "Popești-Leordeni", "Chitila", "Măgurele", "Bragadiru", "Chiajna", "Afumați",
    // Maramureș
    "Baia Mare", "Sighetu Marmației", "Baia Sprie", "Vișeu de Sus", "Borșa", "Târgu Lăpuș",
    // Mehedinți
    "Drobeta-Turnu Severin", "Orșova", "Strehaia", "Vânju Mare",
    // Mureș
    "Târgu Mureș", "Reghin", "Sighișoara", "Târnăveni", "Luduș", "Sovata", "Iernut",
    // Neamț
    "Piatra Neamț", "Roman", "Târgu Neamț", "Bicaz",
    // Olt
    "Slatina", "Caracal", "Balș", "Corabia",
    // Prahova
    "Ploiești", "Câmpina", "Sinaia", "Bușteni", "Azuga", "Mizil", "Vălenii de Munte",
    // Satu Mare
    "Satu Mare", "Carei", "Negrești-Oaș",
    // Sălaj
    "Zalău", "Șimleu Silvaniei", "Jibou", "Cehu Silvaniei",
    // Sibiu
    "Sibiu", "Mediaș", "Cisnădie", "Avrig", "Agnita", "Copșa Mică",
    // Suceava
    "Suceava", "Fălticeni", "Rădăuți", "Câmpulung Moldovenesc", "Vatra Dornei", "Siret", "Gura Humorului",
    // Teleorman
    "Alexandria", "Roșiorii de Vede", "Turnu Măgurele", "Zimnicea", "Videle",
    // Timiș
    "Timișoara", "Lugoj", "Sânnicolau Mare", "Jimbolia", "Făget", "Deta", "Recaș",
    // Tulcea
    "Tulcea", "Măcin", "Babadag", "Isaccea",
    // Vaslui
    "Vaslui", "Bârlad", "Huși", "Negrești",
    // Vâlcea
    "Râmnicu Vâlcea", "Drăgășani", "Băbeni", "Horezu",
    // Vrancea
    "Focșani", "Adjud", "Panciu", "Odobești", "Mărășești",
    // București
    "București",
];

export function normalizeLocName(s: string): string {
    return (s || "")
        .toString()
        .normalize("NFD")
        .replace(new RegExp("[̀-ͯ]", "g"), "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}

export type MatchedLocality = { judet: Judet; loc: Localitate };

let _cache: MatchedLocality[] | null = null;

/**
 * Resolves TARGET_LOCALITIES against JUDETE_FULL_DATA (case/diacritics-insensitive).
 * Also includes București's individual sector entries ("Sector 1".."Sector 6")
 * when present in the data, since they are indexed as separate localities.
 * If a județ has no match in TARGET_LOCALITIES at all (e.g. Ilfov, which has no
 * traditional județ reședință), it falls back to that județ's first listed
 * locality so every județ still gets at least one page in the sitemap.
 */
export function getTargetLocalities(): MatchedLocality[] {
    if (_cache) return _cache;

    const targetSet = new Set(TARGET_LOCALITIES.map(normalizeLocName));
    const result: MatchedLocality[] = [];
    const matchedJudeteSlugs = new Set<string>();

    for (const judet of JUDETE_FULL_DATA) {
        let matchedInThisJudet = false;

        for (const loc of judet.localitati) {
            if (targetSet.has(normalizeLocName(loc.name))) {
                result.push({ judet, loc });
                matchedInThisJudet = true;
            }
        }

        // București: also include individual sectors as separate landing pages.
        if (normalizeLocName(judet.name) === "bucuresti") {
            for (const loc of judet.localitati) {
                if (/^sector[1-6]$/.test(normalizeLocName(loc.name))) {
                    result.push({ judet, loc });
                    matchedInThisJudet = true;
                }
            }
        }

        if (matchedInThisJudet) {
            matchedJudeteSlugs.add(judet.slug);
        } else if (judet.localitati.length > 0) {
            // Fallback: no curated name matched in this județ - use its first
            // listed locality so the județ still has locality-level pages.
            result.push({ judet, loc: judet.localitati[0] });
        }
    }

    _cache = result;
    return result;
}

/**
 * Curated localities for a single județ (by slug) - used to gate internal
 * links / page generation so pages only fan out to the sitemap-listed set,
 * not the full ro_localitati.json dataset for that județ.
 */
export function getTargetLocalitiesForJudet(judetSlug: string): MatchedLocality[] {
    return getTargetLocalities().filter((m) => m.judet.slug === judetSlug);
}
