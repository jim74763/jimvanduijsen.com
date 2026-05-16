import { footerLinks, footerMetaItems } from "../content/footer.js";

export const Footer = () => {
	return (
		<footer className="flex flex-col items-center gap-4 border-t border-current/10 px-6 py-10 text-center sm:px-16 sm:py-12">
			<a
				href="/"
				className="whitespace-nowrap text-xl font-semibold leading-[1.45] tracking-[-0.1px]"
			>
				Jim Van Duijsen
			</a>

			<nav className="flex flex-col items-center gap-2.5">
				{footerLinks.map((link) => (
					<a
						key={link.label}
						href={link.href}
						className="whitespace-nowrap text-center text-base font-medium leading-[1.45] tracking-[-0.08px] transition hover:opacity-60"
					>
						{link.label}
					</a>
				))}

				{footerMetaItems.map((item) => (
					<span
						key={item.label}
						className="whitespace-nowrap text-center text-base font-medium leading-[1.45] tracking-[-0.08px]"
					>
						{item.label}
					</span>
				))}
			</nav>
		</footer>
	);
};
