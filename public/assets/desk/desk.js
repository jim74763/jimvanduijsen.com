/* Jim van Duijsen home page: interactive 3D desk. Needs /assets/vendor/three.min.js (r128). Item copy comes from the #desk-content JSON block (src/content/home.ts). */
(function () {
  var THREE = window.THREE;
  var stage = document.getElementById('c');
  var CONTENT = {};
  try { CONTENT = JSON.parse(document.getElementById('desk-content').textContent) || {}; } catch (e) { CONTENT = {}; }
  function fallback() {
    document.getElementById('fallback').hidden = false;
    stage.hidden = true;
    ['hint', 'chips'].forEach(function (id) { document.getElementById(id).hidden = true; });
    document.querySelector('.hud').hidden = true;
    var tn = document.querySelector('.topnav'); if (tn) tn.hidden = true;
  }
  if (!THREE) { fallback(); return; }
  var renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: stage, antialias: true }); } catch (e) { fallback(); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  var BG = 0x050505;
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(BG);
  scene.fog = new THREE.Fog(BG, 4.5, 11);

  var camera = new THREE.PerspectiveCamera(60, 1, 0.05, 50);
  camera.rotation.order = 'YXZ';
  var EYE = new THREE.Vector3(0, 1.22, 0.45);
  camera.position.copy(EYE);
  scene.add(camera);

  /* ---------- helpers ---------- */
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function mat(color, o) { return new THREE.MeshStandardMaterial(Object.assign({ color: color, roughness: 0.78, metalness: 0 }, o || {})); }
  function box(w, h, d, m, x, y, z, parent) {
    var o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    o.position.set(x || 0, y || 0, z || 0);
    o.castShadow = true; o.receiveShadow = true;
    if (parent) parent.add(o);
    return o;
  }
  function cyl(rt, rb, h, m, x, y, z, parent, seg) {
    var o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 32), m);
    o.position.set(x || 0, y || 0, z || 0);
    o.castShadow = true; o.receiveShadow = true;
    if (parent) parent.add(o);
    return o;
  }
  function canvasTex(w, h, fn) {
    var c = document.createElement('canvas'); c.width = w; c.height = h;
    fn(c.getContext('2d'), w, h);
    var t = new THREE.CanvasTexture(c);
    t.anisotropy = 8;
    return t;
  }
  var SANS = '"Helvetica Neue",Arial,sans-serif';

  function woodTex(w, h, count, vertical, seed, tone) {
    return canvasTex(w, h, function (g) {
      var R = rng(seed);
      for (var i = 0; i < count; i++) {
        var base = (tone - 130) * 0.55 + R() * 12;
        var a = vertical ? i * w / count : i * h / count;
        var len = vertical ? w / count : h / count;
        g.fillStyle = 'rgb(' + (base | 0) + ',' + (base | 0) + ',' + (base | 0) + ')';
        if (vertical) g.fillRect(a, 0, len, h); else g.fillRect(0, a, w, len);
        for (var k = 0; k < 46; k++) {
          g.strokeStyle = 'rgba(0,0,0,' + (0.08 + R() * 0.16) + ')';
          g.lineWidth = 1 + R() * 1.5;
          g.beginPath();
          if (vertical) { var x0 = a + R() * len; g.moveTo(x0, 0); g.lineTo(x0 + (R() - 0.5) * 6, h); }
          else { var y0 = a + R() * len; g.moveTo(0, y0); g.lineTo(w, y0 + (R() - 0.5) * 6); }
          g.stroke();
        }
        g.fillStyle = 'rgba(0,0,0,.6)';
        if (vertical) g.fillRect(a, 0, 2, h); else g.fillRect(0, a, w, 2);
      }
    });
  }

  /* ---------- lights ---------- */
  scene.add(new THREE.HemisphereLight(0xdfe3ea, 0x151515, 0.38));
  var sun = new THREE.DirectionalLight(0xaab4c8, 0.2);
  sun.position.set(2.5, 5, 3.5);
  sun.castShadow = false;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -4.5; sun.shadow.camera.right = 4.5;
  sun.shadow.camera.top = 4.5; sun.shadow.camera.bottom = -4.5;
  sun.shadow.camera.near = 0.5; sun.shadow.camera.far = 14;
  sun.shadow.bias = -0.0006;
  scene.add(sun);
  var fill = new THREE.DirectionalLight(0xffffff, 0.08);
  fill.position.set(-3, 3, 4);
  scene.add(fill);
  var lampLight = new THREE.PointLight(0xffb066, 1.1, 4.5, 1.5);
  lampLight.position.set(0.8, 1.2, -0.8);
  scene.add(lampLight);
  var lampSpot = new THREE.SpotLight(0xffb468, 2.2, 6, 1.0, 0.65, 1.3);
  lampSpot.position.set(0.82, 1.27, -0.95);
  lampSpot.target.position.set(0.0, 0.78, -0.55);
  lampSpot.castShadow = true;
  lampSpot.shadow.mapSize.set(1024, 1024);
  lampSpot.shadow.camera.near = 0.1; lampSpot.shadow.camera.far = 6;
  lampSpot.shadow.bias = -0.0008;
  scene.add(lampSpot); scene.add(lampSpot.target);
  var heldLight = new THREE.PointLight(0xfff0dc, 0.9, 3);
  heldLight.position.set(0, 0.25, 0.1);
  camera.add(heldLight);

  /* ---------- environment ---------- */
  var floorTex = woodTex(1024, 1024, 10, false, 7, 196);
  floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(3, 3);
  var floor = new THREE.Mesh(new THREE.CircleGeometry(8, 72), new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.85 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true;
  scene.add(floor);

  var rug = new THREE.Mesh(new THREE.CircleGeometry(1.45, 64), mat(0x0c0c0c, { roughness: 1 }));
  rug.rotation.x = -Math.PI / 2; rug.position.set(0, 0.004, 0.55); rug.receiveShadow = true;
  scene.add(rug);

  var slatTex = woodTex(1024, 512, 24, true, 21, 208);
  var wall = new THREE.Mesh(new THREE.PlaneGeometry(6, 3.1), new THREE.MeshStandardMaterial({ map: slatTex, roughness: 0.9 }));
  wall.position.set(0, 1.55, -1.55); wall.receiveShadow = true;
  scene.add(wall);
  box(6.2, 0.1, 0.12, mat(0x0d0d0d), 0, 0.05, -1.5, scene);

  /* room: side walls, front wall, ceiling, door, night window */
  var plaster = new THREE.MeshStandardMaterial({ color: 0x232323, roughness: 0.95 });
  var ceilM = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 1 });
  function wallPlane(w, h, x, y, z, ry, rx, m) {
    var o = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m || plaster);
    o.position.set(x, y, z); o.rotation.set(rx || 0, ry || 0, 0); o.receiveShadow = true; scene.add(o); return o;
  }
  wallPlane(4.85, 3.1, -3, 1.55, 0.875, Math.PI / 2);
  wallPlane(4.85, 3.1, 3, 1.55, 0.875, -Math.PI / 2);
  wallPlane(6, 3.1, 0, 1.55, 3.3, Math.PI);
  wallPlane(6, 4.85, 0, 3.1, 0.875, 0, Math.PI / 2, ceilM);
  var skirt = mat(0x0d0d0d);
  box(0.12, 0.1, 4.85, skirt, -2.94, 0.05, 0.875, scene);
  box(0.12, 0.1, 4.85, skirt, 2.94, 0.05, 0.875, scene);
  box(6, 0.1, 0.12, skirt, 0, 0.05, 3.24, scene);
  /* door on the wall behind you */
  box(1.0, 2.1, 0.04, mat(0x2e2e2e), -1.7, 1.05, 3.28, scene);
  box(0.84, 1.98, 0.03, mat(0x171717), -1.7, 1.02, 3.255, scene);
  var knob = new THREE.Mesh(new THREE.SphereGeometry(0.025, 16, 12), mat(0xa8a8a8, { metalness: 0.3, roughness: 0.4 }));
  knob.position.set(-1.38, 1.0, 3.22); knob.castShadow = true; scene.add(knob);
  /* night window on the left wall */
  var nightM = new THREE.MeshBasicMaterial({ color: 0x1d232b });
  var pane = new THREE.Mesh(new THREE.PlaneGeometry(0.96, 1.16), nightM);
  pane.position.set(-2.985, 1.65, 1.2); pane.rotation.y = Math.PI / 2; scene.add(pane);
  var frameM = mat(0x0d0d0d);
  box(0.05, 0.06, 1.08, frameM, -2.97, 2.26, 1.2, scene);
  box(0.05, 0.06, 1.08, frameM, -2.97, 1.04, 1.2, scene);
  box(0.05, 1.22, 0.06, frameM, -2.97, 1.65, 0.69, scene);
  box(0.05, 1.22, 0.06, frameM, -2.97, 1.65, 1.71, scene);
  box(0.05, 1.16, 0.03, frameM, -2.97, 1.65, 1.2, scene);
  box(0.05, 0.03, 0.96, frameM, -2.97, 1.65, 1.2, scene);

  /* desk */
  var deskTex = woodTex(1024, 512, 1, false, 33, 240);
  var deskTop = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.05, 0.95), new THREE.MeshStandardMaterial({ map: deskTex, roughness: 0.6 }));
  deskTop.position.set(0, 0.75, -0.62); deskTop.castShadow = true; deskTop.receiveShadow = true;
  scene.add(deskTop);
  var walnut = mat(0x141414, { roughness: 0.6 });
  [[-0.94, -0.2], [0.94, -0.2], [-0.94, -1.04], [0.94, -1.04]].forEach(function (p) { box(0.06, 0.73, 0.06, walnut, p[0], 0.365, p[1], scene); });
  box(1.84, 0.3, 0.025, walnut, 0, 0.58, -1.04, scene);

  /* shelf plank */
  var plank = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.04, 0.27), new THREE.MeshStandardMaterial({ map: woodTex(512, 128, 1, false, 5, 225), roughness: 0.65 }));
  plank.position.set(0, 1.7, -1.37); plank.castShadow = true; plank.receiveShadow = true;
  scene.add(plank);
  [-0.7, 0.7].forEach(function (x) {
    box(0.03, 0.2, 0.03, walnut, x, 1.57, -1.47, scene);
    var br = box(0.03, 0.03, 0.2, walnut, x, 1.6, -1.4, scene);
    br.rotation.x = 0.0;
  });

  /* desk lamp */
  (function () {
    var g = new THREE.Group(); g.position.set(0.9, 0.775, -0.95);
    var metal = mat(0x1c1c1c, { metalness: 0.3, roughness: 0.5 });
    cyl(0.07, 0.08, 0.016, metal, 0, 0.008, 0, g);
    var a1 = cyl(0.006, 0.006, 0.34, metal, 0.05, 0.18, 0, g); a1.rotation.z = -0.35;
    var a2 = cyl(0.006, 0.006, 0.3, metal, 0.04, 0.4, 0, g); a2.rotation.z = 0.9;
    var head = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.09, 0.11, 36, 1, true), new THREE.MeshStandardMaterial({ color: 0xe9e4da, side: THREE.DoubleSide, roughness: 0.6, emissive: 0x7a4a1c, emissiveIntensity: 0.6 }));
    head.position.set(-0.07, 0.5, 0); g.add(head);
    head.rotation.z = 0.35;
    var bulb = new THREE.Mesh(new THREE.SphereGeometry(0.02, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffe3b0 }));
    bulb.position.set(-0.07, 0.465, 0); g.add(bulb);
    var glowTex = canvasTex(128, 128, function (c) {
      var gr = c.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, 'rgba(255,200,130,1)'); gr.addColorStop(0.35, 'rgba(255,170,90,.35)'); gr.addColorStop(1, 'rgba(255,150,70,0)');
      c.fillStyle = gr; c.fillRect(0, 0, 128, 128);
    });
    var glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0.6 }));
    glow.scale.setScalar(0.5); glow.position.set(-0.07, 0.44, 0.0); g.add(glow);
    scene.add(g);
  })();
  /* mug */
  (function () {
    var g = new THREE.Group(); g.position.set(0.62, 0.775, -0.3);
    cyl(0.04, 0.036, 0.09, mat(0xf4efe6), 0, 0.045, 0, g, 28);
    var h = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.006, 8, 20, Math.PI), mat(0xf4efe6));
    h.position.set(0.04, 0.05, 0); h.rotation.z = -Math.PI / 2; h.castShadow = true; g.add(h);
    cyl(0.034, 0.034, 0.002, mat(0x111111), 0, 0.088, 0, g, 28);
    scene.add(g);
  })();
  function plant(x, y, z, s) {
    var g = new THREE.Group(); g.position.set(x, y, z); g.scale.setScalar(s || 1);
    cyl(0.07, 0.055, 0.12, mat(0xf1ece2), 0, 0.06, 0, g, 28);
    var leafM = mat(0x7a7a7a);
    var R = rng(11);
    for (var i = 0; i < 9; i++) {
      var l = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 10), leafM);
      l.scale.set(0.35, 1.5, 0.12);
      var a = i / 9 * Math.PI * 2;
      l.position.set(Math.cos(a) * 0.04, 0.2 + R() * 0.06, Math.sin(a) * 0.04);
      l.rotation.set(Math.sin(a) * 0.5, a, -Math.cos(a) * 0.5);
      l.castShadow = true; g.add(l);
    }
    scene.add(g);
  }
  plant(-0.86, 0.775, -0.85, 1);

  /* side tables */
  function table(x, z, r, glow) {
    var g = new THREE.Group(); g.position.set(x, 0, z);
    var topM = new THREE.MeshStandardMaterial({ map: woodTex(256, 256, 1, false, 44, 235), roughness: 0.6 });
    var top = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.04, 48), topM);
    top.position.y = 0.72; top.castShadow = true; top.receiveShadow = true; g.add(top);
    cyl(0.03, 0.03, 0.7, walnut, 0, 0.35, 0, g, 16);
    cyl(0.17, 0.2, 0.025, walnut, 0, 0.0125, 0, g, 32);
    var pl = new THREE.PointLight(0xffc58a, glow || 0.22, 2.4); pl.position.set(0, 1.5, 0); g.add(pl);
    scene.add(g);
  }
  table(-1.75, 0.45, 0.36, 0.3);
  table(1.75, 0.45, 0.3, 0.3);
  table(0, 2.1, 0.3, 0.7);
  plant(1.62, 0.74, 0.62, 0.8);

  /* ---------- pickable object builders (origin at bottom centre) ---------- */
  function mkLaptop() {
    var g = new THREE.Group();
    var alu = mat(0xc6c6c6, { metalness: 0.15, roughness: 0.4 });
    box(0.34, 0.012, 0.23, alu, 0, 0.006, 0, g);
    var keys = canvasTex(512, 200, function (c, w, h) {
      c.fillStyle = '#c9c9c9'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#a8a8a8';
      for (var r = 0; r < 5; r++) for (var k = 0; k < 14; k++) c.fillRect(8 + k * 35.5, 8 + r * 30, 31, 25);
    });
    var kb = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.1), new THREE.MeshBasicMaterial({ map: keys, color: 0x666666 }));
    kb.rotation.x = -Math.PI / 2; kb.position.set(0, 0.0125, -0.02); g.add(kb);
    var lid = new THREE.Group(); lid.position.set(0, 0.012, -0.115); lid.rotation.x = -0.3; g.add(lid);
    box(0.34, 0.23, 0.008, alu, 0, 0.115, 0, lid);
    var screen = canvasTex(640, 420, function (c, w, h) {
      c.fillStyle = '#101010'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#3a3a3a';
      [0, 1, 2].forEach(function (i) { c.beginPath(); c.arc(28 + i * 22, 26, 6, 0, 7); c.fill(); });
      c.fillStyle = '#f4f4f4'; c.font = '700 84px ' + SANS; c.textBaseline = 'alphabetic';
      c.fillText('havonyx', 56, 200);
      c.fillStyle = '#ffb866'; c.beginPath(); c.arc(w - 112, 175, 14, 0, 7); c.fill();
      c.fillStyle = '#9a9a9a'; c.font = '400 28px ' + SANS;
      c.fillText('Custom AI agents for business', 58, 250);
      c.fillStyle = '#262626';
      c.fillRect(58, 300, 360, 14); c.fillRect(58, 330, 270, 14); c.fillRect(58, 360, 310, 14);
    });
    var sc = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.21), new THREE.MeshBasicMaterial({ map: screen, color: 0xdddddd }));
    sc.position.set(0, 0.115, 0.0045); lid.add(sc);
    return g;
  }
  function mkNotebook() {
    var g = new THREE.Group();
    var kraft = mat(0xd2d2d2), paper = mat(0xf4efe4);
    var cover = canvasTex(340, 460, function (c, w, h) {
      c.fillStyle = '#d2d2d2'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#111111'; c.font = '700 54px ' + SANS; c.fillText('Jimvd', 34, 110); c.fillText('Agency', 34, 170);
      c.font = '400 24px ' + SANS; c.fillStyle = '#444444';
      c.fillText('Design, build,', 34, 220); c.fillText('host, maintain', 34, 252);
      c.strokeStyle = '#777777'; c.lineWidth = 2; c.strokeRect(24, 24, w - 48, h - 48);
    });
    var topM = new THREE.MeshStandardMaterial({ map: cover, roughness: 0.85 });
    var m = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.022, 0.23), [kraft, kraft, topM, kraft, kraft, kraft]);
    m.position.y = 0.011; m.castShadow = true; m.receiveShadow = true; g.add(m);
    box(0.166, 0.016, 0.004, paper, 0, 0.011, 0.1155, g);
    box(0.012, 0.024, 0.232, mat(0x1a1a1a), 0.058, 0.011, 0, g);
    return g;
  }
  function mkHouse() {
    var g = new THREE.Group();
    var wallM = mat(0xf4efe6);
    box(0.16, 0.1, 0.13, wallM, 0, 0.05, 0, g);
    var s = new THREE.Shape(); s.moveTo(-0.1, 0); s.lineTo(0.1, 0); s.lineTo(0, 0.07); s.closePath();
    var roofG = new THREE.ExtrudeGeometry(s, { depth: 0.15, bevelEnabled: false });
    roofG.translate(0, 0, -0.075);
    var roof = new THREE.Mesh(roofG, mat(0x222222)); roof.position.y = 0.1; roof.castShadow = true; g.add(roof);
    box(0.035, 0.06, 0.004, mat(0x1a1a1a), 0, 0.03, 0.067, g);
    var win = new THREE.MeshBasicMaterial({ color: 0xffe3a8 });
    [-0.05, 0.05].forEach(function (x) { var w = new THREE.Mesh(new THREE.PlaneGeometry(0.03, 0.034), win); w.position.set(x, 0.062, 0.0665); g.add(w); });
    box(0.1, 0.012, 0.004, mat(0x151515), 0, 0.09, 0.068, g);
    return g;
  }
  function mkPuck() {
    var g = new THREE.Group();
    cyl(0.06, 0.065, 0.13, mat(0x2a2a2a, { roughness: 0.95 }), 0, 0.065, 0, g, 40);
    var top = cyl(0.052, 0.052, 0.004, new THREE.MeshStandardMaterial({ color: 0xf2f2f2, emissive: 0xffffff, emissiveIntensity: 0.8 }), 0, 0.132, 0, g, 40);
    top.castShadow = false;
    [0.17, 0.2, 0.23].forEach(function (y, i) {
      var t = new THREE.Mesh(new THREE.TorusGeometry(0.07 + i * 0.012, 0.0018, 8, 56), new THREE.MeshBasicMaterial({ color: 0xe8e8e8, transparent: true, opacity: 0.55 - i * 0.16 }));
      t.rotation.x = Math.PI / 2; t.position.y = y; g.add(t);
    });
    return g;
  }
  function mkPoker() {
    var g = new THREE.Group();
    function stack(x, z, col, n) {
      for (var i = 0; i < n; i++) cyl(0.021, 0.021, 0.0075, mat(i % 2 ? 0xf4efe6 : col, { roughness: 0.5 }), x, 0.00375 + i * 0.0078, z, g, 32);
    }
    stack(-0.05, 0.0, 0x8c8c8c, 7); stack(-0.0, -0.035, 0x1a1a1a, 5); stack(-0.045, 0.045, 0x151515, 4);
    function card(txt, col, x, z, ry, y) {
      var t = canvasTex(252, 356, function (c, w, h) {
        c.fillStyle = '#fffdf8'; c.fillRect(0, 0, w, h);
        c.fillStyle = col; c.font = '700 96px ' + SANS; c.fillText(txt, 22, 110);
        c.font = '700 150px ' + SANS; c.fillText(txt.slice(-1), 60, 260);
        c.strokeStyle = '#d9d0bf'; c.lineWidth = 4; c.strokeRect(2, 2, w - 4, h - 4);
      });
      var w = mat(0xfffdf8);
      var m = new THREE.Mesh(new THREE.BoxGeometry(0.063, 0.002, 0.089), [w, w, new THREE.MeshStandardMaterial({ map: t, roughness: 0.6 }), w, w, w]);
      m.position.set(x, y, z); m.rotation.y = ry; m.castShadow = true; m.receiveShadow = true; g.add(m);
    }
    card('A♠', '#111111', 0.06, 0.02, 0.35, 0.001);
    card('K♥', '#111111', 0.085, 0.0, -0.15, 0.0035);
    return g;
  }
  function mkGlobe() {
    var g = new THREE.Group();
    cyl(0.07, 0.08, 0.018, walnut, 0, 0.009, 0, g, 32);
    cyl(0.011, 0.011, 0.1, mat(0xa8a8a8, { metalness: 0.6, roughness: 0.4 }), 0, 0.065, 0, g, 12);
    var tilt = new THREE.Group(); tilt.position.y = 0.26; tilt.rotation.z = 0.4; g.add(tilt);
    var tex = canvasTex(1024, 512, function (c, w, h) {
      c.fillStyle = '#e8e8e8'; c.fillRect(0, 0, w, h);
      c.strokeStyle = 'rgba(0,0,0,.3)'; c.lineWidth = 2;
      for (var i = 0; i <= 12; i++) { c.beginPath(); c.moveTo(i * w / 12, 0); c.lineTo(i * w / 12, h); c.stroke(); }
      for (var j = 1; j < 6; j++) { c.beginPath(); c.moveTo(0, j * h / 6); c.lineTo(w, j * h / 6); c.stroke(); }
    });
    var ball = new THREE.Mesh(new THREE.SphereGeometry(0.13, 48, 32), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55 }));
    ball.castShadow = true; tilt.add(ball);
    function pin(lat, lon, col) {
      var phi = (lon + 180) / 360 * Math.PI * 2, th = (90 - lat) * Math.PI / 180, r = 0.133;
      var p = new THREE.Mesh(new THREE.SphereGeometry(0.011, 12, 10), new THREE.MeshStandardMaterial({ color: col, roughness: 0.4 }));
      p.position.set(-Math.cos(phi) * Math.sin(th) * r, Math.cos(th) * r, Math.sin(phi) * Math.sin(th) * r);
      tilt.add(p);
    }
    pin(52.13, 4.66, 0x1a1a1a); pin(48.2, 16.37, 0x666666);
    var ring = new THREE.Mesh(new THREE.TorusGeometry(0.145, 0.004, 8, 64), mat(0xa8a8a8, { metalness: 0.6, roughness: 0.35 }));
    ring.castShadow = true; tilt.add(ring);
    return g;
  }
  function mkEnvelope() {
    var g = new THREE.Group();
    var paper = mat(0xf2f2f2);
    var face = canvasTex(600, 400, function (c, w, h) {
      c.fillStyle = '#f2f2f2'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#111111'; c.font = '500 38px ' + SANS; c.fillText('Jim van Duijsen', 90, 300);
      c.fillStyle = '#555555'; c.font = '400 30px ' + SANS; c.fillText('hello@jimvanduijsen.nl', 90, 345);
    });
    var topM = new THREE.MeshStandardMaterial({ map: face, roughness: 0.9 });
    var body = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.012, 0.2), [paper, paper, topM, paper, paper, paper]);
    body.position.y = 0.006; body.castShadow = true; body.receiveShadow = true; g.add(body);
    var s = new THREE.Shape(); s.moveTo(-0.15, 0.1); s.lineTo(0.15, 0.1); s.lineTo(0, 0.0); s.closePath();
    var fg = new THREE.ExtrudeGeometry(s, { depth: 0.003, bevelEnabled: false });
    var flap = new THREE.Mesh(fg, mat(0xe0e0e0)); flap.rotation.x = -Math.PI / 2; flap.position.y = 0.012; flap.castShadow = true; g.add(flap);
    cyl(0.022, 0.022, 0.006, mat(0x1a1a1a, { roughness: 0.4 }), 0, 0.017, -0.004, g, 24);
    return g;
  }
  function mkBook(spec) {
    var t = spec.t, h = spec.h, d = spec.d;
    var g = new THREE.Group();
    var spine = canvasTex(96, 384, function (c, w, hh) {
      c.fillStyle = spec.color; c.fillRect(0, 0, w, hh);
      c.fillStyle = spec.ink || '#fbf8f2'; c.fillRect(0, 22, w, 3); c.fillRect(0, hh - 25, w, 3);
      if (spec.title) {
        c.save(); c.translate(w / 2, hh / 2); c.rotate(-Math.PI / 2);
        c.font = '700 ' + (spec.fs || 40) + 'px ' + SANS; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillText(spec.title, 0, 0); c.restore();
      }
    });
    var cover = canvasTex(256, 384, function (c, w, hh) {
      c.fillStyle = spec.color; c.fillRect(0, 0, w, hh);
      if (spec.title) {
        c.fillStyle = spec.ink || '#fbf8f2';
        c.font = '700 40px ' + SANS; c.textBaseline = 'alphabetic';
        var words = spec.title.split(' '); words.forEach(function (wd, i) { c.fillText(wd, 28, 80 + i * 48); });
        c.font = '400 20px ' + SANS; if (spec.sub) c.fillText(spec.sub, 28, hh - 36);
        c.fillRect(28, hh - 70, 60, 3);
      }
    });
    var pages = mat(0xe8e8e8);
    var cm = new THREE.MeshStandardMaterial({ map: cover, roughness: 0.8 });
    var sm = new THREE.MeshStandardMaterial({ map: spine, roughness: 0.8 });
    var m = new THREE.Mesh(new THREE.BoxGeometry(t, h, d), [cm, cm, pages, pages, sm, pages]);
    m.position.y = h / 2; m.castShadow = true; m.receiveShadow = true; g.add(m);
    return g;
  }

  /* ---------- items ---------- */
  var items = [];
  var hintTex = canvasTex(64, 64, function (c) {
    c.fillStyle = 'rgba(255,184,102,.18)'; c.beginPath(); c.arc(32, 32, 26, 0, 7); c.fill();
    c.strokeStyle = 'rgba(255,184,102,.9)'; c.lineWidth = 4; c.beginPath(); c.arc(32, 32, 24, 0, 7); c.stroke();
    c.fillStyle = 'rgba(255,184,102,.95)'; c.beginPath(); c.arc(32, 32, 7, 0, 7); c.fill();
  });

  function addItem(def) {
    var extra = (CONTENT.items || {})[def.id];
    if (extra) def = Object.assign({}, def, extra);
    var inner = def.build();
    inner.updateMatrixWorld(true);
    var bb = new THREE.Box3().setFromObject(inner);
    var c = bb.getCenter(new THREE.Vector3());
    var size = bb.getSize(new THREE.Vector3());
    inner.position.sub(c);
    var w = new THREE.Group();
    w.add(inner);
    w.position.set(def.pos[0], def.pos[1] - (bb.min.y - c.y), def.pos[2]);
    w.rotation.set(def.rot ? def.rot[0] : 0, def.rot ? def.rot[1] : 0, def.rot ? def.rot[2] : 0);
    scene.add(w);
    w.updateMatrixWorld(true);
    var maxD = Math.max(size.x, size.y, size.z);
    var it = Object.assign({ obj: w, maxD: maxD }, def);
    it.homeP = w.position.clone(); it.homeQ = w.quaternion.clone(); it.homeS = w.scale.clone();
    it.heldS = new THREE.Vector3().setScalar((def.size || 0.4) / maxD);
    it.heldQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(def.hold ? def.hold[0] : 0.45, def.hold ? def.hold[1] : -0.55, def.hold ? def.hold[2] : 0));
    var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: hintTex, depthTest: false, transparent: true }));
    var top = new THREE.Box3().setFromObject(w);
    var tc = top.getCenter(new THREE.Vector3());
    sp.position.set(tc.x, top.max.y + 0.07, tc.z); sp.renderOrder = 10; sp.scale.setScalar(0.06);
    scene.add(sp);
    it.sprite = sp;
    w.userData.item = it;
    items.push(it);
    return it;
  }

  var DESK_Y = 0.775, TBL_Y = 0.74, SHELF_Y = 1.72;
  addItem({ id: 'havonyx', build: mkLaptop, pos: [-0.3, DESK_Y, -0.55], rot: [0, 0.18, 0], size: 0.46, hold: [0.3, -0.45, 0],
    tag: 'Project', title: 'Havonyx',
    text: 'I co-founded Havonyx, a Dutch AI implementation agency. We build custom AI automations and agent installations for businesses in the EU and the US.',
    link: { label: 'Visit havonyx.com', href: 'https://havonyx.com' } });
  addItem({ id: 'agency', build: mkNotebook, pos: [0.17, DESK_Y, -0.36], rot: [0, 0.35, 0], size: 0.34, hold: [0.9, -0.3, 0],
    tag: 'Project', title: 'GMB Audit',
    text: 'A lead-magnet web app that audits a business\'s Google Business Profile.' });
  addItem({ id: 'websites', build: mkHouse, pos: [0.5, DESK_Y, -0.72], rot: [0, -0.3, 0], size: 0.34, hold: [0.3, -0.6, 0],
    tag: 'Project', title: 'Local business websites',
    text: 'Redesign demos and new websites for local cafes and bakeries, built and deployed quickly as part of my side offer.' });

  addItem({ id: 'voice', build: mkPuck, pos: [-1.9, TBL_Y, 0.4], size: 0.34, hold: [0.35, -0.4, 0],
    tag: 'Experiment', title: 'Voice AI agent',
    text: 'A voice agent architecture built on LiveKit and Mistral.' });
  addItem({ id: 'poker', build: mkPoker, pos: [-1.62, TBL_Y, 0.5], rot: [0, 0.4, 0], size: 0.3, hold: [0.9, -0.4, 0],
    tag: 'Experiment', title: 'Poker model',
    text: 'Fine-tuning a small language model to play poker on Apple\'s MLX, with its own dataset and an evaluation suite.' });

  addItem({ id: 'about', build: mkGlobe, pos: [1.75, TBL_Y, 0.45], size: 0.36, hold: [0.2, -0.6, 0],
    tag: 'About me', title: 'Alphen aan den Rijn',
    text: 'Born in The Hague, raised in Alphen aan den Rijn. I speak Dutch and English fluently and some German. My dad\'s side of the family is Austrian.' });

  addItem({ id: 'contact', build: mkEnvelope, pos: [0, TBL_Y, 2.1], rot: [0, 0.2, 0], size: 0.4, hold: [0.8, -0.2, 0],
    tag: 'Contact', title: 'Say hello',
    text: 'Email is the best way to reach me. I am open to frontend developer roles and to talking about AI projects.',
    email: 'jim@havonyx.com' });

  /* shelf books */
  var bookDefs = [
    { t: 0.045, h: 0.23, d: 0.17, color: '#2e2e2e', title: 'Crypto Insiders', fs: 30, sub: 'Frontend', pick: { id: 'crypto', tag: 'Experience', title: 'Crypto Insiders', text: '' } },
    { t: 0.05, h: 0.26, d: 0.18, color: '#b9b9b9', ink: '#111111', title: 'Freelance', fs: 40, sub: 'Next.js · React', pick: { id: 'freelance', tag: 'Experience', title: 'Freelance', text: '' } },
    { t: 0.04, h: 0.21, d: 0.15, color: '#444444', title: 'THUAS', fs: 40, sub: 'Intl. Business', pick: { id: 'thuas', tag: 'Education', title: 'THUAS', text: '' } },
    { t: 0.055, h: 0.25, d: 0.19, color: '#f1f1f1', ink: '#111111', title: 'Work with me', fs: 34, sub: 'Freelance', pick: { id: 'hire', tag: 'Available', title: 'Work with me', text: '' } },
    { t: 0.05, h: 0.24, d: 0.17, color: '#7a7a7a', ink: '#111111', title: 'Software', fs: 38, sub: 'I recommend', pick: { id: 'software', tag: 'Software', title: 'Software I recommend', text: '' } }
  ];
  var decor = [
    { t: 0.035, h: 0.2, d: 0.15, color: '#5c5c5c' }, { t: 0.04, h: 0.24, d: 0.17, color: '#d0d0d0', ink: '#111111' },
    { t: 0.03, h: 0.19, d: 0.14, color: '#3c3c3c' }, { t: 0.045, h: 0.22, d: 0.16, color: '#262626' }, { t: 0.03, h: 0.18, d: 0.13, color: '#9a9a9a', ink: '#111111' }
  ];
  var order = [decor[0], bookDefs[0], decor[1], bookDefs[1], decor[2], bookDefs[2], decor[3], bookDefs[3], decor[4], bookDefs[4]];
  var gap = 0.012, total = order.reduce(function (a, b) { return a + b.t + gap; }, 0);
  var cx = -total / 2 - 0.1;
  order.forEach(function (b) {
    cx += b.t / 2;
    var pos = [cx, SHELF_Y, -1.37];
    cx += b.t / 2 + gap;
    if (b.pick) {
      addItem({ id: b.pick.id, build: function () { return mkBook(b); }, pos: pos, size: 0.42, hold: [0.25, -0.75, 0],
        tag: b.pick.tag, title: b.pick.title, text: b.pick.text });
    } else {
      var bk = mkBook(b); bk.position.set(pos[0], pos[1], pos[2]); scene.add(bk);
    }
  });
  /* small globe-free decor on shelf: a ceramic bowl */
  (function () {
    var bowl = new THREE.Mesh(new THREE.SphereGeometry(0.06, 24, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), mat(0xf4efe6, { side: THREE.DoubleSide }));
    bowl.position.set(0.72, 1.745, -1.37); bowl.castShadow = true; scene.add(bowl);
  })();
  plant(0.8, 1.72, -1.37, 0.55);

  /* ---------- interaction state ---------- */
  var raycaster = new THREE.Raycaster();
  var ndc = new THREE.Vector2();
  var yaw = 0, pitch = -0.2, vYaw = 0, vPitch = 0, goal = null;
  var zoom = 0, baseFov = 60, held = null, tweens = [];
  var px = 0, py = 0, tx = 0, ty = 0;
  var hint = document.getElementById('hint'), chips = document.getElementById('chips');
  var panel = document.getElementById('panel'), tip = document.getElementById('tip');

  function ease(k) { return 1 - Math.pow(1 - k, 3); }
  function tween(dur, fn, done) { tweens.push({ t0: performance.now(), dur: dur, fn: fn, done: done }); }

  function pickAt(x, y, objs) {
    ndc.set(x / window.innerWidth * 2 - 1, -(y / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    var hits = raycaster.intersectObjects(objs, true);
    for (var i = 0; i < hits.length; i++) {
      var o = hits[i].object;
      while (o && !o.userData.item) o = o.parent;
      if (o) return o.userData.item;
    }
    return null;
  }

  /* the glowing marker above an object counts as part of it: pick by screen distance */
  function pickItem(x, y) {
    var it = pickAt(x, y, items.map(function (i) { return i.obj; }));
    if (it) return it;
    var best = null, bestD = 34 * 34, v = new THREE.Vector3();
    items.forEach(function (i) {
      v.copy(i.sprite.position).project(camera);
      if (v.z > 1) return;
      var dx = (v.x + 1) / 2 * window.innerWidth - x, dy = (1 - v.y) / 2 * window.innerHeight - y;
      var d = dx * dx + dy * dy;
      if (d < bestD) { bestD = d; best = i; }
    });
    return best;
  }

  function showPanel(it) {
    document.getElementById('pTag').textContent = it.tag;
    document.getElementById('pTitle').textContent = it.title;
    document.getElementById('pText').textContent = it.text;
    var ex = document.getElementById('pExtra'); ex.innerHTML = '';
    (it.links || (it.link ? [it.link] : [])).forEach(function (l) {
      var a = document.createElement('a'); a.className = 'btn'; a.href = l.href; a.textContent = l.label;
      if (l.external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      ex.appendChild(a);
    });
    if (it.email) {
      var s = document.createElement('span'); s.className = 'mail'; s.textContent = it.email; ex.appendChild(s);
      var b = document.createElement('button'); b.className = 'btn'; b.textContent = 'Copy';
      b.addEventListener('click', function () {
        function ok() { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1500); }
        function sel() { var r = document.createRange(); r.selectNodeContents(s); var se = window.getSelection(); se.removeAllRanges(); se.addRange(r); b.textContent = 'Selected'; }
        try { navigator.clipboard.writeText(it.email).then(ok, sel); } catch (e) { sel(); }
      });
      ex.appendChild(b);
    }
    panel.hidden = false;
  }

  function pick(it) {
    if (held) return;
    held = it; tip.hidden = true; stage.classList.remove('over');
    var o = it.obj;
    scene.updateMatrixWorld(true);
    camera.updateMatrixWorld(true);
    camera.attach(o);
    var portrait = window.innerWidth / window.innerHeight < 0.9;
    var to = new THREE.Vector3(portrait ? 0 : -0.12, portrait ? 0.12 : 0.02, -0.85);
    var fp = o.position.clone(), fq = o.quaternion.clone(), fs = o.scale.clone();
    tween(560, function (k) {
      var e = ease(k);
      o.position.lerpVectors(fp, to, e);
      o.quaternion.copy(fq).slerp(it.heldQ, e);
      o.scale.lerpVectors(fs, it.heldS, e);
    });
    showPanel(it);
    chips.classList.add('off'); hint.classList.add('off');
  }
  function release() {
    if (!held) return;
    var it = held; held = null;
    var o = it.obj;
    panel.hidden = true; chips.classList.remove('off');
    scene.attach(o);
    var fp = o.position.clone(), fq = o.quaternion.clone(), fs = o.scale.clone();
    tween(520, function (k) {
      var e = ease(k);
      o.position.lerpVectors(fp, it.homeP, e);
      o.quaternion.copy(fq).slerp(it.homeQ, e);
      o.scale.lerpVectors(fs, it.homeS, e);
    });
  }
  document.getElementById('back').addEventListener('click', release);

  var views = {
    desk: { yaw: 0, pitch: -0.3 }, shelf: { yaw: 0, pitch: 0.3 },
    west: { yaw: Math.PI / 2, pitch: -0.3 }, east: { yaw: -Math.PI / 2, pitch: -0.3 }, south: { yaw: Math.PI, pitch: -0.32 }
  };
  Array.prototype.forEach.call(document.querySelectorAll('.chip'), function (b) {
    b.addEventListener('click', function () {
      var v = views[b.getAttribute('data-view')];
      var d = ((v.yaw - yaw + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
      goal = { yaw: yaw + d, pitch: v.pitch }; vYaw = vPitch = 0;
      tip.hidden = true; stage.classList.remove('over');
      hint.classList.add('gone');
    });
  });

  /* pointer handling */
  var down = null;
  stage.addEventListener('pointerdown', function (e) {
    stage.setPointerCapture(e.pointerId);
    down = { x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY, moved: false };
    goal = null; vYaw = vPitch = 0;
    hint.classList.add('gone');
  });
  stage.addEventListener('pointermove', function (e) {
    px = e.clientX / window.innerWidth * 2 - 1; py = e.clientY / window.innerHeight * 2 - 1;
    if (down) {
      var dx = e.clientX - down.lx, dy = e.clientY - down.ly;
      down.lx = e.clientX; down.ly = e.clientY;
      if (Math.abs(e.clientX - down.x) + Math.abs(e.clientY - down.y) > 6) { down.moved = true; stage.classList.add('dragging'); }
      if (down.moved) {
        if (held) {
          var qy = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), dx * 0.011);
          var qx = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), dy * 0.011);
          held.obj.quaternion.premultiply(qy).premultiply(qx);
        } else {
          var k = 0.0042 * (camera.fov / 60);
          yaw += dx * k; pitch += dy * k;
          vYaw = dx * k; vPitch = dy * k;
          pitch = Math.max(-0.85, Math.min(0.9, pitch));
        }
      }
    } else if (!held && e.pointerType === 'mouse') {
      var it = pickItem(e.clientX, e.clientY);
      if (it) { stage.classList.add('over'); tip.hidden = false; tip.textContent = it.title; tip.style.left = e.clientX + 'px'; tip.style.top = e.clientY + 'px'; }
      else { stage.classList.remove('over'); tip.hidden = true; }
    }
  });
  function end(e) {
    if (!down) return;
    var d = down; down = null; stage.classList.remove('dragging');
    if (d.moved) return;
    if (held) {
      if (!pickAt(e.clientX, e.clientY, [held.obj])) release();
    } else {
      var it = pickItem(e.clientX, e.clientY);
      if (it) pick(it);
    }
  }
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', function () { down = null; stage.classList.remove('dragging'); });
  stage.addEventListener('pointerleave', function () { tip.hidden = true; });
  stage.addEventListener('wheel', function (e) {
    e.preventDefault();
    zoom = Math.max(-14, Math.min(14, zoom + e.deltaY * 0.02));
    resize();
  }, { passive: false });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') release();
    if (held) return;
    var s = 0.05;
    if (e.key === 'ArrowLeft' || e.key === 'a') { goal = null; yaw += s; }
    if (e.key === 'ArrowRight' || e.key === 'd') { goal = null; yaw -= s; }
    if (e.key === 'ArrowUp' || e.key === 'w') { goal = null; pitch = Math.min(0.9, pitch + s); }
    if (e.key === 'ArrowDown' || e.key === 's') { goal = null; pitch = Math.max(-0.85, pitch - s); }
  });

  function resize() {
    var w = window.innerWidth, h = window.innerHeight, a = w / h;
    renderer.setSize(w, h, false);
    camera.aspect = a;
    baseFov = a < 0.8 ? 80 : (a < 1.2 ? 68 : 60);
    camera.fov = baseFov + zoom;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  /* ---------- loop ---------- */
  var last = performance.now();
  function frame(now) {
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    for (var i = tweens.length - 1; i >= 0; i--) {
      var tw = tweens[i], k = Math.min(1, (now - tw.t0) / tw.dur);
      tw.fn(k);
      if (k >= 1) { tweens.splice(i, 1); if (tw.done) tw.done(); }
    }
    if (goal) {
      yaw += (goal.yaw - yaw) * Math.min(1, dt * 5);
      pitch += (goal.pitch - pitch) * Math.min(1, dt * 5);
      if (Math.abs(goal.yaw - yaw) < 0.002 && Math.abs(goal.pitch - pitch) < 0.002) goal = null;
    } else if (!down) {
      yaw += vYaw; pitch = Math.max(-0.85, Math.min(0.9, pitch + vPitch));
      vYaw *= 0.92; vPitch *= 0.92;
      if (Math.abs(vYaw) < 0.00005) vYaw = 0;
      if (Math.abs(vPitch) < 0.00005) vPitch = 0;
    }
    tx += (px * 0.07 - tx) * Math.min(1, dt * 3);
    ty += (-py * 0.03 - ty) * Math.min(1, dt * 3);
    camera.position.set(EYE.x + tx, EYE.y + ty, EYE.z);
    camera.rotation.set(pitch, yaw, 0);
    var t = now / 1000;
    items.forEach(function (it, n) {
      var s = it.sprite;
      s.visible = !held;
      s.scale.setScalar(0.055 + 0.012 * Math.sin(t * 2.2 + n));
      s.material.opacity = 0.75 + 0.25 * Math.sin(t * 2.2 + n);
    });
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
