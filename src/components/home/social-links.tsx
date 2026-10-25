import { socials } from "../../content/home.js";
import { SocialLink } from "./social-link.js";

export const SocialLinks = () => (
	<div className="flex w-full items-center justify-center gap-2.5 max-sm:flex-col">
		{socials.map((social) => (
			<SocialLink key={social.href} social={social} />
		))}
	</div>
);
