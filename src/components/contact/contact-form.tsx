import { FormField } from "./form-field.js";

// Behavior lives in public/js/contact-form.js (Alpine.data("contactForm")).
export const ContactForm = () => (
	<form
		x-data="contactForm"
		{...{ "x-on:submit.prevent": "submit" }}
		method="post"
		action="/contact"
		className="flex w-full flex-col gap-5 lg:flex-1"
	>
		<FormField name="name" label="Name" maxLength={200} autoComplete="name" />
		<FormField
			name="email"
			label="Email"
			type="email"
			maxLength={200}
			autoComplete="email"
		/>
		<FormField
			name="message"
			label="Message"
			type="textarea"
			maxLength={5000}
		/>
		{/* Honeypot: hidden from people, bots fill it in. */}
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
);
