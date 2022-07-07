<script setup lang="ts">
definePageMeta({ middleware: ["guest"] });

const router = useRouter();
const { register } = await useAuth();
const errors = ref([]);
const data = reactive({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
});

async function submitForm() {
  errors.value = [];

  submitRequest(
    register(data),
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
      <NuxtLink href="/">
        <ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
      </NuxtLink>
    </template>

    <!-- Validation Errors -->
    <AuthValidationErrors class="mb-4" :errors="errors" />

    <form @submit.prevent="submitForm">
      <!-- Name -->
      <div>
        <Label for="name">Name</Label>
        <Input
          id="name"
          type="text"
          class="block mt-1 w-full"
          v-model="data.name"
          required
          autoFocus
        />
      </div>

      <!-- Email Address -->
      <div class="mt-4">
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          class="block mt-1 w-full"
          v-model="data.email"
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
          autoComplete="new-password"
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
        <NuxtLink
          href="/login"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Already registered?
        </NuxtLink>

        <Button class="ml-3">Register</Button>
      </div>
    </form>
  </AuthCard>
</template>
