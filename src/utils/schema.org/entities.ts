const SITE_URL = "https://www.jimvanduijsen.com";

export const personId = `${SITE_URL}/#person`;

export const personEntity = {
	"@type": "Person",
	"@id": personId,
	name: "Jim van Duijsen",
	url: SITE_URL,
	jobTitle: "AI Agent Developer & Freelance Web Developer",
	description:
		"Jim van Duijsen builds custom AI agents and automation workflows for businesses. Founder of Havonyx and Jimvd Web Agency.",
	image: `${SITE_URL}/assets/images/jim-van-duijsen-profile.png`,
	address: {
		"@type": "PostalAddress",
		addressCountry: "NL",
	},
	knowsAbout: [
		"AI agents",
		"Automation workflows",
		"Web development",
		"Next.js",
		"Cloudflare Workers",
	],
	worksFor: [
		{ "@id": "https://havonyx.com/#organization" },
		{ "@id": "https://jimvd.xyz/#organization" },
	],
	sameAs: [
		"https://www.linkedin.com/in/jim-van-duijsen",
		"https://twitter.com/p35555481",
		"https://www.instagram.com/jim_p5456",
		"https://jimvd.xyz",
		"https://havonyx.com",
	],
};

export const havonyxOrgEntity = {
	"@type": "Organization",
	"@id": "https://havonyx.com/#organization",
	name: "Havonyx",
	url: "https://havonyx.com",
	description:
		"Havonyx is a done-for-you agency that builds custom AI agents and automation systems for businesses.",
	founder: { "@id": personId },
};

export const jimvdOrgEntity = {
	"@type": "Organization",
	"@id": "https://jimvd.xyz/#organization",
	name: "Jimvd Web Agency",
	url: "https://jimvd.xyz",
	description:
		"Jimvd Web Agency delivers modern websites and web apps, covering design, development, SEO, hosting, and maintenance.",
	founder: { "@id": personId },
};

export const websiteEntity = {
	"@type": "WebSite",
	"@id": `${SITE_URL}/#website`,
	url: SITE_URL,
	name: "Jim van Duijsen",
	publisher: { "@id": personId },
};
