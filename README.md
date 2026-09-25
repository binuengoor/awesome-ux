# Awesome UX ✨

> A curated collection of production-ready, hyper-polished UI/UX interactions, physics-grounded shaders, and micro-experiences. Engineered with zero compromises on performance, accessibility, and visual aesthetics.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![WebGL](https://img.shields.io/badge/Graphics-WebGL-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-brightgreen.svg)](#)

---

## 🎨 Featured Designs

### 1. [Google Gemini iOS Ambient Aurora](./designs/gemini-ambient-aurora/)

| Preview | Details |
| :--- | :--- |
| ![Gemini Ambient Aurora](./designs/gemini-ambient-aurora/preview.jpg) | **Category:** Ambient Atmosphere / WebGL Shaders<br>**Inspiration:** Google Gemini iOS Native App<br>**Stack:** Vanilla Web Component, WebGL 1.0, GLSL<br>**Integrations:** React, Vue 3, HTML5<br>**Highlights:** True OLED black rest intervals (~35% off), harmonized dual-tone mood cross-fading, zero white flashes (anti-FOUC).<br><br>[🚀 Open Technical Guide & Code](./designs/gemini-ambient-aurora/) • [✨ Live Interactive Demo](./designs/gemini-ambient-aurora/demo/index.html) |

```html
<!-- Drop into any web page -->
<link rel="stylesheet" href="./src/aurora.css">
<aurora-background speed="1.0" intensity="0.95"></aurora-background>
<script src="./src/aurora.js"></script>
```

---

## 📐 Philosophy & Core Standards

Every UX interaction curated in this repository must satisfy strict engineering and design principles:

1. **Production-Ready & Modular**: Zero bloat. Available as framework-agnostic native Web Components with lightweight wrappers for React and Vue.
2. **True OLED Dark Fidelity**: Pure `#000000` blacks, eliminating glow pollution and saving battery on mobile OLED/AMOLED displays.
3. **Zero FOUC (Flash of Unstyled Content)**: Engineered with byte-0 color scheme tags and styles to guarantee zero white flashes during navigation and page reloads.
4. **Ruthless Performance Efficiency**:
   - 1 draw call per frame.
   - Intelligent device pixel ratio (DPR) clamping (max 1.25x for atmospheric effects).
   - Instant suspension when the browser tab is hidden or backgrounded (0% CPU / GPU consumption).
   - Clean WebGL context loss and restoration handling.
5. **Accessibility-First**: Automatic support for `prefers-reduced-motion: reduce` with soft, static CSS mesh fallbacks.

---

## 📂 Repository Architecture

Each design is completely self-contained within the `designs/` folder:

```
awesome-ux/
├── README.md                           # Main showcase index & contribution guide
├── LICENSE                             # MIT License
├── index.html                          # Showcase portal for GitHub Pages
└── designs/
    └── <design-name>/
        ├── README.md                   # Visual specs, GLSL math & API documentation
        ├── preview.jpg                 # High-resolution screenshot or preview GIF
        ├── src/                        # Production core files (CSS, JS/TS)
        ├── demo/
        │   └── index.html              # Standalone interactive playground
        └── integrations/               # React, Vue, Svelte, and HTML snippets
            ├── ReactComponent.jsx
            ├── VueComponent.vue
            └── vanilla.html
```

---

## 🧭 Roadmap & Upcoming UX Concepts

- [x] **01. Gemini Ambient Aurora**: Living, breathing ambient light with OLED rest states.
- [ ] **02. Dynamic Island HUD**: Physics-based Spring-driven contextual notification pill.
- [ ] **03. Liquid Metal Glassmorphism**: Interactive refraction shader with cursor-following specular caustics.
- [ ] **04. Kinetic Micro-Haptic Feedbacks**: Web Audio synthesized tactile click responses.
- [ ] **05. Spatial Card Tilt**: 60 FPS gyroscope and pointer 3D parallax cards.

---

## 🤝 Contributing

Contributions of new, exceptional UI/UX designs are warmly welcomed! Please ensure:
1. The design resides in its own isolated folder under `designs/<design-name>/`.
2. Includes a standalone `demo/index.html` and high-res `preview.jpg`.
3. Adheres to our performance, reduced-motion, and OLED dark guidelines.
4. Has zero external runtime npm dependencies whenever feasible.

---

## 📜 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for details.
