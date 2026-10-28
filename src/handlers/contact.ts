import type { Context } from "hono";
import { type MailEnv, sendContactEmail } from "../utils/mail.js";

export const handleContact = async (c: Context<{ Bindings: MailEnv }>) => {
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
};
