<script setup lang="ts">
definePageMeta({ middleware: ["guest"] });

const router = useRouter();
const route = useRoute();
const { login } = await useAuth();
const status = ref(
  route.query.reset?.length > 0 ? atob(route.query.reset as string) : ""
);
const errors = ref([]);
const data = reactive({
  email: null,
  password: null,
  remember_me: null,
});

async function submitForm() {
  errors.value = [];
  status.value = "";

  validateSubmission(
    login(data),
    () => {
      router.push("/dashboard");
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
      <NuxtLink to="/">
        <ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
      </NuxtLink>
    </template>

    <!-- Session Status -->
    <AuthSessionStatus class="mb-4" :status="status" />

    <!-- Validation Errors -->
    <AuthValidationErrors class="mb-4" :errors="errors" />

    <form @submit.prevent="submitForm">
      <!-- Email Address -->
      <div>
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          class="block mt-1 w-full"
          v-model="data.email"
          required
          autoFocus
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
          autoComplete="current-password"
        />
      </div>

      <!-- Remember Me -->
      <div class="block mt-4">
        <label htmlFor="remember_me" class="inline-flex items-center">
          <input
            id="remember_me"
            type="checkbox"
            name="remember"
            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="data.remember_me"
          />
          <span class="ml-2 text-sm text-gray-600"> Remember me </span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <NuxtLink
          href="/forgot-password"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Forgot your password?
        </NuxtLink>

        <Button class="ml-3">Login</Button>
      </div>
    </form>
  </AuthCard>
</template>
