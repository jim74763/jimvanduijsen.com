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
		href: "https://umami.app.jimvd.xyz/q/CBBLbE6Vt",
		text: "jim_p5456",
		icon: "/assets/icons/instagram.svg",
	},
	// {
	// 	label: "X(Twitter)",
	// 	href: "https://umami.app.jimvd.xyz/q/cIABHJT90",
	// 	text: "@p35555481",
	// 	icon: "/assets/icons/x.svg",
	// },
	{
		label: "Linkedin",
		href: "https://umami.app.jimvd.xyz/q/fbyIKSsDH",
		text: "jim-van-duijsen",
		icon: "/assets/icons/linkedin.svg",
	},
	{
		label: "GitHub",
		href: "https://umami.app.jimvd.xyz/q/1xyTJU5U7",
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
		label: "Website templates",
		href: "https://umami.app.jimvd.xyz/q/0lfWDwcxL",
		isExternal: true,
	},
	{
		label: "Download CV",
		href: "/assets/cv/jim-van-duijsen-cv.pdf",
		isExternal: true,
	},
];
