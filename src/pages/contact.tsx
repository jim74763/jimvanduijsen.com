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
				<header className="lg:sticky lg:top-[104px] lg:w-[360px] lg:shrink-0">
					<h1 className="mb-3 text-3xl font-semibold tracking-tight">
						Get in touch
					</h1>
					<div className="space-y-4 text-base font-medium leading-relaxed text-muted-foreground">
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
								className="font-semibold text-foreground underline underline-offset-[0.18em]"
							>
								hello@jimvanduijsen.nl
							</a>
						</p>
					</div>
				</header>
				<form
					x-data="contactForm"
					{...{ "x-on:submit.prevent": "submit" }}
					method="post"
					action="/contact"
					className="flex w-full flex-col gap-5 lg:flex-1"
				>
					<div className="flex flex-col gap-2">
						<label htmlFor="name" className="text-sm font-medium">
							Name <span className="text-muted-foreground">*</span>
						</label>
						<input
							id="name"
							name="name"
							type="text"
							required
							maxLength={200}
							autoComplete="name"
							className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-base text-foreground outline-none transition focus:border-foreground"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="email" className="text-sm font-medium">
							Email <span className="text-muted-foreground">*</span>
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							maxLength={200}
							autoComplete="email"
							className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-base text-foreground outline-none transition focus:border-foreground"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="message" className="text-sm font-medium">
							Message <span className="text-muted-foreground">*</span>
						</label>
						<textarea
							id="message"
							name="message"
							required
							rows={6}
							maxLength={5000}
							className="w-full resize-y rounded-md border border-border bg-background px-3.5 py-2.5 text-base text-foreground outline-none transition focus:border-foreground"
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
						{...{ "x-bind:disabled": "sending" }}
						className="w-fit cursor-pointer rounded-md bg-foreground px-6 py-2.5 text-base font-medium text-background transition hover:opacity-80 disabled:opacity-50"
					>
						Submit
					</button>
					<p
						x-text="status"
						role="status"
						className="text-base font-medium text-muted-foreground"
					/>
				</form>
				<script
					dangerouslySetInnerHTML={{
						__html: `
document.addEventListener("alpine:init", () => {
	Alpine.data("contactForm", () => ({
		sending: false,
		status: "",
		async submit() {
			this.sending = true;
			this.status = "Sending...";
			try {
				const response = await fetch(this.$el.action, {
					method: "POST",
					body: new FormData(this.$el),
				});
				if (!response.ok) throw new Error();
				this.$el.reset();
				this.status = "Thanks, your message has been sent. I'll get back to you soon.";
			} catch {
				this.status = "Something went wrong. Please try again.";
			} finally {
				this.sending = false;
			}
		},
	}));
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
