import { Hono } from "hono";
import { contactPage } from "./web/contact";
import { homePage } from "./web/home";

const app = new Hono();

app.get("/", (c) => {
  return c.html(homePage());
});

app.get("/contact", (c) => c.html(contactPage()));

app.notFound((c) => c.redirect("/"));

export default app;
