import React, { useEffect, useRef } from 'react';
import '../src/aurora.css';
import '../src/aurora.js'; // Imports the <aurora-background> custom element

/**
 * AuroraBackground React Component
 * Modeled directly after the Google Gemini iOS ambient fluid light.
 *
 * @param {Object} props
 * @param {number} [props.speed=1.0] - Base breathing animation speed.
 * @param {number} [props.intensity=0.95] - Peak luminescence intensity.
 * @param {number} [props.activeSpeed=2.0] - Speed when active/speaking.
 * @param {number} [props.activeIntensity=1.35] - Intensity when active/speaking.
 * @param {'auto'|'emerald'|'sapphire'|'violet'|'amber'} [props.mood='auto'] - Color mood.
 * @param {boolean} [props.active=false] - Whether the aurora is currently in active/speaking pulse.
 * @param {string} [props.className] - Optional custom CSS classes.
 */
export function AuroraBackground({
  speed = 1.0,
  intensity = 0.95,
  activeSpeed = 2.0,
  activeIntensity = 1.35,
  mood = 'auto',
  active = false,
  className = '',
}) {
  const auroraRef = useRef(null);

  useEffect(() => {
    if (auroraRef.current && typeof auroraRef.current.setActive === 'function') {
      auroraRef.current.setActive(active);
    }
  }, [active]);

  return (
    <aurora-background
      ref={auroraRef}
      speed={speed}
      intensity={intensity}
      active-speed={activeSpeed}
      active-intensity={activeIntensity}
      mood={mood}
      class={className}
    />
  );
}

export default AuroraBackground;
