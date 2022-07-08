<script setup lang="ts">
definePageMeta({ middleware: ["guest"] });

const router = useRouter();
const route = useRoute();
const { resetPassword } = await useAuth();

const data = reactive({
  email: route.query.email,
  password: null,
  password_confirmation: null,
});
const errors = ref([]);
const token = computed(() => route.params.token);

async function submitForm() {
  errors.value = [];

  submitRequest(
    resetPassword({ token: token.value, ...data }),
    ({ status }) => {
      router.push({ path: "/login", query: { reset: btoa(status) } });
    },
    (validationErrors) => {
      errors.value = Object.values(validationErrors).flat();
    }
  );
}
</script>

<template>
  <AuthCard>
    <template #logo>
      <NuxtLink href="/">
        <ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
      </NuxtLink>
    </template>

    <!-- Validation Errors -->
    <AuthValidationErrors class="mb-4" :errors="errors" />

    <form @submit.prevent="submitForm">
      <!-- Email Address -->
      <div class="mt-4">
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          class="block mt-1 w-full opacity-80"
          v-model="data.email"
          disabled
          required
        />
      </div>

      <!-- Password -->
      <div class="mt-4">
        <Label for="password">Password</Label>
        <Input
          id="password"
          type="password"
          class="block mt-1 w-full"
          v-model="data.password"
          required
        />
      </div>

      <!-- Confirm Password -->
      <div class="mt-4">
        <Label for="password_confirmation">Confirm Password</Label>
        <Input
          id="password_confirmation"
          type="password"
          class="block mt-1 w-full"
          v-model="data.password_confirmation"
          required
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <Button>Reset Password</Button>
      </div>
    </form>
  </AuthCard>
</template>
