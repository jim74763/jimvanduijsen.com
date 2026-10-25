document.addEventListener("alpine:init", () => {
	Alpine.store("theme", {
		isDark: document.documentElement.classList.contains("dark"),

		toggle() {
			const root = document.documentElement;
			root.classList.add("theme-switching");
			this.isDark = root.classList.toggle("dark");
			// Apply the new theme before restoring transitions.
			void root.offsetWidth;
			root.classList.remove("theme-switching");

			try {
				localStorage.setItem("theme", this.isDark ? "dark" : "light");
			} catch {
				// The toggle still works when storage is unavailable.
			}
		},
	});
});
