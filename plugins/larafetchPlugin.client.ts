export default defineNuxtPlugin(async (nuxtApp) => {
  // const { apiUrl } = useRuntimeConfig().public;
  await initCsrf();
});
