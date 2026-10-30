import { ContactForm } from "../components/contact/contact-form.js";
import { ContactIntro } from "../components/contact/contact-intro.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { JsonLd } from "../components/json-ld.js";
import { renderPage } from "../utils/document.js";
import { contactSchema } from "../utils/schema.org/contact.js";

const Contact = () => {
	return (
		<main className="relative flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
			<JsonLd schema={contactSchema} />
			<Header />
			<section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-16 pt-[104px] sm:px-12 lg:flex-row lg:items-start lg:gap-16">
				<ContactIntro />
				<ContactForm />
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
		metadata: <script defer src="/js/contact-form.js" />,
		children: <Contact />,
	});
};
