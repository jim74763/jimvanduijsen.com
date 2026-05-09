import { Hono } from "hono";
import { aboutPage } from "./web/pages/about";
import { contactPage } from "./web/pages/contact";
import { homePage } from "./web/pages/home";

const app = new Hono();

app.get("/", (c) => c.html(homePage()));

app.get("/contact", (c) => c.html(contactPage()));

app.get("/about", (c) => c.html(aboutPage()));

app.get("/tjb-ai-redir", (c) =>
  c.redirect("https://umami.app.jimvd.xyz/q/4cGtGB35i"),
);

app.notFound((c) => c.redirect("/"));

export default app;
