import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { projects } from "../content/about";
import { renderPage } from "../document";

export default function PortfolioPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-black">
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
            TJB AI, a done-for-you AI agency that turns repetitive business
            tasks into useful AI coworker systems. <br />I also work as a
            freelance developer with notable clients such as Crypto-Insiders,
            and I also have a web agency called jimvd.
          </p>
        </header>

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
    title: "About | Jim van Duijsen",
    description: "Portfolio and background overview.",
    children: <PortfolioPage />,
  });
};
