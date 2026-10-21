export type CvRole = {
	title: string;
	organisation: string;
	period?: string;
	points: string[];
};

export const cv = {
	name: "Jim van Duijsen",
	headline: "Frontend developer",
	location: "The Netherlands",
	availability: "Available for part-time work",
	summary:
		"Frontend developer working in Next.js, React and TypeScript, growing into full stack. I started building websites in high school, taught myself TypeScript and React, and turned that into client work, then a job. Currently working at Crypto Insiders and studying International Business at THUAS.",
	links: [
		{ label: "jimvanduijsen.com", href: "https://www.jimvanduijsen.com" },
		{
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/jim-van-duijsen/",
		},
		{ label: "GitHub", href: "https://github.com/jim74763" },
	],
	experience: [
		{
			title: "Frontend developer",
			organisation: "Crypto Insiders",
			period: "2025 to present",
			points: [
				"Largest crypto and blockchain news outlet in the Benelux.",
				"Migrated 50+ pages from WordPress to Next.js, rebuilding many of them pixel-perfect in React, TypeScript and Tailwind.",
				"Implemented Google Publisher Tag to serve ads.",
			],
		},
		{
			title: "Frontend developer",
			organisation: "DC Lab website, THUAS",
			points: [
				"Built the site for the DC Lab research group, where they publish events and papers.",
				"Next.js, React, Tailwind and Payload CMS, so the team can update content without a developer.",
			],
		},
		{
			title: "Founder",
			organisation: "Web agency (jimvd.xyz)",
			points: [
				"Built Next.js and React sites for clients. Portfolio and testimonials are online at jimvd.xyz.",
			],
		},
	] satisfies CvRole[],
	education: [
		{
			title: "International Business",
			organisation: "The Hague University of Applied Sciences (THUAS)",
			period: "2026 to 2030",
		},
		{
			title: "HAVO",
			organisation: "Ashram College",
			period: "2020 to 2026",
		},
	],
	skills: [
		{
			label: "Frontend",
			value: "Next.js, React, TypeScript, Tailwind, Payload CMS",
		},
		{
			label: "AI coding agents",
			value: "Claude Code, Codex, Pi",
		},
		{
			label: "Infrastructure",
			value: "Docker, Caddy, Coolify, Hetzner VPS, Grafana, n8n",
		},
		{
			label: "IoT and embedded",
			value: "Home Assistant, Zigbee, ESPHome, Tasmota, Arduino",
		},
	],
	projects: [
		{
			title: "Instantly add-on",
			text: "Self-hosted companion to Instantly.ai for handling cold-email replies, managing leads and testing delivery.",
			href: "https://github.com/jim74763/instantly-addon",
		},
		{
			title: "Template site",
			text: "AI-generated website demos built from prebuilt templates, used for email marketing.",
			href: "https://github.com/jim74763/template-site",
		},
		{
			title: "Self-hosted mail server",
			text: "Own mail server for email marketing on a Hetzner VPS with Docker and Grafana. Up to 100% Outlook inbox placement in Mailreach tests.",
		},
	],
	certificates:
		"Several Nebius AI certificates on using and implementing AI well (see LinkedIn).",
	languages: "Dutch (native), English (fluent)",
};
