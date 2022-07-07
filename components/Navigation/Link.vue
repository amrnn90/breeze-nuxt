<template>
  <NuxtLink class="nav-link" active-class="active">
    <slot />
  </NuxtLink>
</template>

<style scoped lang="postcss">
.nav-link {
  @apply inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out;

  &:not(.active) {
    @apply border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300;
  }

  &.active {
    @apply border-indigo-400 text-gray-900 focus:border-indigo-700;
  }
}
</style>
