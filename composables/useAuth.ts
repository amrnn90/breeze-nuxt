export const useAuth = async () => {
  const {
    data: user,
    refresh,
    error,
  } = await useAsyncData("user", async () => {
    try {
      return await $larafetch("/api/user");
    } catch (error) {
      // console.log("here", error);
      console.log(error);
      if (error.response.status !== 409) return null;
      // TODO: handle email verification
      // router.push("/verify-email");
    }
  });

  const isLoggedIn = computed(() => !!user.value);

  async function login(credentials) {
    // try {
    await $larafetch("/login", { method: "post", body: credentials });
    refresh();
    // } catch (error) {
    // if (error.response.status !== 422) throw error;

    // setErrors(Object.values(error.response.data.errors).flat());
    // }
  }

  async function logout() {
    if (!isLoggedIn.value) return;
    await $larafetch("/logout", { method: "post" });
    user.value = null;
  }

  return { user, isLoggedIn, login, logout, refresh };
};
