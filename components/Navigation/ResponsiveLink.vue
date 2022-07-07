<template>
  <NuxtLink class="responsive-nav-link" active-class="active">
    <slot />
  </NuxtLink>
</template>

<style scoped lang="postcss">
.responsive-nav-link {
  @apply block pl-3 pr-4 py-2 border-l-4 text-base font-medium leading-5 focus:outline-none transition duration-150 ease-in-out;

  &:not(.active) {
    @apply border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300;
  }

  &.active {
    @apply border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700;
  }
}
</style>
