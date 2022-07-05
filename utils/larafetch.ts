import { $fetch } from "ohmyfetch";

const CSRF_COOKIE = "XSRF-TOKEN";
const CSRF_HEADER = "X-XSRF_TOKEN";

export async function initCsrf() {
  const { backendUrl } = useRuntimeConfig().public;

  await $fetch("/sanctum/csrf-cookie", {
    baseURL: backendUrl,
    credentials: "include",
  });
}

export const $larafetch = async (
  ...[path, rest]: Parameters<typeof $fetch>
): ReturnType<typeof $fetch> => {
  const { backendUrl, frontendUrl } = useRuntimeConfig().public;
  const token = useCookie(CSRF_COOKIE);

  let headers: any = {
    ...rest?.headers,
    ...(token.value && { [CSRF_HEADER]: token.value }),
  };

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"]),
      referer: frontendUrl,
    };
  }

  return $fetch(path, {
    baseURL: backendUrl,
    ...rest,
    headers,
    credentials: "include",
  });
};
