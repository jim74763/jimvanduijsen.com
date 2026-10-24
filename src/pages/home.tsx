import { cn } from "cn";
import { Footer } from "../components/footer.js";
import { JsonLd } from "../components/json-ld.js";
import {
	type BioHighlight,
	bio,
	links,
	profileImage,
	projects,
	socials,
} from "../content/home.js";
import { renderPage } from "../utils/document.js";
import { homeSchema } from "../utils/schema.org/home.js";

const BioHighlightTrigger = ({ id, label, description }: BioHighlight) => {
	const tipId = `tip-${id}`;

	return (
		<span className="group">
			<button
				type="button"
				aria-describedby={tipId}
				className="cursor-pointer underline decoration-1 underline-offset-4"
			>
				{label}
			</button>
			<span
				id={tipId}
				role="tooltip"
				className="pointer-events-none invisible absolute inset-x-0 top-full z-10 mt-2.5 rounded-xl border border-border bg-background px-5 py-4 text-left text-[15px] leading-relaxed text-secondary-foreground opacity-0 shadow-[var(--tooltip-shadow)] transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
			>
				{description}
			</span>
		</span>
	);
};

export default function JimLandingPage() {
	return (
		<main className="flex min-h-screen w-full flex-col overflow-x-hidden bg-background text-foreground">
			<JsonLd schema={homeSchema} />
			<div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-22 px-6 pb-14 pt-16 md:px-24">
				<div className="flex items-center justify-center gap-[30px] max-lg:flex-col max-lg:gap-12">
					<section className="flex w-full max-w-[529px] flex-shrink-0 flex-col items-center gap-5 py-px text-center">
						<div className="h-[428px] w-full overflow-hidden rounded-[15px]">
							<img
								src={profileImage}
								alt="Jim van Duijsen"
								className="h-full w-full object-cover object-top"
							/>
						</div>

						<h1 className="text-4xl font-semibold leading-[1.2] tracking-[-0.5px]">
							Jim van Duijsen
						</h1>

						<div className="relative w-full">
							<p className="text-lg leading-[1.7] text-secondary-foreground">
								{bio.beforeWork}
								<BioHighlightTrigger {...bio.work} />
								{bio.betweenHighlights}
								<BioHighlightTrigger {...bio.study} />
								{bio.afterStudy}
							</p>
						</div>

						<div className="flex w-full items-center justify-center gap-2.5 max-sm:flex-col">
							{socials.map((social) => (
								<a
									key={social.href}
									href={social.href}
									target="_blank"
									rel="noreferrer"
									aria-label={social.label}
									className="flex h-[50px] w-[200px] flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-[30px] bg-surface px-3.5 py-2.5 transition hover:bg-surface-hover"
								>
									<span className="relative block h-6 w-6 flex-shrink-0 overflow-hidden">
										<img
											src={social.icon}
											alt=""
											loading="lazy"
											className={cn(
												"absolute inset-0 block h-full w-full object-contain",
												social.label === "GitHub" && "theme-brand-icon",
											)}
										/>
									</span>

									<span className="whitespace-nowrap text-left text-xl font-normal leading-normal">
										{social.text}
									</span>
								</a>
							))}
						</div>
					</section>

					<nav
						aria-label="Main"
						className="flex w-full max-w-[529px] flex-shrink-0 flex-col items-center justify-center gap-5 px-0 md:px-[50px]"
					>
						{links.map((link) => (
							<a
								key={link.href}
								href={link.href}
								target={link.isExternal ? "_blank" : undefined}
								rel={link.isExternal ? "noreferrer" : undefined}
								className="relative flex h-[76px] w-full max-w-[430px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-surface px-[46px] py-[23px] text-center text-2xl font-semibold transition hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-current/40"
							>
								{link.label}
							</a>
						))}
					</nav>
				</div>

				{projects.length > 0 ? (
					<section
						aria-labelledby="projects-heading"
						className="mx-auto flex w-full max-w-[900px] flex-col gap-7"
					>
						<h2
							id="projects-heading"
							className="text-[28px] font-semibold leading-[1.2] tracking-[-0.3px]"
						>
							Featured projects
						</h2>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							{projects.map((project) => (
								<a
									key={project.href}
									href={project.href}
									target="_blank"
									rel="noreferrer"
									className="flex flex-col gap-4 rounded-[15px] border border-border p-4 transition hover:border-foreground"
								>
									{project.image ? (
										<img
											src={project.image}
											alt={project.imageAlt ?? project.title}
											loading="lazy"
											className="aspect-[16/10] w-full rounded-[10px] object-cover"
										/>
									) : (
										<div className="aspect-[16/10] w-full rounded-[10px] bg-surface" />
									)}
									<div className="flex flex-col gap-1.5 px-1 pb-1">
										<div className="text-xl font-semibold">{project.title}</div>
										<div className="text-base leading-relaxed text-subtle-foreground">
											{project.description}
										</div>
									</div>
								</a>
							))}
						</div>
					</section>
				) : null}
			</div>

			<Footer />
		</main>
	);
}

export const homePage = () => {
	return renderPage({
		title: "Jim van Duijsen | AI Agent Developer & Freelance Web Developer",
		description:
			"Jim van Duijsen builds custom AI agents and modern websites for businesses. Founder of Havonyx and Jimvd Web Agency. Available for freelance projects.",
		canonicalPath: "/",
		children: <JimLandingPage />,
	});
};
