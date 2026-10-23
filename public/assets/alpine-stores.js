// Alpine stores for the whole site. Loaded before Alpine itself (both scripts
// are deferred, so they run in document order).
document.addEventListener("alpine:init", () => {
	// About/CV switcher on the about page. The saved view is also applied to
	// <html data-view> before first paint by the inline script in ViewInit.
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
			} catch {}
		},
	});
});

// Alpine now controls visibility with x-show, so drop the pre-Alpine CSS rules.
document.addEventListener("alpine:initialized", () => {
	delete document.documentElement.dataset.viewPending;
});

function readSavedView() {
	try {
		return localStorage.getItem("view") === "cv" ? "cv" : "about";
	} catch {
		return "about";
	}
}
