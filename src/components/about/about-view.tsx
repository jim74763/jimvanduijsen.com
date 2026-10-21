import {
	education,
	experience,
	projects,
	skills,
	story,
} from "../../content/about.js";
import { ItemList } from "./item-list.js";

const SectionTitle = ({
	children,
	first,
}: {
	children: string;
	first?: boolean;
}) => (
	<h2
		className={`mb-2 text-3xl font-semibold tracking-tight ${first ? "" : "mt-14"}`}
	>
		{children}
	</h2>
);

export const AboutView = () => (
	<div x-show="$store.view.mode === 'about'">
		<header className="mb-14 max-w-xl">
			<div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 relative overflow-hidden">
				<img
					src="/assets/images/jim-mirror-avatar.png"
					alt="jim van duijsen"
					className="absolute inset-0 object-cover"
				/>
			</div>

			<h1 className="mb-3 text-3xl font-semibold tracking-tight">About me</h1>

			{story.paragraphs.map((paragraph) => (
				<p
					key={paragraph}
					className="text-base font-medium leading-relaxed text-black/65"
				>
					{paragraph}
				</p>
			))}
			<p className="mt-3 text-base font-medium leading-relaxed text-black/65">
				<span className="text-black">Languages:</span> {story.languages}
			</p>
		</header>

		<SectionTitle first>Experience</SectionTitle>
		<ItemList items={experience} />

		<SectionTitle>Education</SectionTitle>
		<ItemList items={education} />

		<SectionTitle>Featured projects</SectionTitle>
		<ItemList items={projects} />

		<SectionTitle>Skills</SectionTitle>
		<ItemList items={skills} />
	</div>
);
