document.addEventListener("alpine:init", () => {
	Alpine.data("contactForm", () => ({
		sending: false,
		status: "",

		async submit() {
			this.sending = true;
			this.status = "Sending...";
			try {
				const response = await fetch(this.$el.action, {
					method: "POST",
					body: new FormData(this.$el),
				});
				if (!response.ok) throw new Error();
				this.$el.reset();
				this.status =
					"Thanks, your message has been sent. I'll get back to you soon.";
			} catch {
				this.status = "Something went wrong. Please try again.";
			} finally {
				this.sending = false;
			}
		},
	}));
});
