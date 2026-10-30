export const ContactIntro = () => (
	<header className="lg:sticky lg:top-[104px] lg:w-[360px] lg:shrink-0">
		<h1 className="mb-3 text-3xl font-semibold tracking-tight">Get in touch</h1>
		<div className="space-y-4 text-base font-medium leading-relaxed text-muted-foreground">
			<p>
				I’m a frontend developer (Next.js, React, TypeScript) with hands-on
				backend and infrastructure experience, and I’m available for part-time
				work. I’m looking to take on more full-stack responsibility.
			</p>
			<p>
				Tell me about the role or project, and I’ll reply within a couple of
				days.
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
);
