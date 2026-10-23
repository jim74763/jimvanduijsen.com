import { Hono } from "hono";
import { aboutPage } from "./pages/about.js";
import { contactPage } from "./pages/contact.js";
import { homePage } from "./pages/home.js";
import { softwarePage } from "./pages/software.js";
import { type MailEnv, sendContactEmail } from "./utils/mail.js";
import { sitemap } from "./utils/sitemap.js";
import { proxyUmami } from "./utils/umami-proxy.js";

const app = new Hono<{ Bindings: MailEnv }>();

app.get("/sitemap.xml", (c) =>
	c.text(sitemap(), 200, { "Content-Type": "application/xml" }),
);

app.get("/", (c) => c.html(homePage()));

app.get("/contact", (c) => c.html(contactPage()));

app.post("/contact", async (c) => {
	const body = await c.req.parseBody();
	const field = (key: string) =>
		typeof body[key] === "string" ? body[key].trim() : "";

	// Honeypot: bots fill the hidden field, pretend success.
	if (field("website")) return c.json({ ok: true });

	const name = field("name");
	const email = field("email");
	const message = field("message");
	if (
		!name ||
		!message ||
		!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
		name.length > 200 ||
		email.length > 200 ||
		message.length > 5000
	) {
		return c.json({ ok: false, error: "Please check your input." }, 400);
	}

	try {
		await sendContactEmail(c.env, { name, email, message });
		return c.json({ ok: true });
	} catch (error) {
		console.error("contact form send failed", error);
		return c.json({ ok: false, error: "Could not send your message." }, 500);
	}
});

app.get("/about", (c) => c.html(aboutPage()));

app.get("/software", (c) => c.html(softwarePage()));

app.get("/tjb-ai-redir", (c) =>
	c.redirect(
		"https://tjb.lead-blitz.com?utm_source=instantly-sending-domain&utm_medium=redirect&utm_campaign=instantly",
	),
);

app.get("/u/script.js", (c) => proxyUmami(c.req.raw, "/script.js"));

app.all("/u/api/send", (c) => proxyUmami(c.req.raw, "/api/send"));

app.notFound((c) => c.redirect("/"));

export default app;
