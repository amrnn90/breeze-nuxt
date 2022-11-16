<script setup lang="ts">
definePageMeta({ middleware: ["guest"] });

const router = useRouter();
const { register } = useAuth();

const data = reactive({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
});
const errors = ref<Record<string, string[]>>({});

async function submitForm() {
  errors.value = {};

  submitRequest(
    register(data),
    () => {
      router.push("/dashboard");
    },
    (validationErrors) => {
      errors.value = validationErrors ?? {};
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

    <form @submit.prevent="submitForm">
      <!-- Name -->
      <div>
        <Label for="name">Name</Label>
        <Input
          id="name"
          type="text"
          class="block mt-1 w-full"
          v-model="data.name"
          :errors="errors.name"
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
          :errors="errors.email"
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
          :errors="errors.password"
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
          :errors="errors.password_confirmation"
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
