export type ProjectItem = {
	title: string;
	year: string;
	link?: string;
	linkLabel?: string;
	contentHtml: string;
};

export const projects: ProjectItem[] = [
	{
		title: "Havonyx",
		year: "Present",
		link: "https://havonyx.com/?utm_source=jimvanduijsen.com&utm_medium=website&utm_campaign=portfolio&utm_content=about_page",
		linkLabel: "Visit Havonyx",
		contentHtml:
			"<p>Havonyx is an agency that creates and maintains custom AI agents for businesses. We build practical agent systems around real workflows, connecting the tools, data, and automation needed to reduce repetitive work and help teams operate more efficiently.</p>",
	},
	{
		title: "Crypto Insiders",
		year: "Present",
		link: "https://crypto-insiders.nl",
		linkLabel: "Visit Crypto Insiders",
		contentHtml:
			'<p>I work with Crypto Insiders as a freelance developer, using Next.js, React, and Tailwind CSS to build their new website.</p><p>Besides my own projects, I take on freelance work for people and businesses that need a more personal way to get a project built. I like working directly with clients.</p><p><a href="/contact">Get in touch</a> if you would like to work together.</p>',
	},
	{
		title: "Jimvd Web Agency",
		year: "2025",
		link: "https://jimvd.xyz",
		linkLabel: "Visit Jimvd.xyz",
		contentHtml:
			'<p>Jimvd.xyz is my web agency for businesses that need a modern website or web app. It covers the full delivery flow from discovery and design through development, launch, hosting, and maintenance, with a focus on SEO, fast Next.js builds, Vercel hosting, and responsive sites that help companies reach more customers online.</p><p>To quickly see examples of what I have created, visit the <a href="https://jimvd.xyz/testimonials">testimonials page</a>.</p>',
	},
];
