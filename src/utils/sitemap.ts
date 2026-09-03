const BASE_URL = "https://www.jimvanduijsen.com";

// Bump a page's lastmod when its content actually changes.
const pages = [
	{ path: "/", lastmod: "2026-09-03" },
	{ path: "/about", lastmod: "2026-08-10" },
	{ path: "/contact", lastmod: "2026-08-10" },
	{ path: "/software", lastmod: "2026-09-03" },
];

export const sitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(({ path, lastmod }) => `  <url><loc>${BASE_URL}${path}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}
</urlset>`;
