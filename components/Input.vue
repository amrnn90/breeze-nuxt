<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
type Props = {
  modelValue?: string | null;
  errors?: string[] | string;
};

const props = defineProps<Props>();
defineEmits(["update:modelValue"]);

const renderedErrors = computed(() =>
  Array.isArray(props.errors)
    ? props.errors
    : props.errors
      ? [props.errors]
      : []
);
</script>

<template>
  <div>
    <input :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      v-bind="$attrs" />

    <!-- Validation Errors -->
    <ul v-if="renderedErrors?.length > 0" class="mt-3 text-sm text-red-600">
      <li v-for="error in renderedErrors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>
