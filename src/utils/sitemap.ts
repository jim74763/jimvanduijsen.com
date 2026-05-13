const BASE_URL = "https://www.jimvanduijsen.com";
const pages = ["/", "/about", "/contact"];

export const sitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((path) => `  <url><loc>${BASE_URL}${path}</loc></url>`).join("\n")}
</urlset>`;
