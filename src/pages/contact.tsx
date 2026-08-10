import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { JsonLd } from "../components/json-ld.js";
import { renderPage } from "../utils/document.js";
import { contactSchema } from "../utils/schema.org/contact.js";

const Contact = () => {
	return (
		<main className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-black">
			<JsonLd schema={contactSchema} />
			<Header />
			<section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-16 pt-[104px] sm:px-12 lg:flex-row lg:items-start lg:gap-16">
				<header className="lg:sticky lg:top-[104px] lg:w-[360px] lg:shrink-0">
					<h1 className="mb-3 text-3xl font-semibold tracking-tight">
						Get in touch
					</h1>
					<p className="text-base font-medium leading-relaxed text-black/65">
						Interested in working together? Fill out the form and I'll get back
						to you.
					</p>
				</header>
				<div className="h-[650px] w-full overflow-hidden lg:flex-1">
					<iframe
						src="https://n8n.app.jimvd.xyz/form/d2f958e2-a7e3-4449-96d6-9921f098f6ef"
						title="contact form"
						allowFullScreen
						className="h-full w-full border-0"
					/>
				</div>
			</section>
			<Footer />
		</main>
	);
};

export default Contact;

export const contactPage = () => {
	return renderPage({
		title: "Contact | Jim van Duijsen",
		description:
			"Reach out to Jim van Duijsen for custom AI agent builds, automation workflows, or freelance web development. Available for new projects.",
		canonicalPath: "/contact",
		children: <Contact />,
	});
};
