<template>
  <aurora-background
    ref="auroraEl"
    :speed="speed"
    :intensity="intensity"
    :active-speed="activeSpeed"
    :active-intensity="activeIntensity"
    :mood="mood"
    :class="customClass"
  />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import '../src/aurora.css';
import '../src/aurora.js';

const props = defineProps({
  speed: {
    type: Number,
    default: 1.0,
  },
  intensity: {
    type: Number,
    default: 0.95,
  },
  activeSpeed: {
    type: Number,
    default: 2.0,
  },
  activeIntensity: {
    type: Number,
    default: 1.35,
  },
  mood: {
    type: String,
    default: 'auto',
  },
  active: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: '',
  },
});

const auroraEl = ref(null);

watch(
  () => props.active,
  (isActive) => {
    if (auroraEl.value && typeof auroraEl.value.setActive === 'function') {
      auroraEl.value.setActive(isActive);
    }
  }
);
</script>
