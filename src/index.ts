import { Hono } from "hono";
import { aboutPage } from "./pages/about.js";
import { contactPage } from "./pages/contact.js";
import { homePage } from "./pages/home.js";
import { sitemap } from "./utils/sitemap.js";
import { proxyUmami } from "./utils/umami-proxy.js";

const app = new Hono();

app.get("/sitemap.xml", (c) =>
  c.text(sitemap(), 200, { "Content-Type": "application/xml" }),
);

app.get("/", (c) => c.html(homePage()));

app.get("/contact", (c) => c.html(contactPage()));

app.get("/about", (c) => c.html(aboutPage()));

app.get("/tjb-ai-redir", (c) =>
  c.redirect("https://umami.app.jimvd.xyz/q/4cGtGB35i"),
);

app.get("/u/script.js", (c) => proxyUmami(c.req.raw, "/script.js"));

app.all("/u/api/send", (c) => proxyUmami(c.req.raw, "/api/send"));

app.notFound((c) => c.redirect("/"));

export default app;
