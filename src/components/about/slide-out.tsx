import type { Child } from "hono/jsx";

const offscreen = {
	top: "-translate-y-80",
	bottom: "translate-y-full",
};

const slide = "transition duration-300 motion-reduce:transition-none";

// Shown in About mode, slides away in CV mode.
// data-about-only lets CSS hide it before Alpine starts (see styles.css).
export const SlideOut = ({
	from,
	className,
	children,
}: {
	from: keyof typeof offscreen;
	className?: string;
	children: Child;
}) => (
	<div
		className={className}
		data-about-only
		x-show="$store.view.is('about')"
		x-transition:enter={slide}
		x-transition:enter-start={offscreen[from]}
		x-transition:leave={slide}
		x-transition:leave-end={offscreen[from]}
	>
		{children}
	</div>
);
