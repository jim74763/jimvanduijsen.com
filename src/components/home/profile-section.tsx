import { bio, profileImage } from "../../content/home.js";
import { BioHighlightTrigger } from "./bio-highlight-trigger.js";
import { SocialLinks } from "./social-links.js";

export const ProfileSection = () => (
	<section className="flex w-full max-w-[529px] flex-shrink-0 flex-col items-center gap-5 py-px text-center">
		<div className="h-[428px] w-full overflow-hidden rounded-[15px]">
			<img
				src={profileImage}
				alt="Jim van Duijsen"
				className="h-full w-full object-cover object-top"
			/>
		</div>

		<h1 className="text-4xl font-semibold leading-[1.2] tracking-[-0.5px]">
			Jim van Duijsen
		</h1>

		<div className="relative w-full">
			<p className="text-lg leading-[1.7] text-secondary-foreground">
				{bio.beforeWork}
				<BioHighlightTrigger {...bio.work} />
				{bio.betweenHighlights}
				<BioHighlightTrigger {...bio.study} />
				{bio.afterStudy}
			</p>
		</div>

		<SocialLinks />
	</section>
);
