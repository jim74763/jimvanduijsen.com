export type SoftwareItem = {
	name: string;
	href: string;
	icon: string;
	description: string;
};

export type SoftwareCategory = {
	name: string;
	items: SoftwareItem[];
};

const ICON_BASE = "/assets/icons/software";

export const softwareCategories: SoftwareCategory[] = [
	{
		name: "UX/UI",
		items: [
			{
				name: "getdesign.md",
				href: "https://getdesign.md/",
				icon: `${ICON_BASE}/getdesign-md.png`,
				description:
					"Curated DESIGN.md files from real brands so AI coding agents generate consistent UI.",
			},
		],
	},
	{
		name: "Hosting & infrastructure",
		items: [
			{
				name: "Vercel",
				href: "https://vercel.com",
				icon: `${ICON_BASE}/vercel.svg`,
				description:
					"Hosting and CI/CD for Next.js and other frontend frameworks.",
			},
			{
				name: "Hetzner",
				href: "https://www.hetzner.com",
				icon: `${ICON_BASE}/hetzner.svg`,
				description: "Affordable, reliable VPS and dedicated servers.",
			},
			{
				name: "Coolify",
				href: "https://coolify.io",
				icon: `${ICON_BASE}/coolify.svg`,
				description:
					"Open-source, self-hosted PaaS for deploying apps on your own servers.",
			},
			{
				name: "Cloudflare",
				href: "https://www.cloudflare.com",
				icon: `${ICON_BASE}/cloudflare.svg`,
				description: "CDN, DNS, and edge Workers. Runs this website.",
			},
			{
				name: "Spaceship",
				href: "https://www.spaceship.com",
				icon: `${ICON_BASE}/spaceship.svg`,
				description: "Domain registration, DNS, and hosting.",
			},
		],
	},
	{
		name: "AI tools",
		items: [
			{
				name: "Claude",
				href: "https://claude.ai",
				icon: `${ICON_BASE}/claude.svg`,
				description: "AI assistant for coding, writing, and running agents.",
			},
			{
				name: "OpenRouter",
				href: "https://openrouter.ai",
				icon: `${ICON_BASE}/openrouter.png`,
				description:
					"Unified API for routing requests across many LLM providers.",
			},
			{
				name: "openai-oauth",
				href: "https://github.com/EvanZhouDev/openai-oauth",
				icon: `${ICON_BASE}/github.svg`,
				description:
					"Unofficial tool that turns your ChatGPT OAuth login into a free, OpenAI-compatible API.",
			},
			{
				name: "Next.js MCP",
				href: "https://nextjs.org/docs/app/guides/mcp",
				icon: `${ICON_BASE}/nextjs.svg`,
				description:
					"Built-in MCP server that lets your AI coding agent inspect your app's live routes and structure to understand your Next.js codebase.",
			},
			{
				name: "Instantly MCP",
				href: "https://help.instantly.ai/en/articles/12980002-instantly-mcp-model-context-protocol",
				icon: `${ICON_BASE}/instantly.png`,
				description:
					"MCP server giving AI tools access to your Instantly campaigns, leads, and analytics.",
			},
			{
				name: "remindctl",
				href: "https://github.com/steipete/remindctl",
				icon: `${ICON_BASE}/github.svg`,
				description: "Command-line tool for managing Apple Reminders.",
			},
			{
				name: "memo",
				href: "https://github.com/antoniorodr/memo",
				icon: `${ICON_BASE}/github.svg`,
				description:
					"Command-line tool for managing Apple Notes and Reminders.",
			},
		],
	},
	{
		name: "Automation",
		items: [
			{
				name: "n8n",
				href: "https://n8n.io",
				icon: `${ICON_BASE}/n8n.svg`,
				description: "Open-source workflow automation platform.",
			},
			{
				name: "Apify",
				href: "https://apify.com",
				icon: `${ICON_BASE}/apify.png`,
				description:
					"Web scraping and automation platform with a marketplace of ready-made actors.",
			},
		],
	},
	{
		name: "Outreach",
		items: [
			{
				name: "Instantly",
				href: "https://instantly.ai",
				icon: `${ICON_BASE}/instantly.png`,
				description: "Cold email sending and lead automation.",
			},
		],
	},
	{
		name: "Utilities",
		items: [
			{
				name: "MxToolbox",
				href: "https://mxtoolbox.com",
				icon: `${ICON_BASE}/mxtoolbox.png`,
				description: "DNS, MX record, and email deliverability diagnostics.",
			},
			{
				name: "FreeFlow",
				href: "https://freeflow.zachlatta.com/",
				icon: `${ICON_BASE}/freeflow.png`,
				description: "Free, open-source Mac dictation app.",
			},
		],
	},
	{
		name: "Analytics",
		items: [
			{
				name: "Umami",
				href: "https://umami.is",
				icon: `${ICON_BASE}/umami.svg`,
				description:
					"Open-source, privacy-friendly web analytics. Runs the analytics on this site.",
			},
		],
	},
];
