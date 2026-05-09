import { renderPage } from "../document";

type ProjectItem = {
  title: string;
  year: string;
  link?: string;
};

const projects: ProjectItem[] = [
  { title: "TJB Ai", year: "2026", link: "/tjb-ai-redir" },
  { title: "Freelance development", year: "2025" },
];

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-6 py-10 sm:px-12 sm:py-14">
        <header className="mb-8 max-w-xl">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-black/5">
            <AvatarIcon />
          </div>

          <h1 className="mb-3 text-3xl font-semibold tracking-tight">
            About me
          </h1>

          <p className="whitespace-pre-line text-base font-medium leading-relaxed text-black/65">
            I build AI agents and automation workflows. I am currently building
            TJB AI, a done-for-you AI agency that turns repetitive business
            tasks into useful AI coworker systems. I also work as a freelance
            developer.
          </p>
        </header>

        <h2 className="mb-4 text-3xl font-semibold tracking-tight">
          Projects i have worked on
        </h2>

        <ul className="w-full">
          {projects.map((project) => (
            <li key={`${project.title}-${project.year}`}>
              {project.link ? (
                <a
                  href={project.link}
                  className="flex h-16 items-center justify-between gap-4 border-b border-black/15 pr-2 text-black"
                >
                  <span className="truncate text-xl font-semibold tracking-tight">
                    {project.title}
                  </span>
                  <span className="shrink-0 text-xl font-medium tracking-tight text-black/60">
                    {project.year}
                  </span>
                </a>
              ) : (
                <div className="flex h-16 items-center justify-between gap-4 border-b border-black/15 pr-2">
                  <span className="truncate text-xl font-semibold tracking-tight">
                    {project.title}
                  </span>
                  <span className="shrink-0 text-xl font-medium tracking-tight text-black/60">
                    {project.year}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function AvatarIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="opacity-95"
    >
      <path
        d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5Z"
        fill="rgba(0,0,0,0.82)"
      />
      <path
        d="M4 22c0-4.418 3.582-8 8-8s8 3.582 8 8"
        stroke="rgba(0,0,0,0.82)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const aboutPage = () => {
  return renderPage({
    title: "About | Jim van Duijsen",
    description: "Portfolio and background overview.",
    children: <PortfolioPage />,
  });
};
