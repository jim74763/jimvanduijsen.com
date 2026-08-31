import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { JsonLd } from "../components/json-ld.js";
import {
	experience,
	languages,
	projects,
	technicalSkills,
} from "../content/about.js";
import { renderPage } from "../utils/document.js";
import { aboutSchema } from "../utils/schema.org/about.js";

export default function PortfolioPage() {
	return (
		<main className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-black">
			<JsonLd schema={aboutSchema(projects)} />
			<Header />
			<section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 pb-28 pt-[104px] sm:px-12 sm:pb-32">
				<header className="mb-8 max-w-xl">
					<div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 relative overflow-hidden">
						<img
							src="/assets/images/jim-mirror-avatar.png"
							alt="jim van duijsen"
							className="absolute inset-0 object-cover"
						/>
					</div>

					<h1 className="mb-3 text-3xl font-semibold tracking-tight">
						About me
					</h1>

					<p className="text-base font-medium leading-relaxed text-black/65">
						I build AI agents and automation workflows. I am currently building
						Havonyx, a done-for-you AI agency that turns repetitive business
						tasks into practical AI automation systems. <br />I also work as a
						freelance developer with notable clients such as Crypto-Insiders.
					</p>
				</header>

				<h2 className="mb-4 text-3xl font-semibold tracking-tight">
					Experience
				</h2>

				<ul className="mb-12 w-full">
					{experience.map((job) => (
						<li
							key={`${job.role}-${job.company}`}
							className="border-b border-black/15 py-5 first:pt-0"
						>
							<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
								<span className="text-xl font-semibold tracking-tight">
									{job.role} — {job.company}
								</span>
								<span className="text-base font-medium tracking-tight text-black/60">
									{job.period}
								</span>
							</div>
							<p className="mt-1 text-sm font-medium text-black/50">
								{job.location}
							</p>
							<ul className="mt-3 list-disc space-y-1.5 pl-5 text-base font-medium leading-relaxed text-black/65">
								{job.bullets.map((bullet) => (
									<li key={bullet}>{bullet}</li>
								))}
							</ul>
						</li>
					))}
				</ul>

				<div className="mb-12 grid w-full gap-8 sm:grid-cols-2">
					<div>
						<h2 className="mb-4 text-3xl font-semibold tracking-tight">
							Technical skills
						</h2>
						<ul className="space-y-2">
							{technicalSkills.map((skill) => (
								<li
									key={skill.category}
									className="text-base font-medium leading-relaxed text-black/65"
								>
									<span className="font-semibold text-black">
										{skill.category}:
									</span>{" "}
									{skill.items}
								</li>
							))}
						</ul>
					</div>

					<div>
						<h2 className="mb-4 text-3xl font-semibold tracking-tight">
							Languages
						</h2>
						<ul className="space-y-2">
							{languages.map((language) => (
								<li
									key={language.name}
									className="text-base font-medium leading-relaxed text-black/65"
								>
									<span className="font-semibold text-black">
										{language.name}:
									</span>{" "}
									{language.level}
								</li>
							))}
						</ul>
					</div>
				</div>

				<h2 className="mb-4 text-3xl font-semibold tracking-tight">
					Projects i have worked on
				</h2>

				<ul className="w-full">
					{projects.map((project) => (
						<li key={`${project.title}-${project.year}`}>
							<details className="project-disclosure border-b border-black/15">
								<summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 py-4 pr-2 text-black">
									<span className="min-w-0 flex-1 truncate text-xl font-semibold tracking-tight">
										{project.title}
									</span>
									<span className="flex shrink-0 items-center gap-4">
										<span className="text-xl font-medium tracking-tight text-black/60">
											{project.year}
										</span>
										<img
											src="/assets/icons/chevron-down.svg"
											width="18"
											height="18"
											alt=""
											aria-hidden="true"
											className="project-disclosure-icon shrink-0 transition"
										/>
									</span>
								</summary>

								<div className="pb-5 pr-2">
									<div
										className="project-disclosure-content max-w-xl text-base font-medium leading-relaxed text-black/65"
										dangerouslySetInnerHTML={{
											__html: project.contentHtml,
										}}
									/>

									{project.link ? (
										<a
											href={project.link}
											className="mt-4 inline-flex text-base font-semibold tracking-tight text-black transition hover:opacity-60"
										>
											{project.linkLabel ?? "Visit project"}
										</a>
									) : null}
								</div>
							</details>
						</li>
					))}
				</ul>
			</section>
			<Footer />
		</main>
	);
}

export const aboutPage = () => {
	return renderPage({
		title: "About Jim van Duijsen | AI Agent Developer & Web Developer",
		description:
			"Jim van Duijsen builds custom AI agents and automation workflows. Founder of Havonyx and Jimvd Web Agency. Freelance developer for clients like Crypto Insiders.",
		canonicalPath: "/about",
		children: <PortfolioPage />,
	});
};
