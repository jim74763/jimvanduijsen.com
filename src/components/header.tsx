import { navLinks } from "../content/header.js";

export const Header = () => {
	return (
		<header className="absolute inset-x-0 top-0 z-10 border-b border-[#858585]/20 bg-white">
			<input type="checkbox" id="menu-toggle" className="sr-only peer/menu" />

			<div className="flex h-[60px] items-center justify-between px-4 sm:px-16">
				<div className="flex items-center gap-3">
					<label
						htmlFor="menu-toggle"
						className="flex cursor-pointer flex-col gap-1.5 p-1 sm:hidden"
						aria-label="Toggle navigation menu"
					>
						<span className="block h-0.5 w-5 bg-current" />
						<span className="block h-0.5 w-5 bg-current" />
						<span className="block h-0.5 w-5 bg-current" />
					</label>

					<a
						href="/"
						className="whitespace-nowrap text-xl font-semibold leading-[1.45] tracking-[-0.1px]"
					>
						Jim van Duijsen
					</a>
				</div>

				<nav className="hidden items-center gap-8 sm:flex">
					{navLinks.map((link) => (
						<a
							key={link.label}
							href={link.href}
							className="whitespace-nowrap text-center text-base font-medium leading-[1.45] tracking-[-0.08px] transition hover:opacity-60"
						>
							{link.label}
						</a>
					))}
				</nav>
			</div>

			<nav className="hidden flex-col sm:hidden peer-checked/menu:flex">
				<a
					href="/"
					className="border-t border-[#858585]/20 px-6 py-4 text-base font-medium leading-[1.45] tracking-[-0.08px] transition hover:opacity-60"
				>
					Home
				</a>
				{navLinks.map((link) => (
					<a
						key={link.label}
						href={link.href}
						className="border-t border-[#858585]/20 px-6 py-4 text-base font-medium leading-[1.45] tracking-[-0.08px] transition hover:opacity-60"
					>
						{link.label}
					</a>
				))}
			</nav>
		</header>
	);
};
