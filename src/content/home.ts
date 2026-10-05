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

export const profileImage = "/assets/images/jim-van-duijsen-profile.png";

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
		label: "AI agents & automation",
		href: "https://havonyx.com/?utm_source=jimvanduijsen.com&utm_medium=website&utm_campaign=portfolio&utm_content=home_button",
		isExternal: true,
	},
	{
		label: "About me",
		href: "/about",
		isExternal: false,
	},
	{
		label: "Contact",
		href: "/contact",
		isExternal: false,
	},
	{
		label: "Software I recommend",
		href: "/software",
		isExternal: false,
	},
];

export type DeskLink = {
	label: string;
	href: string;
	external?: boolean;
};

export type DeskItem = {
	tag: string;
	title: string;
	text: string;
	links?: DeskLink[];
	email?: string;
};

const instagram = socials.find((s) => s.label === "Instagram");
const linkedin = socials.find((s) => s.label === "Linkedin");
const github = socials.find((s) => s.label === "GitHub");

export const contactEmail = "hello@jimvanduijsen.nl";

/** Copy for the objects in the 3D scene, keyed by the item ids used in public/assets/desk/desk.js. */
export const deskItems: Record<string, DeskItem> = {
	havonyx: {
		tag: "Project",
		title: "Havonyx",
		text: "An agency that creates and maintains custom AI agents for businesses. We build practical agent systems around real workflows, connecting the tools, data and automation that cut repetitive work.",
		links: [{ label: "Visit Havonyx", href: links[0].href, external: true }],
	},
	agency: {
		tag: "Project",
		title: "Jimvd Web Agency",
		text: "My web agency for businesses that need a modern website or web app. Design, development, launch, hosting and maintenance, with a focus on SEO and fast Next.js builds on Vercel.",
		links: [
			{ label: "Visit jimvd.xyz", href: "https://jimvd.xyz", external: true },
		],
	},
	websites: {
		tag: "Examples",
		title: "Websites I built",
		text: "A quick look at what I have created for businesses.",
		links: [
			{
				label: "See examples",
				href: "https://jimvd.xyz/testimonials",
				external: true,
			},
		],
	},
	voice: {
		tag: "Experiment",
		title: "Voice AI agent",
		text: "A voice agent architecture built on LiveKit and Mistral.",
	},
	poker: {
		tag: "Experiment",
		title: "Poker model",
		text: "Fine-tuning a small language model to play poker on Apple's MLX, with its own dataset and an evaluation suite.",
	},
	about: {
		tag: "About me",
		title: "Alphen aan den Rijn",
		text: "Born in The Hague and raised in Alphen aan den Rijn. I speak Dutch and English fluently, plus some German. My dad's side of the family is Austrian.",
		links: [{ label: "More about me", href: "/about" }],
	},
	contact: {
		tag: "Contact",
		title: "Say hello",
		text: "Email is the best way to reach me. I take on freelance projects and like working directly with clients.",
		email: contactEmail,
		links: [
			{ label: "Contact page", href: "/contact" },
			...[instagram, linkedin, github].flatMap((s) =>
				s ? [{ label: s.label, href: s.href, external: true }] : [],
			),
		],
	},
	crypto: {
		tag: "Experience",
		title: "Crypto Insiders",
		text: "I work with Crypto Insiders as a freelance developer, using Next.js, React and Tailwind CSS to build their new website.",
		links: [
			{
				label: "Visit Crypto Insiders",
				href: "https://crypto-insiders.nl",
				external: true,
			},
		],
	},
	freelance: {
		tag: "Experience",
		title: "Freelance developer",
		text: "Next.js, React and TypeScript for people and businesses that want a more personal way to get a project built.",
		links: [{ label: "Work with me", href: "/contact" }],
	},
	thuas: {
		tag: "Education",
		title: "THUAS",
		text: "Studying International Business in the English stream at The Hague University of Applied Sciences.",
	},
	hire: {
		tag: "Available",
		title: "Work with me",
		text: "I am available for freelance projects: websites, web apps and custom AI agents.",
		links: [{ label: "Get in touch", href: "/contact" }],
	},
	software: {
		tag: "Software",
		title: "Software I recommend",
		text: "The tools I use for hosting, automation, design and outreach.",
		links: [{ label: "See the list", href: "/software" }],
	},
};
