<script setup lang="ts">
definePageMeta({ middleware: ["guest"] });

const { forgotPassword } = useAuth();

const email = ref(null);
const resetEmailSent = ref(false);
const status = ref("");
const errors = ref<Record<string, string[]>>({});

async function submitForm() {
  errors.value = {};
  status.value = "";

  submitRequest(
    forgotPassword(email.value),
    (data) => {
      status.value = data?.status ?? "";
      resetEmailSent.value = true;
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
      <NuxtLink to="/">
        <ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
      </NuxtLink>
    </template>

    <div class="mb-4 text-sm text-gray-600">
      Forgot your password? No problem. Just let us know your email address and
      we will email you a password reset link that will allow you to choose a
      new one.
    </div>

    <!-- Session Status -->
    <AuthSessionStatus class="mb-4" :status="status" />

    <form @submit.prevent="submitForm">
      <!-- Email Address -->
      <div>
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          class="block mt-1 w-full"
          v-model="email"
          :errors="errors.email"
          required
          autoFocus
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <Button class="ml-3" :disabled="resetEmailSent">
          Email Password Reset Link
        </Button>
      </div>
    </form>
  </AuthCard>
</template>
