import type { Child } from "hono/jsx";

const hidden = {
	top: "-translate-y-80",
	bottom: "translate-y-full",
};

// Shown in About mode, slides away in CV mode.
export const SlideOut = ({
	from,
	className,
	children,
}: {
	from: keyof typeof hidden;
	className?: string;
	children: Child;
}) => (
	<div
		className={className}
		data-about-only
		x-show="$store.view.is('about')"
		x-transition:enter="transition duration-300 ease-out motion-reduce:transition-none"
		x-transition:enter-start={hidden[from]}
		x-transition:enter-end="translate-y-0"
		x-transition:leave="transition duration-300 ease-in motion-reduce:transition-none"
		x-transition:leave-start="translate-y-0"
		x-transition:leave-end={hidden[from]}
	>
		{children}
	</div>
);
