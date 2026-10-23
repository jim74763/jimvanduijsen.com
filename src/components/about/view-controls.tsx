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
			className="rounded-full border border-black/10 px-5 py-2 text-sm font-semibold tracking-tight transition hover:bg-black hover:text-white"
		>
			Download PDF
		</button>
		<nav
			aria-label="Page view"
			className="ml-auto inline-flex rounded-full border border-black/10 p-1 text-sm font-semibold tracking-tight"
		>
			{tabs.map((tab) => (
				<button
					key={tab.mode}
					type="button"
					x-on:click={`$store.view.set('${tab.mode}')`}
					x-bind:aria-pressed={`$store.view.is('${tab.mode}')`}
					x-bind:class={`$store.view.is('${tab.mode}') && 'bg-black! text-white!'`}
					className="rounded-full px-5 py-1.5 text-black/60 transition hover:text-black"
				>
					{tab.label}
				</button>
			))}
		</nav>
	</div>
);
