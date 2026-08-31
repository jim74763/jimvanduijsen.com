export type ProjectItem = {
	title: string;
	year: string;
	link?: string;
	linkLabel?: string;
	contentHtml: string;
};

export type ExperienceItem = {
	role: string;
	company: string;
	period: string;
	location: string;
	bullets: string[];
};

export type SkillGroup = {
	category: string;
	items: string;
};

export type LanguageItem = {
	name: string;
	level: string;
};

export const projects: ProjectItem[] = [
	{
		title: "Havonyx",
		year: "2026",
		link: "https://havonyx.com/?utm_source=jimvanduijsen.com&utm_medium=website&utm_campaign=portfolio&utm_content=about_page",
		linkLabel: "Visit Havonyx",
		contentHtml:
			"<p>Havonyx is an agency that creates and maintains custom AI agents for businesses. We build practical agent systems around real workflows, connecting the tools, data, and automation needed to reduce repetitive work and help teams operate more efficiently.</p>",
	},
	{
		title: "Freelance Work",
		year: "2025",
		link: "/contact",
		linkLabel: "Contact me",
		contentHtml:
			'<h3>Freelance Work</h3><p>I also work with clients as a freelancer.</p><p>Besides my own projects, I take on freelance work for people and businesses that need a more personal way to get a project built. I like working directly with clients.</p><p>I am currently working with notable clients such as <a href="https://umami.app.jimvd.xyz/q/0FNEDQNFj">Crypto Insiders</a>.</p>',
	},
	{
		title: "Jimvd Web Agency",
		year: "2025",
		link: "https://jimvd.xyz",
		linkLabel: "Visit Jimvd.xyz",
		contentHtml:
			'<p>Jimvd.xyz is my web agency for businesses that need a modern website or web app. It covers the full delivery flow from discovery and design through development, launch, hosting, and maintenance, with a focus on SEO, fast Next.js builds, Vercel hosting, and responsive sites that help companies reach more customers online.</p><p>To quickly see examples of what I have created, visit the <a href="https://umami.app.jimvd.xyz/q/tD51Ah5HL">testimonials page</a>.</p>',
	},
];

export const experience: ExperienceItem[] = [
	{
		role: "Frontend Developer",
		company: "Crypto Insiders",
		period: "Present",
		location: "Part-time · Remote / Netherlands",
		bullets: [
			"Working on the transfer of the company's website from WordPress to Next.js, rebuilding pages to closely match the original designs",
			"Contributed to a multilingual (NL/DE) rollout and fixed bugs and technical issues along the way",
		],
	},
	{
		role: "Founder & Freelance Developer",
		company: "Havonyx / Self-employed",
		period: "Present",
		location: "Netherlands · Web development",
		bullets: [
			"Run a small web development business alongside independent freelance work, building websites and web tools for clients with React, Next.js and TypeScript",
			"Handle the full range of running a small business, from engineering to outreach and marketing, though the engineering side is what I enjoy most and still spend most of my time on",
		],
	},
];

export const technicalSkills: SkillGroup[] = [
	{
		category: "Frontend",
		items: "React, Next.js, TypeScript, JavaScript, HTML/CSS",
	},
	{
		category: "Workflow",
		items: "Git, Figma-to-code, REST APIs",
	},
];

export const languages: LanguageItem[] = [
	{ name: "Dutch", level: "Native" },
	{ name: "English", level: "Fluent" },
];
