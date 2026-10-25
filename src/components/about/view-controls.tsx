import { GlassSwitch } from "../glass-switch.js";

const tabs = [
	{ mode: "about", label: "About" },
	{ mode: "cv", label: "CV" },
];

export const ViewControls = () => (
	<div className="mb-8 flex items-center justify-between gap-3 sm:justify-end print:hidden">
		<button
			type="button"
			data-cv-only
			x-show="$store.view.is('cv')"
			x-on:click="window.print()"
			className="rounded-full border border-border px-5 py-2 text-sm font-semibold tracking-tight transition hover:bg-foreground hover:text-background"
		>
			Download PDF
		</button>
		<GlassSwitch
			kind="view"
			label="Page view"
			className="ml-auto"
			options={[
				{
					value: tabs[0].mode,
					label: tabs[0].label,
					onClick: `$store.view.set('${tabs[0].mode}')`,
				},
				{
					value: tabs[1].mode,
					label: tabs[1].label,
					onClick: `$store.view.set('${tabs[1].mode}')`,
				},
			]}
		/>
	</div>
);
