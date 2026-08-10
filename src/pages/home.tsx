import { Footer } from "../components/footer.js";
import { JsonLd } from "../components/json-ld.js";
import { links, profileImage, socials } from "../content/home.js";
import { renderPage } from "../utils/document.js";
import { homeSchema } from "../utils/schema.org/home.js";

export default function JimLandingPage() {
	return (
		<main className="flex min-h-screen w-full flex-col overflow-x-hidden bg-[linear-gradient(180deg,#666_0%,#4d4d4d_25%,#333_50%,#1a1a1a_75%,#0d0d0d_87.5%,#060606_93.75%,#000_100%)] text-white">
			<JsonLd schema={homeSchema} />
			<div className="mx-auto flex w-full flex-1 max-w-[1280px] items-center justify-center gap-[30px] px-6 py-12 md:px-24 max-lg:flex-col">
				<section className="flex w-full max-w-[529px] flex-shrink-0 flex-col items-center gap-[15px] py-px">
					<div className="h-[428px] w-full overflow-hidden rounded-[15px]">
						<img
							src={profileImage}
							alt="Jim van Duijsen"
							className="h-full w-full object-cover"
						/>
					</div>

					<h1 className="min-h-[55px] text-center text-4xl font-semibold leading-[1.45]">
						Jim van Duijsen
					</h1>

					<div className="flex w-full items-center justify-center gap-2.5 max-sm:flex-col">
						{socials.map((social) => (
							<a
								key={social.href}
								href={social.href}
								target="_blank"
								rel="noreferrer"
								aria-label={social.label}
								className="flex h-[50px] w-[200px] flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-[30px] bg-[#1c1c1c] px-3.5 py-2.5 transition hover:bg-[#2a2a2a]"
							>
								<span className="relative block h-6 w-6 flex-shrink-0 overflow-hidden">
									<img
										src={social.icon}
										alt=""
										loading="lazy"
										className="absolute inset-0 block h-full w-full object-contain"
									/>
								</span>

								<span className="whitespace-nowrap text-left text-xl font-normal leading-normal">
									{social.text}
								</span>
							</a>
						))}
					</div>
				</section>

				<section className="flex w-full max-w-[529px] flex-shrink-0 flex-col items-center justify-center gap-5 px-0 md:px-[50px]">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							target={link.isExternal ? "_blank" : undefined}
							rel={link.isExternal ? "noreferrer" : undefined}
							className="relative flex h-[76px] w-full max-w-[430px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#1c1c1c] px-[46px] py-[23px] text-center text-2xl font-semibold text-white transition hover:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-white/40"
						>
							{link.label}
						</a>
					))}
				</section>
			</div>
			<br />
			<br />
			<br />
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
		bgDark: true,
		children: <JimLandingPage />,
	});
};
