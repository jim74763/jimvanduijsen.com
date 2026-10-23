export type SocialItem = {
	label: string;
	href: string;
	text: string;
	icon: string;
};

export type HomeLinkItem = {
	label: string;
	href: string;
	isExternal: boolean;
};

export type BioHighlight = {
	id: string;
	label: string;
	description: string;
};

export type ProjectItem = {
	title: string;
	description: string;
	href: string;
	image?: string;
	imageAlt?: string;
};

export const profileImage = "/assets/images/jim-van-duijsen-profile-2.jpg";

export const bio = {
	beforeWork:
		"Frontend developer (Next.js, React, TypeScript) growing into full stack. Currently ",
	work: {
		id: "crypto-insiders",
		label: "@ Crypto Insiders",
		description:
			"Frontend developer at Crypto Insiders, the largest crypto and blockchain news outlet in the Benelux. I worked on the migration from WordPress to Next.js, rebuilding many of the original pages pixel-perfect in React, Typescript and Tailwind.",
	} satisfies BioHighlight,
	betweenHighlights: " and doing a Bachelor ",
	study: {
		id: "thuas",
		label: "@ THUAS",
		description:
			"Studying International Business at The Hague University of Applied Sciences, driven by a lifelong interest in business and entrepreneurship.",
	} satisfies BioHighlight,
	afterStudy: ". Available for part-time work.",
};

export const socials: SocialItem[] = [
	{
		label: "Instagram",
		href: "https://www.instagram.com/jim_p5456/",
		text: "jim_p5456",
		icon: "/assets/icons/instagram.svg",
	},
	// {
	// 	label: "X(Twitter)",
	// 	href: "https://x.com/p35555481",
	// 	text: "@p35555481",
	// 	icon: "/assets/icons/x.svg",
	// },
	{
		label: "Linkedin",
		href: "https://www.linkedin.com/in/jim-van-duijsen/",
		text: "jim-van-duijsen",
		icon: "/assets/icons/linkedin.svg",
	},
	{
		label: "GitHub",
		href: "https://github.com/jim74763",
		text: "jim74763",
		icon: "/assets/icons/github.svg",
	},
];

export const links: HomeLinkItem[] = [
	{
		label: "About me (CV)",
		href: "/about",
		isExternal: false,
	},
	{
		label: "Contact",
		href: "/contact",
		isExternal: false,
	},
];

// Featured projects shown on the home page. The section stays hidden while
// this list is empty. Add two entries to publish it, for example:
// {
// 	title: "Project name",
// 	description: "One or two lines about the project.",
// 	href: "https://example.com",
// 	image: "/assets/images/project-name.png",
// 	imageAlt: "Screenshot of Project name",
// },
export const projects: ProjectItem[] = [];
