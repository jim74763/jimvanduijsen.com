import type { HomeLinkItem } from "../../content/home.js";

export const MainNavLink = ({ link }: { link: HomeLinkItem }) => (
	<a
		href={link.href}
		target={link.isExternal ? "_blank" : undefined}
		rel={link.isExternal ? "noreferrer" : undefined}
		className="relative flex h-[76px] w-full max-w-[430px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-surface px-[46px] py-[23px] text-center text-2xl font-semibold transition hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-current/40"
	>
		{link.label}
	</a>
);
