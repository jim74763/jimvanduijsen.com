import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { JsonLd } from "../components/json-ld.js";
import { softwareCategories } from "../content/software.js";
import { renderPage } from "../utils/document.js";
import { softwareSchema } from "../utils/schema.org/software.js";

const Software = () => {
	return (
		<main className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-black">
			<JsonLd schema={softwareSchema(softwareCategories)} />
			<Header />
			<section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 pb-28 pt-[104px] sm:px-12 sm:pb-32">
				<header className="mb-8 max-w-xl">
					<h1 className="mb-3 text-3xl font-semibold tracking-tight">
						Software I recommend
					</h1>
					<p className="text-base font-medium leading-relaxed text-black/65">
						Tools and services I actually use, grouped by category. None of
						these are affiliate links.
					</p>
				</header>

				<div className="flex flex-col gap-10">
					{softwareCategories.map((category) => (
						<section key={category.name}>
							<h2 className="mb-4 text-xl font-semibold tracking-tight">
								{category.name}
							</h2>

							<ul className="flex flex-col divide-y divide-black/10 border-t border-black/10">
								{category.items.map((item) => (
									<li key={item.href}>
										<a
											href={item.href}
											target="_blank"
											rel="noreferrer"
											className="flex items-center gap-4 py-4 transition hover:opacity-60"
										>
											<img
												src={`https://${item.domain}/favicon.ico`}
												alt=""
												loading="lazy"
												width="32"
												height="32"
												className="h-8 w-8 flex-shrink-0 rounded-md border border-black/10"
											/>
											<span className="min-w-0 flex-1">
												<span className="block text-base font-semibold tracking-tight text-black">
													{item.name}
												</span>
												<span className="block text-sm font-medium leading-relaxed text-black/65">
													{item.description}
												</span>
											</span>
										</a>
									</li>
								))}
							</ul>
						</section>
					))}
				</div>
			</section>
			<Footer />
		</main>
	);
};

export default Software;

export const softwarePage = () => {
	return renderPage({
		title: "Software I recommend | Jim van Duijsen",
		description:
			"Software, tools, and services Jim van Duijsen recommends across UX/UI, hosting, AI, and more.",
		canonicalPath: "/software",
		children: <Software />,
	});
};
