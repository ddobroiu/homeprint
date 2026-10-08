#!/usr/bin/env node
// Manifestul ilustrațiilor de județ: public/local/judete/<judet>.webp + alt.json
//   -> lib/seo/data/countyImages.json (citit de lib/seo/countyImages.ts la build).
//
//   npm run local:images          doar fișierele urmărite în git (comise sau `git add`) – varianta de comis
//   npm run local:images -- --all și fișierele netrecute în git (doar pentru previzualizare locală; NU comite așa)
//
// Paginile afișează imaginea doar pentru județele din manifest, deci un fișier lipsă
// nu produce niciodată o imagine stricată / un 404. După ce se adaugă imagini noi:
// git add public/local/judete && npm run local:images && rebuild.
// Excluderi temporare (imagine de refăcut): lib/seo/data/countyImages.exclude.json  { "<judet>": "motiv" }.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const dir = path.join(root, "public", "local", "judete");
const out = path.join(root, "lib", "seo", "data", "countyImages.json");
const excludeFile = path.join(root, "lib", "seo", "data", "countyImages.exclude.json");
const includeUntracked = process.argv.includes("--all");

const counties = JSON.parse(fs.readFileSync(path.join(root, "lib", "seo", "ro_localitati.json"), "utf8")).map((j) => j.slug);
const readJson = (file) => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {});
const alts = readJson(path.join(dir, "alt.json"));
const exclude = readJson(excludeFile);

function tracked() {
    try {
        const outp = execFileSync("git", ["ls-files", "-z", "--", "public/local/judete"], { cwd: root, encoding: "utf8" });
        return new Set(outp.split("\0").filter(Boolean).map((f) => path.basename(f)));
    } catch {
        return new Set();
    }
}

// Dimensiunile din antetul WebP (VP8 / VP8L / VP8X), fără dependențe.
function webpSize(file) {
    const b = fs.readFileSync(file);
    if (b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WEBP") return null;
    const chunk = b.toString("ascii", 12, 16);
    if (chunk === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
        const bits = b.readUInt32LE(21);
        return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8X") return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
    return null;
}

const inGit = tracked();
const images = {};
const skipped = [];
const untracked = [];
for (const slug of counties) {
    const name = `${slug}.webp`;
    const file = path.join(dir, name);
    if (!fs.existsSync(file)) continue;
    if (exclude[slug]) { skipped.push(`${slug} (exclus: ${exclude[slug]})`); continue; }
    if (!includeUntracked && !inGit.has(name)) { untracked.push(slug); continue; }
    const alt = typeof alts[slug] === "string" ? alts[slug].trim() : "";
    if (!alt) { skipped.push(`${slug} (lipsește alt în alt.json)`); continue; }
    const size = webpSize(file);
    if (!size || !size.width || !size.height) { skipped.push(`${slug} (WebP invalid)`); continue; }
    images[slug] = { src: `/local/judete/${name}`, width: size.width, height: size.height, alt };
}

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify({ mode: includeUntracked ? "all" : "tracked", images }, null, 2) + "\n");
console.log(`countyImages.json: ${Object.keys(images).length}/${counties.length} județe${includeUntracked ? " (inclusiv netrecute în git – nu comite)" : ""}`);
if (untracked.length) console.log(`omise ${untracked.length} netrecute în git (${untracked.slice(0, 5).join(", ")}${untracked.length > 5 ? ", …" : ""}): git add public/local/judete, apoi rulează din nou`);
if (skipped.length) console.log(`omise: ${skipped.join(", ")}`);
