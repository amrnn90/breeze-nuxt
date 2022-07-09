<script setup lang="ts">
import { Menu, MenuButton, MenuItems, TransitionRoot } from "@headlessui/vue";

const props = defineProps({
  align: { type: String, default: "right" },
  contentClass: { type: String, default: "" },
  wrapperClass: { type: String, default: "" },
});

const alignmentClass = computed(() => {
  switch (props.align) {
    case "left":
      return "origin-top-left left-0";
    case "top":
      return "origin-top";
    case "right":
    default:
      return "origin-top-right right-0";
  }
});
</script>

<template>
  <Menu as="div" class="relative" v-slot="{ open }">
    <MenuButton as="template">
      <slot name="trigger" />
    </MenuButton>

    <TransitionRoot
      :show="open"
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div
        class="absolute z-50 mt-2 rounded-md shadow-lg w-48"
        :class="[alignmentClass, wrapperClass]"
      >
        <MenuItems
          class="rounded-md focus:outline-none ring-1 ring-black ring-opacity-5 py-1 bg-white"
          :class="contentClass"
          static
        >
          <slot />
        </MenuItems>
      </div>
    </TransitionRoot>
  </Menu>
</template>
