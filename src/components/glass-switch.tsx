import { cn } from "cn";

type GlassSwitchOption = {
	value: string;
	label: string;
	onClick: string;
};

type GlassSwitchProps = {
	/** Which piece of state the switch mirrors. Read by /js/glass-switch.js. */
	kind: "theme" | "view";
	label: string;
	options: [GlassSwitchOption, GlassSwitchOption];
	className?: string;
};

/**
 * A two-option switch with a liquid glass knob.
 *
 * The buttons are real, labelled controls and work on their own. The canvas
 * is progressive enhancement: /js/glass-switch.js loads Three.js, draws the
 * track and the glass knob into it, then sets data-glass="on" so the plain
 * CSS fallback below steps aside. If WebGL is unavailable the fallback stays.
 */
export const GlassSwitch = ({
	kind,
	label,
	options,
	className,
}: GlassSwitchProps) => (
	// biome-ignore lint/a11y/useSemanticElements: a fieldset brings its own layout quirks to this grid
	<div
		role="group"
		aria-label={label}
		data-glass-switch={kind}
		x-data
		className={cn(
			"group/gs relative inline-grid h-12 w-[184px] shrink-0 grid-cols-2 rounded-full border border-border bg-surface p-1.5 transition-colors print:hidden",
			"data-[glass=on]:border-transparent data-[glass=on]:bg-transparent",
			className,
		)}
	>
		<canvas
			data-glass-canvas
			className="pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-300 group-data-[glass=on]/gs:opacity-100"
		/>
		{options.map((option) => (
			<button
				key={option.value}
				type="button"
				data-value={option.value}
				x-on:click={option.onClick}
				className="relative z-10 cursor-pointer rounded-full text-sm font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground data-active:bg-foreground data-active:text-background group-data-[glass=on]/gs:data-active:bg-transparent group-data-[glass=on]/gs:data-active:text-foreground"
			>
				{option.label}
			</button>
		))}
	</div>
);
