export default defineNuxtPlugin(async () => {
  const user = useUser();
  try {
    user.value = await fetchCurrentUser();
  } catch {
    user.value = null;
  }
});
