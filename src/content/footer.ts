export type FooterLink = {
	label: string;
	href: string;
};

export type FooterMetaItem = {
	label: string;
};

export const footerLinks: FooterLink[] = [
	{
		label: "Privacy and legal",
		href: "https://legal.app.jimvd.xyz",
	},
	{
		label: "Software I recommend",
		href: "/software",
	},
	{
		label: "hello@jimvanduijsen.nl",
		href: "mailto:hello@jimvanduijsen.nl",
	},
];

export const footerMetaItems: FooterMetaItem[] = [
	{
		label: "KVK: 42038746",
	},
	{
		label: "BTW: NL005447716B55",
	},
];
