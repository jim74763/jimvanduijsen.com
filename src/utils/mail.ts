import { WorkerMailer } from "worker-mailer";

export type MailEnv = {
	SMTP_HOST: string;
	SMTP_PORT: string;
	SMTP_USER: string;
	SMTP_PASS: string;
	CONTACT_TO_EMAIL: string;
	CONTACT_FROM_EMAIL?: string;
};

type ContactMessage = {
	name: string;
	email: string;
	message: string;
};

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export const sendContactEmail = async (
	env: MailEnv,
	{ name, email, message }: ContactMessage,
) => {
	const port = Number(env.SMTP_PORT) || 587;

	await WorkerMailer.send(
		{
			host: env.SMTP_HOST,
			port,
			secure: port === 465,
			startTls: port !== 465,
			authType: "plain",
			credentials: { username: env.SMTP_USER, password: env.SMTP_PASS },
		},
		{
			from: {
				name: "jimvanduijsen.com",
				email: env.CONTACT_FROM_EMAIL!,
			},
			to: env.CONTACT_TO_EMAIL,
			reply: { name: oneLine(name), email: oneLine(email) },
			subject: `New contact form message from ${oneLine(name)}`,
			text: `Name: ${oneLine(name)}\nEmail: ${oneLine(email)}\n\n${message}`,
		},
	);
};
