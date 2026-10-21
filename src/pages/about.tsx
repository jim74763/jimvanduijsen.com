import { AboutView } from "../components/about/about-view.js";
import { CvView } from "../components/about/cv-view.js";
import { SlideOut } from "../components/about/slide-out.js";
import { ViewControls } from "../components/about/view-controls.js";
import { ViewStore } from "../components/about/view-store.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { JsonLd } from "../components/json-ld.js";
import { projects } from "../content/about.js";
import { renderPage } from "../utils/document.js";
import { aboutSchema } from "../utils/schema.org/about.js";

export default function PortfolioPage() {
	return (
		<main
			x-data
			className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-black"
		>
			<JsonLd schema={aboutSchema(projects)} />
			<SlideOut from="top" className="absolute inset-x-0 top-0 z-10">
				<Header />
			</SlideOut>
			<section
				className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 pb-28 pt-[104px] sm:px-12 sm:pb-32 print:px-0 print:pb-0 print:pt-0!"
				x-bind:class="$store.view.mode === 'cv' && 'pt-8! max-w-3xl!'"
			>
				<ViewControls />
				<div x-show="$store.view.mode === 'cv'" x-cloak>
					<CvView />
				</div>
				<AboutView />
			</section>
			<SlideOut from="bottom">
				<Footer />
			</SlideOut>
		</main>
	);
}

export const aboutPage = () => {
	return renderPage({
		title: "About Jim van Duijsen | Frontend Developer",
		description:
			"Jim van Duijsen is a frontend developer working in Next.js, React and TypeScript, growing into full stack. Available for part-time work.",
		canonicalPath: "/about",
		metadata: <ViewStore />,
		children: <PortfolioPage />,
	});
};
