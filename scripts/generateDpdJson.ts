import * as fs from 'fs';
import * as path from 'path';
import { getAllSitesRO } from '../lib/dpdService';

function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

async function main() {
  process.env.DPD_USERNAME = '200926702';
  process.env.DPD_PASSWORD = '7276911683';
  
  console.log('Fetching sites from DPD...');
  const sites = await getAllSitesRO();
  console.log(`Fetched ${sites.length} sites.`);

  const judete: Record<string, { name: string; slug: string; localitati: Array<{ name: string; slug: string }> }> = {};

  for (const s of sites) {
    if (!s.region) continue;
    const regionName = s.region.trim();
    if (regionName === 'Bucuresti') {
      s.region = 'Bucuresti';
    }
    const judetSlug = slugify(s.region);
    if (!judete[judetSlug]) {
      judete[judetSlug] = {
        name: s.region,
        slug: judetSlug,
        localitati: [],
      };
    }

    const locName = s.name.trim();
    const locSlug = slugify(locName);

    // Evitam duplicatele
    if (!judete[judetSlug].localitati.find((l) => l.slug === locSlug)) {
      judete[judetSlug].localitati.push({ name: locName, slug: locSlug });
    }
  }

  // Sorteaza
  const judeteArr = Object.values(judete).sort((a, b) => a.name.localeCompare(b.name));
  for (const j of judeteArr) {
    j.localitati.sort((a, b) => a.name.localeCompare(b.name));
  }

  const outPath = path.join(__dirname, '../lib/seo/ro_localitati.json');
  fs.writeFileSync(outPath, JSON.stringify(judeteArr, null, 2), 'utf-8');
  console.log(`Saved to ${outPath}`);
}

main().catch(console.error);
