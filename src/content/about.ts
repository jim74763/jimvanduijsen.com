export type ProjectItem = {
	title: string;
	year: string;
	link?: string;
	linkLabel?: string;
	contentHtml: string;
};

export const projects: ProjectItem[] = [
	{
		title: "TJB Ai",
		year: "2026",
		link: "/tjb-ai-redir",
		linkLabel: "Visit TJB AI",
		contentHtml:
			"<p>TJB AI is an agency that creates and maintains custom AI agents for businesses. We build practical agent systems around real workflows, connecting the tools, data, and automation needed to reduce repetitive work and help teams operate more efficiently.</p>",
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
