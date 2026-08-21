import { readFile, writeFile } from "node:fs/promises";

const BASE_URL = "https://www.prochure.app";

function toSlug(str) {
    return str.toLowerCase().replace(/\s+/g, "-");
}

function escapeXml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function buildUrl({ loc, lastmod, priority, changefreq = "weekly" }) {
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority.toFixed(1)}</priority>\n  </url>`;
}

const now = new Date().toISOString();

const urls = [
    buildUrl({ loc: `${BASE_URL}/`, lastmod: now, priority: 1.0, changefreq: "weekly" }),
];

const dataFiles = [
    { file: "src/data/consultants.json", type: "consultants", key: "consultant" },
    { file: "src/data/services.json", type: "services", key: "service" },
    { file: "src/data/products.json", type: "products", key: "product" },
];

for (const { file, type, key } of dataFiles) {
    const raw = await readFile(file, "utf-8");
    const json = JSON.parse(raw);
    const categories = json[key]?.categories || [];

    urls.push(buildUrl({ loc: `${BASE_URL}/${type}`, lastmod: now, priority: 0.8, changefreq: "weekly" }));

    for (const cat of categories) {
        const catSlug = toSlug(cat.name);
        const catUrl = `${BASE_URL}/${type}/${catSlug}`;
        urls.push(buildUrl({ loc: catUrl, lastmod: now, priority: 0.7, changefreq: "weekly" }));

        for (const sub of cat.subcategories || []) {
            const subSlug = toSlug(sub.name);
            urls.push(buildUrl({ loc: `${catUrl}/${subSlug}`, lastmod: now, priority: 0.6, changefreq: "weekly" }));
        }
    }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;

await writeFile("public/sitemap.xml", sitemap, "utf-8");
console.log(`Generated sitemap with ${urls.length} URLs`);
