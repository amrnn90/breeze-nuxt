import { useUser, fetchCurrentUser } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const user = useUser();
  user.value = await fetchCurrentUser();
});
