import { cn } from "cn";
import type { SocialItem } from "../../content/home.js";

export const SocialLink = ({ social }: { social: SocialItem }) => (
	<a
		href={social.href}
		target="_blank"
		rel="noreferrer"
		aria-label={social.label}
		className="flex h-[50px] w-[200px] flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-[30px] bg-surface px-3.5 py-2.5 transition hover:bg-surface-hover"
	>
		<span className="relative block h-6 w-6 flex-shrink-0 overflow-hidden">
			<img
				src={social.icon}
				alt=""
				loading="lazy"
				className={cn(
					"absolute inset-0 block h-full w-full object-contain",
					social.label === "GitHub" && "theme-brand-icon",
				)}
			/>
		</span>

		<span className="whitespace-nowrap text-left text-xl font-normal leading-normal">
			{social.text}
		</span>
	</a>
);
