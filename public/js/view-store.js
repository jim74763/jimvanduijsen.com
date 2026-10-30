function readSavedView() {
	try {
		return localStorage.getItem("view") === "cv" ? "cv" : "about";
	} catch {
		// Use About when the browser blocks access to localStorage.
		return "about";
	}
}

document.addEventListener("alpine:init", () => {
	Alpine.store("view", {
		mode: readSavedView(),

		is(mode) {
			return this.mode === mode;
		},

		set(mode) {
			this.mode = mode;
			document.documentElement.dataset.view = mode;

			try {
				localStorage.setItem("view", mode);
			} catch {
				// Switching views still works if the choice cannot be saved.
			}
		},
	});
});

// The inline ViewInit script shows the saved view until Alpine takes over.
document.addEventListener("alpine:initialized", () => {
	delete document.documentElement.dataset.viewPending;
});
