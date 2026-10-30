export const ContactForm = () => (
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
