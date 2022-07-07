export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();
  if (user.value) return navigateTo("/dashboard", { replace: true });
});
