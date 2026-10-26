import type { BioHighlight } from "../../content/home.js";

export const BioHighlightTrigger = ({
	id,
	label,
	description,
}: BioHighlight) => {
	const tipId = `tip-${id}`;

	return (
		<span className="group">
			<button
				type="button"
				aria-describedby={tipId}
				className="cursor-pointer underline decoration-1 underline-offset-4"
			>
				{label}
			</button>
			<span
				id={tipId}
				role="tooltip"
				className="pointer-events-none invisible absolute inset-x-0 top-full z-10 mt-2.5 rounded-xl border border-border bg-background px-5 py-4 text-left text-[15px] leading-relaxed text-secondary-foreground opacity-0 shadow-[var(--tooltip-shadow)] transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
			>
				{description}
			</span>
		</span>
	);
};
