import { Footer } from "../components/footer.js";
import { MainNav } from "../components/home/main-nav.js";
import { ProfileSection } from "../components/home/profile-section.js";
import { JsonLd } from "../components/json-ld.js";
import { renderPage } from "../utils/document.js";
import { homeSchema } from "../utils/schema.org/home.js";

export default function JimLandingPage() {
	return (
		<main className="flex min-h-screen w-full flex-col overflow-x-hidden bg-background text-foreground">
			<JsonLd schema={homeSchema} />
			<div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-22 px-6 pb-14 pt-16 md:px-24">
				<div className="flex items-center justify-center gap-[30px] max-lg:flex-col max-lg:gap-12">
					<ProfileSection />
					<MainNav />
				</div>
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
