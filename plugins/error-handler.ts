import { FetchError } from "ofetch";

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.hook("vue:error", (error, instance, info) => {
    if (!(error instanceof FetchError)) throw error;

    const status = error.response?.status ?? -1;

    if ([500].includes(status)) {
      console.error("[Laravel Error]", error.data?.message, error.data);
    }

    if ([401, 419].includes(status)) {
      navigateTo("/login");
    }

    if ([409].includes(status)) {
      navigateTo("/verify-email");
    }
  });
});
