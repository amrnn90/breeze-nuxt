<script setup lang="ts">
definePageMeta({ middleware: ["guest"] });

const router = useRouter();
const route = useRoute();
const { resetPassword } = useAuth();

if (!route.query.email) {
  router.push("/");
}

const data = reactive({
  email: route.query.email as string,
  password: "",
  password_confirmation: "",
});
const token = computed(() => route.params.token);
const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(() => resetPassword({ token: token.value as string, ...data }), {
  onSuccess: (result) =>
    router.push({
      path: "/login",
      query: { reset: btoa(result?.status ?? "") },
    }),
});
</script>

<template>
  <AuthCard>
    <template #logo>
      <NuxtLink href="/">
        <ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
      </NuxtLink>
    </template>

    <form @submit.prevent="submit">
      <!-- Email Address -->
      <div class="mt-4">
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          class="block mt-1 w-full opacity-80"
          v-model="data.email"
          :errors="errors.email"
          disabled
          required
        />
      </div>

      <!-- Password -->
      <div class="mt-4">
        <Label for="password">New Password</Label>
        <Input
          id="password"
          type="password"
          class="block mt-1 w-full"
          v-model="data.password"
          :errors="errors.password"
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
          :errors="errors.password_confirmation"
          required
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <Button :disabled="inProgress">Reset Password</Button>
      </div>
    </form>
  </AuthCard>
</template>
