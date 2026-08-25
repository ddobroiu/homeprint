import * as fs from 'fs';
import * as path from 'path';

const PROJECTS = [
    { name: 'Visionboard', isSrc: true, brand: 'Visionboard', url: 'visionboard.ro' },
    { name: 'euprint', isSrc: false, brand: 'euprint', url: 'euprint.ro' },
    { name: 'prynt', isSrc: false, brand: 'Prynt', url: 'prynt.ro' },
    { name: 'shopprint', isSrc: false, brand: 'ShopPrint', url: 'shopprint.ro' },
    { name: 'tablou', isSrc: false, brand: 'Tablou', url: 'tablou.net' }
];

const HOMEPRINT_PATH = 'e:/eu/homeprint';
const BASE_PATH = 'e:/eu';

// Fix function to copy and replace text
function copyAndReplace(src: string, dest: string, brand: string, url: string) {
    if (!fs.existsSync(src)) {
        console.log("Missing " + src);
        return;
    }
    let content = fs.readFileSync(src, 'utf-8');
    // Replace "HomePrint" with the target brand
    content = content.replace(/HomePrint/g, brand);
    content = content.replace(/www\.homeprint\.ro/g, url);
    content = content.replace(/HomePrint\.ro/g, url);

    // Create dir if doesn't exist
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(dest, content, 'utf-8');
}

async function main() {
    for (const proj of PROJECTS) {
        console.log(`Syncing to ${proj.name}...`);

        const projDir = path.join(BASE_PATH, proj.name);
        const libDir = proj.isSrc ? path.join(projDir, 'src/lib') : path.join(projDir, 'lib');
        const appDir = proj.isSrc ? path.join(projDir, 'src/app') : path.join(projDir, 'app');

        // 1. ro_localitati.json
        copyAndReplace(
            path.join(HOMEPRINT_PATH, 'lib/seo/ro_localitati.json'),
            path.join(libDir, 'seo/ro_localitati.json'),
            proj.brand,
            proj.url
        );

        // 2. localitati.ts
        copyAndReplace(
            path.join(HOMEPRINT_PATH, 'lib/localitati.ts'),
            path.join(libDir, 'localitati.ts'),
            proj.brand,
            proj.url
        );

        // Clear old app/judet and app/judet/[slug]
        const judetDir = path.join(appDir, 'judet');
        if (fs.existsSync(judetDir)) {
            fs.rmSync(judetDir, { recursive: true, force: true });
        }

        // 3. app/judet/page.tsx
        copyAndReplace(
            path.join(HOMEPRINT_PATH, 'app/judet/page.tsx'),
            path.join(judetDir, 'page.tsx'),
            proj.brand,
            proj.url
        );

        // 4. app/judet/[judetSlug]/page.tsx
        copyAndReplace(
            path.join(HOMEPRINT_PATH, 'app/judet/[judetSlug]/page.tsx'),
            path.join(judetDir, '[judetSlug]/page.tsx'),
            proj.brand,
            proj.url
        );

        // 5. app/judet/[judetSlug]/[localitateSlug]/page.tsx
        copyAndReplace(
            path.join(HOMEPRINT_PATH, 'app/judet/[judetSlug]/[localitateSlug]/page.tsx'),
            path.join(judetDir, '[judetSlug]/[localitateSlug]/page.tsx'),
            proj.brand,
            proj.url
        );

        // 6. app/judet/[judetSlug]/[localitateSlug]/[productSlug]/page.tsx
        copyAndReplace(
            path.join(HOMEPRINT_PATH, 'app/judet/[judetSlug]/[localitateSlug]/[productSlug]/page.tsx'),
            path.join(judetDir, '[judetSlug]/[localitateSlug]/[productSlug]/page.tsx'),
            proj.brand,
            proj.url
        );

        console.log(`Synced ${proj.name} UI files successfully!`);
    }
}

main();
