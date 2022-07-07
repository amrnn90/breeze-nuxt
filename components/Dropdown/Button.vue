<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { MenuItem } from "@headlessui/vue";
</script>

<template>
  <MenuItem v-slot="{ active }">
    <button
      class="w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ocus:outline-none transition duration-150 ease-in-out"
      :class="[active && 'bg-gray-100']"
      v-bind="$attrs"
    >
      <slot />
    </button>
  </MenuItem>
</template>
