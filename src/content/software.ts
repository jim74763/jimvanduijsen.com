export type SoftwareItem = {
	name: string;
	href: string;
	domain: string;
	description: string;
};

export type SoftwareCategory = {
	name: string;
	items: SoftwareItem[];
};

export const softwareCategories: SoftwareCategory[] = [
	{
		name: "UX/UI",
		items: [
			{
				name: "getdesign.md",
				href: "https://getdesign.md/",
				domain: "getdesign.md",
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
				domain: "vercel.com",
				description:
					"Hosting and CI/CD for Next.js and other frontend frameworks.",
			},
			{
				name: "Hetzner",
				href: "https://www.hetzner.com",
				domain: "hetzner.com",
				description: "Affordable, reliable VPS and dedicated servers.",
			},
			{
				name: "Coolify",
				href: "https://coolify.io",
				domain: "coolify.io",
				description:
					"Open-source, self-hosted PaaS for deploying apps on your own servers.",
			},
			{
				name: "Cloudflare",
				href: "https://www.cloudflare.com",
				domain: "cloudflare.com",
				description: "CDN, DNS, and edge Workers. Runs this website.",
			},
			{
				name: "Spaceship",
				href: "https://www.spaceship.com",
				domain: "spaceship.com",
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
				domain: "claude.ai",
				description: "AI assistant for coding, writing, and running agents.",
			},
			{
				name: "OpenRouter",
				href: "https://openrouter.ai",
				domain: "openrouter.ai",
				description:
					"Unified API for routing requests across many LLM providers.",
			},
			{
				name: "openai-oauth",
				href: "https://github.com/EvanZhouDev/openai-oauth",
				domain: "github.com",
				description:
					"Unofficial tool that turns your ChatGPT OAuth login into a free, OpenAI-compatible API.",
			},
			{
				name: "Next.js MCP",
				href: "https://nextjs.org/docs/app/guides/mcp",
				domain: "nextjs.org",
				description:
					"Built-in MCP server that lets your AI coding agent inspect your app's live routes and structure to understand your Next.js codebase.",
			},
			{
				name: "Instantly MCP",
				href: "https://help.instantly.ai/en/articles/12980002-instantly-mcp-model-context-protocol",
				domain: "instantly.ai",
				description:
					"MCP server giving AI tools access to your Instantly campaigns, leads, and analytics.",
			},
			{
				name: "remindctl",
				href: "https://github.com/steipete/remindctl",
				domain: "github.com",
				description: "Command-line tool for managing Apple Reminders.",
			},
			{
				name: "memo",
				href: "https://github.com/antoniorodr/memo",
				domain: "github.com",
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
				domain: "n8n.io",
				description: "Open-source workflow automation platform.",
			},
			{
				name: "Apify",
				href: "https://apify.com",
				domain: "apify.com",
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
				domain: "instantly.ai",
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
				domain: "mxtoolbox.com",
				description: "DNS, MX record, and email deliverability diagnostics.",
			},
			{
				name: "FreeFlow",
				href: "https://freeflow.zachlatta.com/",
				domain: "freeflow.zachlatta.com",
				description: "Free, open-source Mac dictation app.",
			},
		],
	},
];
