# Google Gemini iOS Ambient Aurora

> A fluid, living ambient light effect reverse-engineered and modeled directly from the **Google Gemini iOS application**. Designed for deep OLED dark interfaces, featuring true organic breathing physics, soft single/dual-tone mood cross-fading, and periodic rest in pitch black.

![Gemini Ambient Aurora Preview](./preview.jpg)

---

## 🌟 The Design Philosophy

Most web aurora implementations fail because they attempt to render an aggressive, constant rainbow spectacle across the entire viewport. 

The real Google Gemini iOS app does the opposite:
1. **It comes and goes, and sometimes is just black**: The light is not a constant fixture; it has natural breathing envelopes where it completely recedes into `#000000` (pitch OLED black) for 30–35% of the cycle.
2. **Never all colors at once**: The light lives in distinct, harmonized color moods (Emerald & Teal, Sapphire & Royal Blue, Electric Violet & Indigo, or Warm Rose & Amber Gold) that gently cross-fade over 25–35 second intervals.
3. **Pure velvet Gaussian diffusion**: No sharp crests, linear color stops, or ribbon artifacts. Coordinates are warped via chromatic Simplex noise and evaluated with exponential Gaussian falloff ($\exp(-d^2 / 2\sigma^2)$).
4. **Anchored luminescence**: Anchored softly to the top 25%–35% of the viewport behind the navigation header, feathering out into absolute transparency before reaching primary content.

---

## 📐 Mathematical Formulation

### 1. The "Come and Go" Breathing Envelope
To allow true OLED pixels to turn completely off, the shader passes time through a biased sinusoidal curve clamped to zero:

$$\text{envelope}(t) = \text{smoothstep}\left(0.0, 1.0, \max\left(0, \frac{\sin(\omega t) - \delta}{1.0 - \delta}\right)\right)$$

With negative threshold $\delta = 0.15\text{--}0.20$, the value remains strictly $0.0$ for ~35% of the period.

### 2. Chromatic Coordinate Warping
Instead of rigid geometric blobs, sample coordinates are warped through high-performance 2D Simplex noise:

$$\mathbf{p}' = \mathbf{p} + \begin{pmatrix} \text{snoise}(1.1x + 0.18t, 1.3y - 0.14t) \\ \text{snoise}(1.3x - 0.15t, 1.2y + 0.16t) \end{pmatrix} \times 0.14$$

### 3. Harmonic Mood Transitions
Palettes transition seamlessly through four key moods:
- **Mood 0 — Emerald & Teal**: `vec3(0.015, 0.480, 0.320)` & `vec3(0.010, 0.360, 0.420)`
- **Mood 1 — Sapphire & Royal Azure**: `vec3(0.060, 0.280, 0.820)` & `vec3(0.020, 0.180, 0.600)`
- **Mood 2 — Radiant Purple & Violet**: `vec3(0.460, 0.140, 0.740)` & `vec3(0.240, 0.100, 0.620)`
- **Mood 3 — Warm Rose & Amber**: `vec3(0.780, 0.160, 0.420)` & `vec3(0.720, 0.400, 0.080)`

---

## ⚡ Performance Characteristics

| Metric | Measurement | Architecture Rationale |
| :--- | :--- | :--- |
| **Draw Calls** | **1 per frame** | Single fullscreen quad with 2 triangles. |
| **DPR Clamping** | **Max 1.25x** | Atmospheric Gaussian blurs do not require Retina 3x overdraw; clamping saves 70% GPU fill rate. |
| **Tab Visibility** | **0% CPU / GPU** | Automatically detects `visibilitychange` and cancels `requestAnimationFrame` when tab is backgrounded. |
| **Context Recovery**| **Automatic** | Listens for `webglcontextlost` and rebinds textures/buffers on `webglcontextrestored`. |
| **Accessibility** | **Automatic** | Listens to `prefers-reduced-motion: reduce` and replaces WebGL loop with a static soft blurred CSS mesh. |

---

## 🛡️ Anti-FOUC (Zero White Flashes)

When designing OLED dark applications, modern browsers can flash a default white canvas during page load or route transitions before stylesheets evaluate.

To guarantee zero flashes, place this in the `<head>` at **byte 0**:

```html
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#000000">
<meta name="view-transition" content="same-origin">
<style>
  :root, html, body {
    background-color: #000000 !important;
    color-scheme: dark !important;
    margin: 0;
    padding: 0;
  }
</style>
```

---

## 🚀 Quickstart

### 1. Vanilla HTML / Web Component
Simply include the stylesheet and script, then drop the custom element:

```html
<link rel="stylesheet" href="aurora.css">

<!-- Drop into your layout -->
<aurora-background speed="1.0" intensity="0.95"></aurora-background>

<script src="aurora.js"></script>
```

### 2. React Integration
Use the provided `ReactAurora.jsx` component:

```jsx
import { AuroraBackground } from './integrations/ReactAurora';

export default function App() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <AuroraBackground speed={1.0} intensity={0.95} mood="auto" />
      <header className="relative z-10 p-6 backdrop-blur-md bg-black/40">
        <h1>My Dark App</h1>
      </header>
    </div>
  );
}
```

### 3. Vue 3 Integration
Use the provided `VueAurora.vue` component:

```vue
<template>
  <div class="app-root">
    <VueAurora :speed="1.0" :intensity="0.95" mood="auto" />
    <main>
      <h1>My Vue App</h1>
    </main>
  </div>
</template>

<script setup>
import VueAurora from './integrations/VueAurora.vue';
</script>
```

---

## 🎛️ Attributes & Options API

| Attribute / Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `speed` | `number` | `1.0` | Base breathing cycle speed multiplier. |
| `intensity` | `number` | `0.95` | Peak luminescence brightness multiplier. |
| `active-speed` | `number` | `2.0` | Breathing speed during active/interaction state. |
| `active-intensity`| `number`| `1.35` | Luminescence brightness during active state. |
| `mood` | `string` | `'auto'` | Pinned mood (`'auto'`, `'emerald'`, `'sapphire'`, `'violet'`, `'amber'`). |

### Programmatic Methods
Access the element instance directly:

```javascript
const aurora = document.querySelector('aurora-background');

// Pulse active brightness for 4 seconds (e.g. voice/AI thinking state)
aurora.setActive(true, 4000);

// Pin to a specific mood
aurora.setMood('sapphire'); // or 'auto' to return to continuous cycle

// Adjust speed or intensity dynamically
aurora.setSpeed(1.5);
aurora.setIntensity(1.1);
```

### Event Hooks
You can also trigger pulses globally via custom DOM events:

```javascript
// Trigger 3-second active pulse
window.dispatchEvent(new CustomEvent('aurora:active', { detail: { duration: 3000 } }));

// Return to idle
window.dispatchEvent(new CustomEvent('aurora:idle'));
```

---

## 📂 Directory Structure

```
gemini-ambient-aurora/
├── README.md                 # Technical documentation & math guide
├── preview.jpg               # Rendered visual preview
├── src/
│   ├── aurora.js             # WebGL engine & Custom Web Component
│   └── aurora.css            # Layout, fixed layering & CSS fallback
├── demo/
│   └── index.html            # Standalone interactive playground
└── integrations/
    ├── ReactAurora.jsx       # React component wrapper
    ├── VueAurora.vue         # Vue 3 component wrapper
    └── vanilla.html          # Minimal HTML drop-in snippet
```

---

## 📜 License
MIT License. Free to use in personal and commercial projects.
