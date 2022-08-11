<script setup lang="ts">
definePageMeta({ middleware: ["unverified"] });

const { logout, resendEmailVerification } = useAuth();
const verificationIsSent = ref(false);

async function handleResendVerification() {
  const status = (await resendEmailVerification()).status;
  if (status === "verification-link-sent") {
    verificationIsSent.value = true;
  }
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
      Thanks for signing up! Before getting started, could you verify your email
      address by clicking on the link we just emailed to you? If you didn't
      receive the email, we will gladly send you another.
    </div>

    <template v-if="verificationIsSent">
      <div class="mb-4 font-medium text-sm text-green-600">
        A new verification link has been sent to the email address you provided
        during registration.
      </div>
    </template>

    <div class="mt-4 flex items-center justify-between">
      <Button @click="handleResendVerification" :disabled="verificationIsSent">
        Resend Verification Email
      </Button>

      <button
        type="button"
        class="underline text-sm text-gray-600 hover:text-gray-900"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </AuthCard>
</template>
