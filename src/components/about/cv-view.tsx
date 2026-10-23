import { cv } from "../../content/cv.js";

const SectionTitle = ({ children }: { children: string }) => (
	<h2 className="mb-3 border-b border-border pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
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
				<span className="font-medium text-muted-foreground">
					, {organisation}
				</span>
			</h3>
			{period ? (
				<span className="shrink-0 text-sm font-medium text-muted-foreground">
					{period}
				</span>
			) : null}
		</div>
		{points ? (
			<ul className="mt-1 list-disc space-y-1 pl-5 text-sm font-medium leading-relaxed text-muted-foreground">
				{points.map((point) => (
					<li key={point}>{point}</li>
				))}
			</ul>
		) : null}
	</div>
);

export const CvView = () => (
	<div>
		<header className="mb-6 print:mb-4">
			<h1 className="text-4xl font-semibold tracking-tight">{cv.name}</h1>
			<p className="mt-1 text-lg font-medium text-muted-foreground">
				{cv.headline}
			</p>
			<p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-muted-foreground">
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
				<p className="text-sm font-medium leading-relaxed text-muted-foreground">
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
							<dd className="text-muted-foreground">{skill.value}</dd>
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
							<span className="text-muted-foreground">: {project.text}</span>
						</li>
					))}
				</ul>
			</section>

			<section>
				<SectionTitle>Certificates and languages</SectionTitle>
				<p className="text-sm font-medium leading-relaxed text-muted-foreground">
					{cv.certificates}
				</p>
				<p className="mt-1 text-sm font-medium leading-relaxed text-muted-foreground">
					<span className="font-semibold text-foreground">Languages:</span>{" "}
					{cv.languages}
				</p>
			</section>
		</div>
	</div>
);
