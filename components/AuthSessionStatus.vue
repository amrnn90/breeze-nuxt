<script setup lang="ts">
defineProps<{
  status: string;
}>();
</script>

<template>
  <div v-if="status" class="font-medium text-sm text-green-600">
    {{ status }}
  </div>
</template>
