export type AboutItem = {
	title: string;
	subtitle?: string;
	link?: string;
	linkLabel?: string;
	body: string[];
	bullets?: string[];
};

export const story = {
	paragraphs: [
		"I'm a frontend developer working in Next.js, React and TypeScript, growing into full stack. I started building websites while still in high school, taught myself TypeScript and React, and turned that into client work, then a job. Today I work at Crypto Insiders and study International Business at THUAS. I'm available for part-time work.",
	],
	languages: "Dutch (native), English (fluent)",
};

export const experience: AboutItem[] = [
	{
		title: "Crypto Insiders",
		subtitle: "Frontend developer",
		link: "https://crypto-insiders.nl",
		linkLabel: "Visit Crypto Insiders",
		body: [
			"The largest crypto and blockchain news outlet in the Benelux. I worked on the migration from WordPress to Next.js and rebuilt many of the original pages pixel-perfect in React, TypeScript and Tailwind. I also implemented Google Publisher Tag to serve ads.",
		],
	},
	{
		title: "DC Lab website, THUAS",
		body: [
			"A site for the DC Lab research group where they publish events and papers. Built with Next.js, React, Tailwind and Payload CMS, so the team can update content without a developer.",
		],
	},
	{
		title: "Web agency (jimvd.xyz)",
		link: "https://jimvd.xyz",
		linkLabel: "Visit Jimvd.xyz",
		body: [
			"Before Crypto Insiders I ran a small web agency building Next.js and React sites for clients. The portfolio and testimonials are still online.",
		],
	},
];

export const projects: AboutItem[] = [
	{
		title: "Instantly add-on",
		body: [
			"Instantly.ai locked a feature I needed behind a plan that cost 50 euros more per month. I built my own add-on on top of their API, with AI help, and published the repo.",
		],
	},
	{
		title: "Self-hosted mail server",
		body: [
			"I run my own mail server for email marketing. In Mailreach inbox placement tests with real Microsoft and Google inboxes, Outlook reached up to 100% inbox placement, and Google deliverability is also strong when I send through an SMTP relay. I run it in two setups: inboxes on the server's own IP and inboxes behind SMTP relays.",
		],
	},
	{
		title: "Self-hosting and automation",
		body: ["I host my own services to avoid subscription and hosting fees."],
		bullets: [
			"Two VPS servers: one with Docker and Caddy as reverse proxy for automatic SSL and authentication, and one with Coolify, a self-hosted Vercel alternative that deploys straight from GitHub.",
			"n8n for deterministic workflows, mainly data cleaning and enrichment, self-hosted in Docker. Claude now handles most tasks that need judgment.",
			"A home agent server: an old laptop running Omarchy, DHH's agent-friendly Linux distribution, for long-running AI coding agents.",
		],
	},
	{
		title: "IoT and home automation",
		body: [
			"I've been building with IoT and home automation since I was 12. I run Home Assistant on a Pi with Zigbee networks, mainly using Philips Hue lighting. Hue bulbs are expensive, so I pair cheaper IKEA Zigbee bulbs with the Hue setup instead. I also program custom Arduino and ESP devices with ESPHome, Tasmota or the Arduino IDE, now paired with Claude Code, and I have some experience with MQTT.",
		],
	},
];

export const skills: AboutItem[] = [
	{
		title: "Next.js, React, TypeScript",
		body: ["My main stack, used at work and in every side project."],
	},
	{
		title: "AI coding agents",
		body: [
			"I learned to program first and added AI afterwards, so I can review and steer what it writes. I mainly use Claude Code, Codex and Pi, an open-source, minimalist coding agent with only read, write and bash tools.",
		],
	},
	{
		title: "Learning fast",
		body: [
			"When I had to implement Google Publisher Tag, Google's ad library, I got it running on the site quickly by combining the docs with AI. New tools rarely slow me down.",
		],
	},
	{
		title: "AI certificates",
		body: [
			"I hold several Nebius AI certificates on using and implementing AI well.",
		],
	},
];

export const otherLinks: { label: string; href: string }[] = [
	{
		label: "Portfolio and testimonials",
		href: "https://jimvd.xyz/testimonials",
	},
	{ label: "GitHub", href: "https://github.com/jim74763" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/jim-van-duijsen/" },
];
