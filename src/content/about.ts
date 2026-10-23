export type AboutItem = {
	title: string;
	subtitle?: string;
	period?: string;
	link?: string;
	linkLabel?: string;
	extraLink?: { href: string; label: string };
	body?: string;
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
		period: "2025 to present",
		link: "https://crypto-insiders.nl",
		linkLabel: "Visit Crypto Insiders",
		body: "The largest crypto and blockchain news outlet in the Benelux. I worked on the migration from WordPress to Next.js, migrating 50+ pages and rebuilding many of the original pages pixel-perfect in React, TypeScript and Tailwind. I also implemented Google Publisher Tag to serve ads.",
	},
	{
		title: "DC Lab website, THUAS",
		link: "https://dc-lab.org",
		linkLabel: "Visit DC Lab",
		body: "A site for the DC Lab research group where they publish events and papers. Built with Next.js, React, Tailwind and Payload CMS, so the team can update content without a developer.",
	},
	{
		title: "Web agency (jimvd.xyz)",
		link: "https://jimvd.xyz",
		linkLabel: "Visit Jimvd.xyz",
		extraLink: {
			href: "https://jimvd.xyz/testimonials",
			label: "Portfolio and testimonials",
		},
		body: "Before Crypto Insiders I ran a small web agency building Next.js and React sites for clients. The portfolio and testimonials are still online.",
	},
];

export const education: AboutItem[] = [
	{
		title: "The Hague University of Applied Sciences (THUAS)",
		subtitle: "International Business",
		period: "2026 to 2030",
	},
	{
		title: "Ashram College",
		subtitle: "HAVO",
		period: "2020 to 2026",
	},
];

export const projects: AboutItem[] = [
	{
		title: "Instantly add-on",
		link: "https://github.com/jim74763/instantly-addon",
		linkLabel: "View the repo",
		body: "Instantly.ai locked a feature I needed behind a plan that cost 50 euros more per month. I built my own add-on on top of their API, with AI help, and published the repo. It is a self-hosted companion to Instantly for handling cold-email replies, managing leads, and testing delivery from one dashboard.",
	},
	{
		title: "Template site",
		link: "https://github.com/jim74763/template-site",
		linkLabel: "View the repo",
		extraLink: { href: "https://template.jimvd.xyz", label: "Live demo" },
		body: "AI-generated website demos that I use for my email marketing. They are generated with AI from a handful of prebuilt website templates, and you can also view the templates as they are on the live demo. Built with Next.js, React, TypeScript, Tailwind, shadcn/ui and OpenRouter.",
	},
	{
		title: "This website",
		link: "https://github.com/jim74763/jimvanduijsen.com",
		linkLabel: "View the repo",
		body: "The source code of this website is public on my GitHub. It runs on Cloudflare Workers and is built with Hono, Tailwind and Alpine.js.",
	},
	{
		title: "Self-hosted mail server",
		body: "I run my own mail server for email marketing. In Mailreach inbox placement tests with real Microsoft and Google inboxes, Outlook reached up to 100% inbox placement, and Google deliverability is also strong when I send through an SMTP relay. I run it in two setups: inboxes on the server's own IP and inboxes behind SMTP relays.",
		bullets: [
			"Runs on a Hetzner VPS, hosted with Docker, with Grafana for logs.",
			"I deliberately did not use Kubernetes or Docker Swarm, because this is too small a project to justify the extra complexity. Plain Docker is simpler to run and maintain.",
		],
	},
	{
		title: "Self-hosting and automation",
		body: "I host my own services to avoid subscription and hosting fees.",
		bullets: [
			"Two VPS servers: one with Docker and Caddy as reverse proxy for automatic SSL and authentication, and one with Coolify, a self-hosted Vercel alternative that deploys straight from GitHub.",
			"n8n for deterministic workflows, mainly data cleaning and enrichment, self-hosted in Docker. Claude now handles most tasks that need judgment.",
			"A home agent server: an old laptop running Omarchy, DHH's agent-friendly Linux distribution, for long-running AI coding agents.",
		],
	},
	{
		title: "IoT and home automation",
		body: "I've been building with IoT and home automation since I was 12. I run Home Assistant on a Pi with Zigbee networks, mainly using Philips Hue lighting. Hue bulbs are expensive, so I pair cheaper IKEA Zigbee bulbs with the Hue setup instead. I also program custom Arduino and ESP devices with ESPHome, Tasmota or the Arduino IDE, now paired with Claude Code, and I have some experience with embedded systems.",
	},
];

export const skills: AboutItem[] = [
	{
		title: "Next.js, React, TypeScript",
		body: "My main stack, used at work and in every side project.",
	},
	{
		title: "AI coding agents",
		body: "I learned to program first and added AI afterwards, so I can review and steer what it writes. I mainly use Claude Code, Codex and Pi (an open-source, minimalist coding agent with only read, write and bash tools).",
	},
	{
		title: "Learning fast",
		body: "When I had to implement Google Publisher Tag, Google's ad library, I got it running on the site quickly by combining the docs with AI. The same happened with Alpine.js for this website. I didn't know it well and don't use it often, but with a coding agent to help I learned it quickly and adapted fast. New tools rarely slow me down.",
	},
	{
		title: "AI certificates",
		extraLink: {
			href: "https://www.linkedin.com/in/jim-van-duijsen/",
			label: "LinkedIn profile",
		},
		body: "I hold several Nebius AI certificates on using and implementing AI well. You can see the certificates on my LinkedIn profile.",
	},
];
