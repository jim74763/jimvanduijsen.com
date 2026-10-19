import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { JsonLd } from "../components/json-ld.js";
import {
	type AboutItem,
	experience,
	otherLinks,
	projects,
	skills,
	story,
} from "../content/about.js";
import { renderPage } from "../utils/document.js";
import { aboutSchema } from "../utils/schema.org/about.js";

function ItemList({ items }: { items: AboutItem[] }) {
	return (
		<ul className="mb-14 w-full">
			{items.map((item) => (
				<li key={item.title} className="border-b border-black/15 py-5">
					<h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
					{item.subtitle ? (
						<p className="text-base font-medium text-black/60">
							{item.subtitle}
						</p>
					) : null}
					<div className="mt-2 max-w-xl text-base font-medium leading-relaxed text-black/65">
						{item.body.map((paragraph) => (
							<p key={paragraph}>{paragraph}</p>
						))}
						{item.bullets ? (
							<ul className="mt-3 list-disc space-y-2 pl-5">
								{item.bullets.map((bullet) => (
									<li key={bullet}>{bullet}</li>
								))}
							</ul>
						) : null}
					</div>
					{item.link ? (
						<a
							href={item.link}
							className="mt-3 inline-flex text-base font-semibold tracking-tight text-black transition hover:opacity-60"
						>
							{item.linkLabel ?? "Visit"}
						</a>
					) : null}
				</li>
			))}
		</ul>
	);
}

export default function PortfolioPage() {
	return (
		<main className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-black">
			<JsonLd schema={aboutSchema(projects)} />
			<Header />
			<section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 pb-28 pt-[104px] sm:px-12 sm:pb-32">
				<header className="mb-14 max-w-xl">
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

					{story.paragraphs.map((paragraph) => (
						<p
							key={paragraph}
							className="text-base font-medium leading-relaxed text-black/65"
						>
							{paragraph}
						</p>
					))}
					<p className="mt-3 text-base font-medium leading-relaxed text-black/65">
						<span className="text-black">Languages:</span> {story.languages}
					</p>
				</header>

				<h2 className="mb-2 text-3xl font-semibold tracking-tight">
					Experience
				</h2>
				<ItemList items={experience} />

				<h2 className="mb-2 text-3xl font-semibold tracking-tight">
					Featured projects
				</h2>
				<ItemList items={projects} />

				<h2 className="mb-2 text-3xl font-semibold tracking-tight">Skills</h2>
				<ItemList items={skills} />

				<h2 className="mb-4 text-3xl font-semibold tracking-tight">Other</h2>
				<ul className="space-y-2">
					{otherLinks.map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								className="text-base font-semibold tracking-tight text-black transition hover:opacity-60"
							>
								{link.label}
							</a>
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
		title: "About Jim van Duijsen | Frontend Developer",
		description:
			"Jim van Duijsen is a frontend developer working in Next.js, React and TypeScript, growing into full stack. Available for part-time work.",
		canonicalPath: "/about",
		children: <PortfolioPage />,
	});
};
