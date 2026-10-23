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
		<nav
			aria-label="Page view"
			className="ml-auto inline-flex rounded-full border border-border p-1 text-sm font-semibold tracking-tight"
		>
			{tabs.map((tab) => (
				<button
					key={tab.mode}
					type="button"
					x-on:click={`$store.view.set('${tab.mode}')`}
					x-bind:aria-pressed={`$store.view.is('${tab.mode}')`}
					x-bind:class={`$store.view.is('${tab.mode}') && 'bg-foreground! text-background!'`}
					className="rounded-full px-5 py-1.5 text-muted-foreground transition hover:text-foreground"
				>
					{tab.label}
				</button>
			))}
		</nav>
	</div>
);
