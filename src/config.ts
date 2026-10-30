// Single place that reads Worker env vars/secrets. Everything else takes the
// typed AppConfig instead of touching raw bindings.
export type AppBindings = {
	SMTP_HOST: string;
	SMTP_PORT?: string;
	SMTP_USER: string;
	SMTP_PASS: string;
	CONTACT_TO_EMAIL: string;
	CONTACT_FROM_EMAIL: string;
};

export type AppConfig = {
	smtp: {
		host: string;
		port: number;
		username: string;
		password: string;
	};
	contact: {
		to: string;
		from: string;
	};
};

const required = [
	"SMTP_HOST",
	"SMTP_USER",
	"SMTP_PASS",
	"CONTACT_TO_EMAIL",
	"CONTACT_FROM_EMAIL",
] as const;

export const getConfig = (env: AppBindings): AppConfig => {
	const missing = required.filter((key) => !env[key]);
	if (missing.length > 0) {
		throw new Error(`Missing environment variables: ${missing.join(", ")}`);
	}

	return {
		smtp: {
			host: env.SMTP_HOST,
			port: Number(env.SMTP_PORT) || 587,
			username: env.SMTP_USER,
			password: env.SMTP_PASS,
		},
		contact: {
			to: env.CONTACT_TO_EMAIL,
			from: env.CONTACT_FROM_EMAIL,
		},
	};
};
