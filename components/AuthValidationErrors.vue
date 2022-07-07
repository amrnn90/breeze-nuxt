<script setup lang="ts">
type Props = {
  errors: string[];
};

defineProps<Props>();
</script>

<template>
  <div v-if="errors?.length > 0">
    <div className="font-medium text-red-600">
      Whoops! Something went wrong.
    </div>

    <ul className="mt-3 list-disc list-inside text-sm text-red-600">
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>
