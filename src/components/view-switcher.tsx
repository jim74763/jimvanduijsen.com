type View = "about" | "cv";

const views: { id: View; label: string; href: string }[] = [
	{ id: "about", label: "About", href: "/about" },
	{ id: "cv", label: "CV", href: "/cv" },
];

export const ViewSwitcher = ({ active }: { active: View }) => (
	<nav
		aria-label="Page view"
		className="inline-flex rounded-full border border-black/10 p-1 text-sm font-semibold tracking-tight"
	>
		{views.map((view) => (
			<a
				key={view.id}
				href={view.href}
				aria-current={view.id === active ? "page" : undefined}
				className={
					view.id === active
						? "rounded-full bg-black px-5 py-1.5 text-white"
						: "rounded-full px-5 py-1.5 text-black/60 transition hover:text-black"
				}
			>
				{view.label}
			</a>
		))}
	</nav>
);
