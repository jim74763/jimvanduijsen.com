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
