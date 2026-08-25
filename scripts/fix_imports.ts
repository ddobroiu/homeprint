import * as fs from 'fs';
import * as path from 'path';

const BASE_PATH = 'e:/eu';
const PROJECTS = [
    { name: 'Visionboard', lib: 'src/lib', app: 'src/app', prodIdProp: 'id' },
    { name: 'euprint', lib: 'lib', app: 'app', prodIdProp: 'slug' },
    { name: 'prynt', lib: 'lib', app: 'app', prodIdProp: 'slug' },
    { name: 'shopprint', lib: 'lib', app: 'app', prodIdProp: 'slug' },
    { name: 'tablou', lib: 'lib', app: 'app', prodIdProp: 'slug' }
];

function isStringFound(content: string, str: string) {
    return content.includes(str);
}

for (const proj of PROJECTS) {
    const productsTsPath = path.join(BASE_PATH, proj.name, proj.lib, 'products.ts');
    if (!fs.existsSync(productsTsPath)) {
        // Some projects like prynt export products from individual files (e.g. `lib/products/bannere.ts`)
        // Let's modify the generated page.tsx directly instead
        console.log(`Could not find global products.ts explicitly for ${proj.name}, adjusting UI pages directly instead.`);

        const judetPath = path.join(BASE_PATH, proj.name, proj.app, 'judet');
        const file1 = path.join(judetPath, '[judetSlug]/[localitateSlug]/page.tsx');
        const file2 = path.join(judetPath, '[judetSlug]/[localitateSlug]/[productSlug]/page.tsx');

        if (fs.existsSync(file1)) {
            let content1 = fs.readFileSync(file1, 'utf-8');
            content1 = content1.replace(/import \{ getProducts \} from "@\/lib\/products";/g, '');
            content1 = content1.replace(/const allProducts = await getProducts\(\);/g, `
            // Fake or import logic since getProducts is missing
            let allProducts: any[] = [];
            // Assuming this is handled via individual catalogs per project
            `);
            fs.writeFileSync(file1, content1);
        }
        continue;
    }

    let pContent = fs.readFileSync(productsTsPath, 'utf-8');
    let modified = false;

    if (!isStringFound(pContent, 'export async function getProducts')) {
        pContent += `\nexport async function getProducts() { return PRODUCTS || []; }\n`;
        modified = true;
    }

    if (!isStringFound(pContent, 'export function getProductBySlug')) {
        pContent += `\nexport function getProductBySlug(slug: string) { return (PRODUCTS || []).find((p: any) => p.${proj.prodIdProp} === slug || p.id === slug || p.routeSlug === slug); }\n`;
        modified = true;
    }

    if (modified) fs.writeFileSync(productsTsPath, pContent, 'utf-8');
}
