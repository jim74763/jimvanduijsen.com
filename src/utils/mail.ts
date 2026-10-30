import { WorkerMailer } from "worker-mailer";
import type { AppConfig } from "../config.js";

type ContactMessage = {
	name: string;
	email: string;
	message: string;
};

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export const sendContactEmail = async (
	config: AppConfig,
	{ name, email, message }: ContactMessage,
) => {
	const { smtp, contact } = config;

	await WorkerMailer.send(
		{
			host: smtp.host,
			port: smtp.port,
			secure: smtp.port === 465,
			startTls: smtp.port !== 465,
			authType: "plain",
			credentials: { username: smtp.username, password: smtp.password },
		},
		{
			from: {
				name: "jimvanduijsen.com",
				email: contact.from,
			},
			to: contact.to,
			reply: { name: oneLine(name), email: oneLine(email) },
			subject: `New contact form message from ${oneLine(name)}`,
			text: `Name: ${oneLine(name)}\nEmail: ${oneLine(email)}\n\n${message}`,
		},
	);
};
