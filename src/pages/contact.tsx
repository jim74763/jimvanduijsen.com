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
					<div className="space-y-4 text-base font-medium leading-relaxed text-black/65">
						<p>
							I’m a frontend developer (Next.js, React, TypeScript) with
							hands-on backend and infrastructure experience, and I’m available
							for part-time work. I’m looking to take on more full-stack
							responsibility.
						</p>
						<p>
							Tell me about the role or project, and I’ll reply within a couple
							of days.
						</p>
						<p>
							Email:{" "}
							<a
								href="mailto:hello@jimvanduijsen.nl"
								className="font-semibold text-black underline underline-offset-[0.18em]"
							>
								hello@jimvanduijsen.nl
							</a>
						</p>
					</div>
				</header>
				<form
					id="contact-form"
					method="post"
					action="/contact"
					className="flex w-full flex-col gap-5 lg:flex-1"
				>
					<div className="flex flex-col gap-2">
						<label htmlFor="name" className="text-sm font-medium">
							Name <span className="text-black/65">*</span>
						</label>
						<input
							id="name"
							name="name"
							type="text"
							required
							maxLength={200}
							autoComplete="name"
							className="w-full rounded-md border border-[#858585]/40 bg-white px-3.5 py-2.5 text-base text-black outline-none transition focus:border-black"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="email" className="text-sm font-medium">
							Email <span className="text-black/65">*</span>
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							maxLength={200}
							autoComplete="email"
							className="w-full rounded-md border border-[#858585]/40 bg-white px-3.5 py-2.5 text-base text-black outline-none transition focus:border-black"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="message" className="text-sm font-medium">
							Message <span className="text-black/65">*</span>
						</label>
						<textarea
							id="message"
							name="message"
							required
							rows={6}
							maxLength={5000}
							className="w-full resize-y rounded-md border border-[#858585]/40 bg-white px-3.5 py-2.5 text-base text-black outline-none transition focus:border-black"
						/>
					</div>
					<div className="hidden" aria-hidden="true">
						<label htmlFor="website">Website</label>
						<input
							id="website"
							name="website"
							type="text"
							tabIndex={-1}
							autoComplete="off"
						/>
					</div>
					<button
						type="submit"
						className="w-fit cursor-pointer rounded-md bg-black px-6 py-2.5 text-base font-medium text-white transition hover:opacity-80 disabled:opacity-50"
					>
						Submit
					</button>
					<p
						id="contact-status"
						role="status"
						className="text-base font-medium text-black/65"
					/>
				</form>
				<script
					dangerouslySetInnerHTML={{
						__html: `
const form = document.getElementById("contact-form");
const status = document.getElementById("contact-status");
form.addEventListener("submit", async (event) => {
	event.preventDefault();
	const button = form.querySelector("button");
	button.disabled = true;
	status.textContent = "Sending...";
	try {
		const response = await fetch(form.action, { method: "POST", body: new FormData(form) });
		if (!response.ok) throw new Error();
		form.reset();
		status.textContent = "Thanks, your message has been sent. I'll get back to you soon.";
	} catch {
		status.textContent = "Something went wrong. Please try again.";
	} finally {
		button.disabled = false;
	}
});`,
					}}
				/>
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
