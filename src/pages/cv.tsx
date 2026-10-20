import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { JsonLd } from "../components/json-ld.js";
import { ViewSwitcher } from "../components/view-switcher.js";
import { cv } from "../content/cv.js";
import { renderPage } from "../utils/document.js";
import { cvSchema } from "../utils/schema.org/cv.js";

const SectionTitle = ({ children }: { children: string }) => (
	<h2 className="mb-3 border-b border-black/15 pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-black/60">
		{children}
	</h2>
);

const Entry = ({
	title,
	organisation,
	period,
	points,
}: {
	title: string;
	organisation: string;
	period?: string;
	points?: string[];
}) => (
	<div className="break-inside-avoid">
		<div className="flex items-baseline justify-between gap-4">
			<h3 className="text-base font-semibold tracking-tight">
				{title}
				<span className="font-medium text-black/60">, {organisation}</span>
			</h3>
			{period ? (
				<span className="shrink-0 text-sm font-medium text-black/60">
					{period}
				</span>
			) : null}
		</div>
		{points ? (
			<ul className="mt-1 list-disc space-y-1 pl-5 text-sm font-medium leading-relaxed text-black/70">
				{points.map((point) => (
					<li key={point}>{point}</li>
				))}
			</ul>
		) : null}
	</div>
);

export default function CvPage() {
	return (
		<main className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-black print:min-h-0">
			<JsonLd schema={cvSchema} />
			<div className="print:hidden">
				<Header />
			</div>
			<section className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 pb-28 pt-[104px] sm:px-12 sm:pb-32 print:max-w-none print:px-0 print:pb-0 print:pt-0">
				<div className="mb-8 flex items-center justify-between gap-4 print:hidden">
					<ViewSwitcher active="cv" />
					<button
						type="button"
						// biome-ignore lint/suspicious/noExplicitAny: inline handler for print
						{...({ onclick: "window.print()" } as any)}
						className="rounded-full border border-black/10 px-5 py-2 text-sm font-semibold tracking-tight transition hover:bg-black hover:text-white"
					>
						Download PDF
					</button>
				</div>

				<header className="mb-6 print:mb-4">
					<h1 className="text-4xl font-semibold tracking-tight">{cv.name}</h1>
					<p className="mt-1 text-lg font-medium text-black/65">
						{cv.headline}
					</p>
					<p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-black/65">
						<span>{cv.location}</span>
						{cv.links.map((link) => (
							<a key={link.href} href={link.href} className="underline">
								{link.label}
							</a>
						))}
					</p>
				</header>

				<div className="space-y-6 print:space-y-4">
					<section>
						<SectionTitle>Profile</SectionTitle>
						<p className="text-sm font-medium leading-relaxed text-black/70">
							{cv.summary} {cv.availability}.
						</p>
					</section>

					<section>
						<SectionTitle>Experience</SectionTitle>
						<div className="space-y-4 print:space-y-3">
							{cv.experience.map((role) => (
								<Entry key={role.organisation} {...role} />
							))}
						</div>
					</section>

					<section>
						<SectionTitle>Education</SectionTitle>
						<div className="space-y-3">
							{cv.education.map((item) => (
								<Entry key={item.organisation} {...item} />
							))}
						</div>
					</section>

					<section>
						<SectionTitle>Skills</SectionTitle>
						<dl className="space-y-1 text-sm font-medium leading-relaxed">
							{cv.skills.map((skill) => (
								<div key={skill.label} className="flex gap-3">
									<dt className="w-36 shrink-0 font-semibold">{skill.label}</dt>
									<dd className="text-black/70">{skill.value}</dd>
								</div>
							))}
						</dl>
					</section>

					<section>
						<SectionTitle>Projects</SectionTitle>
						<ul className="space-y-2 text-sm font-medium leading-relaxed">
							{cv.projects.map((project) => (
								<li key={project.title} className="break-inside-avoid">
									{project.href ? (
										<a href={project.href} className="font-semibold underline">
											{project.title}
										</a>
									) : (
										<span className="font-semibold">{project.title}</span>
									)}
									<span className="text-black/70">: {project.text}</span>
								</li>
							))}
						</ul>
					</section>

					<section>
						<SectionTitle>Certificates and languages</SectionTitle>
						<p className="text-sm font-medium leading-relaxed text-black/70">
							{cv.certificates}
						</p>
						<p className="mt-1 text-sm font-medium leading-relaxed text-black/70">
							<span className="font-semibold text-black">Languages:</span>{" "}
							{cv.languages}
						</p>
					</section>
				</div>
			</section>
			<div className="print:hidden">
				<Footer />
			</div>
		</main>
	);
}

export const cvPage = () => {
	return renderPage({
		title: "CV | Jim van Duijsen",
		description:
			"CV of Jim van Duijsen: frontend developer working in Next.js, React and TypeScript. Experience at Crypto Insiders, education at THUAS, skills and projects.",
		canonicalPath: "/cv",
		children: <CvPage />,
	});
};
