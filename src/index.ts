import { Hono } from "hono";
import { aboutPage } from "./web/pages/about.js";
import { contactPage } from "./web/pages/contact.js";
import { homePage } from "./web/pages/home.js";

const app = new Hono();
const UMAMI_ORIGIN = "https://umami.app.jimvd.xyz";

const proxyUmami = (request: Request, upstreamPath: string) => {
  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(upstreamPath, UMAMI_ORIGIN);
  upstreamUrl.search = incomingUrl.search;

  return fetch(new Request(upstreamUrl.toString(), request));
};

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
