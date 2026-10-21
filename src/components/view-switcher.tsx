const tabs = [
	{ mode: "about", label: "About" },
	{ mode: "cv", label: "CV" },
];

export const ViewSwitcher = () => (
	<nav
		aria-label="Page view"
		className="inline-flex rounded-full border border-black/10 p-1 text-sm font-semibold tracking-tight"
	>
		{tabs.map((tab) => (
			<button
				key={tab.mode}
				type="button"
				x-on:click={`$store.view.mode = '${tab.mode}'`}
				x-bind:class={`$store.view.mode === '${tab.mode}' && 'bg-black! text-white!'`}
				className="rounded-full px-5 py-1.5 text-black/60 transition hover:text-black"
			>
				{tab.label}
			</button>
		))}
	</nav>
);
