import { useUser, fetchCurrentUser } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const user = useUser();

  // Skip if already initialized on server
  if (user.value !== undefined) return;

  user.value = await fetchCurrentUser();
});
