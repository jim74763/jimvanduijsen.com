// Liquid glass switches (see src/components/glass-switch.tsx).
//
// Every [data-glass-switch] element mirrors one piece of state that already
// lives on <html>: the "dark" class for the theme switch and data-view for
// the About/CV switch. The Alpine stores still own that state and handle the
// clicks; this script only keeps the buttons in sync and, when WebGL is
// available, paints a glass knob that slides between the two options.
//
// Three.js is loaded lazily, so pages stay light until a switch is on screen.
(() => {
	const THREE_URL =
		"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js";
	const root = document.documentElement;

	const readers = {
		theme: () => (root.classList.contains("dark") ? "dark" : "light"),
		view: () => root.dataset.view || "about",
	};

	let threePromise;
	const loadThree = () => {
		threePromise ||= import(THREE_URL);
		return threePromise;
	};

	const idle = (fn) =>
		"requestIdleCallback" in window
			? requestIdleCallback(fn, { timeout: 1500 })
			: setTimeout(fn, 200);

	function syncButtons(el, value) {
		for (const button of el.querySelectorAll("button[data-value]")) {
			const active = button.dataset.value === value;
			button.toggleAttribute("data-active", active);
			button.setAttribute("aria-pressed", String(active));
		}
	}

	async function enhance(el, read, values) {
		const canvas = el.querySelector("[data-glass-canvas]");
		if (!canvas) return;

		let THREE;
		try {
			THREE = await loadThree();
		} catch {
			return; // CDN blocked or offline: keep the CSS fallback.
		}

		let renderer;
		try {
			renderer = new THREE.WebGLRenderer({
				canvas,
				antialias: true,
				alpha: true,
				powerPreference: "low-power",
			});
		} catch {
			return; // No WebGL: keep the CSS fallback.
		}
		renderer.setClearColor(0x000000, 0);

		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000);
		camera.position.z = 300;

		// Tiny studio made of bright panels. The glass reflects it, which is
		// where the soft highlights along the knob come from.
		const envScene = new THREE.Scene();
		envScene.add(
			new THREE.Mesh(
				new THREE.BoxGeometry(24, 24, 24),
				new THREE.MeshBasicMaterial({
					color: new THREE.Color(0.55, 0.55, 0.58),
					side: THREE.BackSide,
				}),
			),
		);
		const panel = (w, h, x, y, z, intensity) => {
			const mesh = new THREE.Mesh(
				new THREE.PlaneGeometry(w, h),
				new THREE.MeshBasicMaterial({
					color: new THREE.Color(intensity, intensity, intensity),
					side: THREE.DoubleSide,
				}),
			);
			mesh.position.set(x, y, z);
			mesh.lookAt(0, 0, 0);
			envScene.add(mesh);
		};
		panel(14, 4, 0, 9, 4, 7);
		panel(3, 10, -9, 0, 4, 3.5);
		panel(3, 10, 9, 0, 4, 3.5);
		panel(14, 4, 0, -9, 4, 1.8);
		panel(6, 6, 0, 0, 10, 1.2);
		const pmrem = new THREE.PMREMGenerator(renderer);
		scene.environment = pmrem.fromScene(envScene, 0.03).texture;
		pmrem.dispose();

		const glass = new THREE.MeshPhysicalMaterial({
			color: 0xffffff,
			metalness: 0,
			roughness: 0.1,
			transmission: 1,
			ior: 1.45,
			dispersion: 0.25,
			clearcoat: 0.6,
			clearcoatRoughness: 0.12,
			attenuationColor: new THREE.Color(0xffffff),
			attenuationDistance: 1e5,
		});

		const trackCanvas = document.createElement("canvas");
		const trackTexture = new THREE.CanvasTexture(trackCanvas);
		trackTexture.colorSpace = THREE.SRGBColorSpace;
		trackTexture.anisotropy = 4;
		const trackMaterial = new THREE.MeshBasicMaterial({ map: trackTexture });

		let track;
		let knob;
		let w = 0;
		let h = 0;
		let pad = 0;
		let dpr = 1;
		let knobTravel = 0;

		const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
		let pos = values.indexOf(read());
		let target = pos;
		let scale = 1;
		let targetScale = 1;
		let raf = 0;
		let last = 0;
		let shown = false;

		function pillShape(width, height) {
			const r = height / 2;
			const x = -width / 2;
			const y = -height / 2;
			const shape = new THREE.Shape();
			shape.moveTo(x + r, y);
			shape.lineTo(x + width - r, y);
			shape.absarc(x + width - r, y + r, r, -Math.PI / 2, Math.PI / 2, false);
			shape.lineTo(x + r, y + height);
			shape.absarc(x + r, y + r, r, Math.PI / 2, Math.PI * 1.5, false);
			return shape;
		}

		function buildMeshes() {
			if (track) {
				track.geometry.dispose();
				scene.remove(track);
			}
			if (knob) {
				knob.geometry.dispose();
				scene.remove(knob);
			}

			const trackGeometry = new THREE.ShapeGeometry(pillShape(w, h), 48);
			const position = trackGeometry.attributes.position;
			const uv = new Float32Array(position.count * 2);
			for (let i = 0; i < position.count; i++) {
				uv[i * 2] = (position.getX(i) + w / 2) / w;
				uv[i * 2 + 1] = (position.getY(i) + h / 2) / h;
			}
			trackGeometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
			track = new THREE.Mesh(trackGeometry, trackMaterial);
			track.position.z = -30;
			scene.add(track);

			const knobWidth = (w - pad * 2) / 2;
			const knobHeight = h - pad * 2;
			const bevel = knobHeight * 0.3;
			const knobGeometry = new THREE.ExtrudeGeometry(
				pillShape(knobWidth - bevel * 2, knobHeight - bevel * 2),
				{
					depth: knobHeight * 0.1,
					bevelEnabled: true,
					bevelSize: bevel,
					bevelThickness: bevel,
					bevelSegments: 16,
					curveSegments: 40,
				},
			);
			knobGeometry.center();
			glass.thickness = knobHeight * 1.1;
			knob = new THREE.Mesh(knobGeometry, glass);
			scene.add(knob);
			knobTravel = knobWidth / 2;
		}

		function drawTrack() {
			const css = getComputedStyle(root);
			const get = (name) => css.getPropertyValue(name).trim();
			const dark = root.classList.contains("dark");

			trackCanvas.width = Math.max(1, Math.round(w * dpr));
			trackCanvas.height = Math.max(1, Math.round(h * dpr));
			const c = trackCanvas.getContext("2d");
			c.setTransform(dpr, 0, 0, dpr, 0, 0);
			c.clearRect(0, 0, w, h);

			const pill = (x, y, width, height) => {
				const r = height / 2;
				c.beginPath();
				c.moveTo(x + r, y);
				c.lineTo(x + width - r, y);
				c.arc(x + width - r, y + r, r, -Math.PI / 2, Math.PI / 2);
				c.lineTo(x + r, y + height);
				c.arc(x + r, y + r, r, Math.PI / 2, Math.PI * 1.5);
				c.closePath();
			};

			// Outer rim.
			pill(0, 0, w, h);
			c.fillStyle = dark ? get("--surface-hover") : get("--surface");
			c.fill();
			const sheen = c.createLinearGradient(0, 0, 0, h);
			sheen.addColorStop(0, dark ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.7)");
			sheen.addColorStop(1, dark ? "rgba(0,0,0,.25)" : "rgba(0,0,0,.04)");
			pill(0, 0, w, h);
			c.fillStyle = sheen;
			c.fill();

			// Recessed well with a soft inner shadow.
			const innerW = w - pad * 2;
			const innerH = h - pad * 2;
			pill(pad, pad, innerW, innerH);
			c.fillStyle = dark ? get("--background") : get("--surface-hover");
			c.fill();
			c.save();
			pill(pad, pad, innerW, innerH);
			c.clip();
			c.shadowColor = dark ? "rgba(0,0,0,.9)" : "rgba(20,20,40,.28)";
			c.shadowBlur = 8;
			c.shadowOffsetY = 3;
			c.beginPath();
			c.rect(-40, -40, w + 80, h + 80);
			const r = innerH / 2;
			c.moveTo(pad + r, pad);
			c.lineTo(pad + innerW - r, pad);
			c.arc(pad + innerW - r, pad + r, r, -Math.PI / 2, Math.PI / 2);
			c.lineTo(pad + r, pad + innerH);
			c.arc(pad + r, pad + r, r, Math.PI / 2, Math.PI * 1.5);
			c.closePath();
			c.fillStyle = "#000";
			c.fill("evenodd");
			c.restore();

			// Divider between the two options.
			c.fillStyle = dark ? "rgba(255,255,255,.14)" : "rgba(0,0,0,.14)";
			c.fillRect(w / 2 - 0.5, pad + innerH * 0.28, 1, innerH * 0.44);

			trackTexture.needsUpdate = true;

			// Keep the glass readable on both backgrounds.
			glass.color.set(dark ? 0xb9b9bf : 0xffffff);
			scene.environmentIntensity = dark ? 0.5 : 1;
		}

		function render() {
			if (!knob) return;
			knob.position.x = (pos * 2 - 1) * knobTravel;
			knob.scale.setScalar(scale);
			renderer.render(scene, camera);
			if (!shown) {
				shown = true;
				el.dataset.glass = "on";
			}
		}

		function frame(now) {
			const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
			last = now;
			pos += (target - pos) * (1 - Math.exp(-dt * 16));
			scale += (targetScale - scale) * (1 - Math.exp(-dt * 24));
			const settled =
				Math.abs(target - pos) < 0.002 && Math.abs(targetScale - scale) < 0.002;
			if (settled) {
				pos = target;
				scale = targetScale;
				raf = 0;
			} else {
				raf = requestAnimationFrame(frame);
			}
			render();
		}

		function request() {
			if (reduceMotion.matches) {
				pos = target;
				scale = targetScale;
				render();
				return;
			}
			if (!raf) {
				last = performance.now();
				raf = requestAnimationFrame(frame);
			}
		}

		function resize() {
			const nextW = el.clientWidth;
			const nextH = el.clientHeight;
			if (!nextW || !nextH) return;
			w = nextW;
			h = nextH;
			pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			renderer.setPixelRatio(dpr);
			renderer.setSize(w, h, false);
			camera.left = -w / 2;
			camera.right = w / 2;
			camera.top = h / 2;
			camera.bottom = -h / 2;
			camera.updateProjectionMatrix();
			buildMeshes();
			drawTrack();
			render();
		}

		new ResizeObserver(resize).observe(el);

		let wasDark = root.classList.contains("dark");
		new MutationObserver(() => {
			const index = values.indexOf(read());
			if (index !== -1) target = index;
			const isDark = root.classList.contains("dark");
			if (isDark !== wasDark) {
				wasDark = isDark;
				if (w) drawTrack();
			}
			request();
		}).observe(root, {
			attributes: true,
			attributeFilter: ["class", "data-view"],
		});

		const press = () => {
			targetScale = 1.1;
			request();
		};
		const release = () => {
			targetScale = 1;
			request();
		};
		el.addEventListener("pointerdown", press);
		el.addEventListener("pointerup", release);
		el.addEventListener("pointerleave", release);
		el.addEventListener("pointercancel", release);

		canvas.addEventListener("webglcontextlost", (event) => {
			event.preventDefault();
			delete el.dataset.glass;
			shown = false;
		});
		canvas.addEventListener("webglcontextrestored", () => {
			if (w) {
				drawTrack();
				render();
			}
		});

		resize();
	}

	function init(el) {
		const read = readers[el.dataset.glassSwitch];
		if (!read) return;
		const values = [...el.querySelectorAll("button[data-value]")].map(
			(button) => button.dataset.value,
		);

		const sync = () => syncButtons(el, read());
		sync();
		new MutationObserver(sync).observe(root, {
			attributes: true,
			attributeFilter: ["class", "data-view"],
		});

		idle(() => enhance(el, read, values));
	}

	function start() {
		for (const el of document.querySelectorAll("[data-glass-switch]")) init(el);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", start);
	} else {
		start();
	}
})();
