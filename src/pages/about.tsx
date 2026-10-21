import { CvView } from "../components/cv-view.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { JsonLd } from "../components/json-ld.js";
import { ViewSwitcher } from "../components/view-switcher.js";
import {
	type AboutItem,
	education,
	experience,
	projects,
	skills,
	story,
} from "../content/about.js";
import { renderPage } from "../utils/document.js";
import { aboutSchema } from "../utils/schema.org/about.js";

function ItemList({ items }: { items: AboutItem[] }) {
	return (
		<ul className="w-full">
			{items.map((item) => (
				<li key={item.title} className="border-b border-black/15 py-5">
					<div className="flex items-baseline justify-between gap-4">
						<h3 className="text-xl font-semibold tracking-tight">
							{item.title}
						</h3>
						{item.period ? (
							<span className="shrink-0 text-base font-medium text-black/60">
								{item.period}
							</span>
						) : null}
					</div>
					{item.subtitle ? (
						<p className="text-base font-medium text-black/60">
							{item.subtitle}
						</p>
					) : null}
					{item.body || item.bullets ? (
						<div className="mt-2 max-w-xl text-base font-medium leading-relaxed text-black/65">
							{item.body ? <p>{item.body}</p> : null}
							{item.bullets ? (
								<ul className="mt-3 list-disc space-y-2 pl-5">
									{item.bullets.map((bullet) => (
										<li key={bullet}>{bullet}</li>
									))}
								</ul>
							) : null}
						</div>
					) : null}
					{item.link || item.extraLink ? (
						<div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-base font-semibold tracking-tight">
							{item.link ? (
								<a
									href={item.link}
									className="text-black transition hover:opacity-60"
								>
									{item.linkLabel ?? "Visit"}
								</a>
							) : null}
							{item.extraLink ? (
								<a
									href={item.extraLink.href}
									className="text-black transition hover:opacity-60"
								>
									{item.extraLink.label}
								</a>
							) : null}
						</div>
					) : null}
				</li>
			))}
		</ul>
	);
}

const alpine = (
	<>
		<script
			dangerouslySetInnerHTML={{
				__html:
					'document.addEventListener("alpine:init",()=>{let m="about";try{m=localStorage.getItem("view")==="cv"?"cv":"about"}catch(e){}Alpine.store("view",{mode:m,init(){Alpine.effect(()=>{try{localStorage.setItem("view",this.mode)}catch(e){}})}})})',
			}}
		/>
		<script
			defer
			src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js"
		/>
	</>
);

export default function PortfolioPage() {
	return (
		<main
			x-data
			className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-black"
		>
			<JsonLd schema={aboutSchema(projects)} />
			<div
				className="absolute inset-x-0 top-0 z-10"
				x-show="$store.view.mode === 'about'"
				x-transition:enter="transition duration-300 ease-out"
				x-transition:enter-start="-translate-y-24"
				x-transition:enter-end="translate-y-0"
				x-transition:leave="transition duration-300 ease-in"
				x-transition:leave-start="translate-y-0"
				x-transition:leave-end="-translate-y-24"
			>
				<Header />
			</div>
			<section
				className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 pb-28 pt-[104px] sm:px-12 sm:pb-32 print:px-0 print:pb-0 print:pt-0!"
				x-bind:class="$store.view.mode === 'cv' && 'pt-8! max-w-3xl!'"
			>
				<div className="mb-8 flex items-center justify-between gap-3 sm:justify-end print:hidden">
					<button
						type="button"
						x-show="$store.view.mode === 'cv'"
						x-cloak
						x-on:click="window.print()"
						className="rounded-full border border-black/10 px-5 py-2 text-sm font-semibold tracking-tight transition hover:bg-black hover:text-white"
					>
						Download PDF
					</button>
					<ViewSwitcher />
				</div>

				<div x-show="$store.view.mode === 'cv'" x-cloak>
					<CvView />
				</div>

				<div x-show="$store.view.mode === 'about'">
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

					<h2 className="mb-2 mt-14 text-3xl font-semibold tracking-tight">
						Education
					</h2>
					<ItemList items={education} />

					<h2 className="mb-2 mt-14 text-3xl font-semibold tracking-tight">
						Featured projects
					</h2>
					<ItemList items={projects} />

					<h2 className="mb-2 mt-14 text-3xl font-semibold tracking-tight">
						Skills
					</h2>
					<ItemList items={skills} />
				</div>
			</section>
			<div
				x-show="$store.view.mode === 'about'"
				x-transition:enter="transition duration-300 ease-out"
				x-transition:enter-start="translate-y-full"
				x-transition:enter-end="translate-y-0"
				x-transition:leave="transition duration-300 ease-in"
				x-transition:leave-start="translate-y-0"
				x-transition:leave-end="translate-y-full"
			>
				<Footer />
			</div>
		</main>
	);
}

export const aboutPage = () => {
	return renderPage({
		title: "About Jim van Duijsen | Frontend Developer",
		description:
			"Jim van Duijsen is a frontend developer working in Next.js, React and TypeScript, growing into full stack. Available for part-time work.",
		canonicalPath: "/about",
		metadata: alpine,
		children: <PortfolioPage />,
	});
};
