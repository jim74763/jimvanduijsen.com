import { links } from "../../content/home.js";
import { MainNavLink } from "./main-nav-link.js";

export const MainNav = () => (
	<nav
		aria-label="Main"
		className="flex w-full max-w-[529px] flex-shrink-0 flex-col items-center justify-center gap-5 px-0 md:px-[50px]"
	>
		{links.map((link) => (
			<MainNavLink key={link.href} link={link} />
		))}
	</nav>
);
