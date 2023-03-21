<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const verified = !!route.query.verified;

onMounted(() => {
  if (!verified) return;

  router.replace({
    query: { ...route.query, verified: undefined },
  });
});
</script>

<template>
  <!-- Email Verification Success Message -->
  <div v-if="verified" class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div
      class="my-12 p-6 bg-gray-900 text-white font-semibold shadow-sm sm:rounded-lg"
    >
      Your email has been verified, thank you!
    </div>
  </div>
</template>
