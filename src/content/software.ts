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
		],
	},
	{
		name: "AI",
		items: [
			{
				name: "Claude",
				href: "https://claude.ai",
				domain: "claude.ai",
				description: "AI assistant for coding, writing, and running agents.",
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
		],
	},
	{
		name: "CLI tools",
		items: [
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
];
