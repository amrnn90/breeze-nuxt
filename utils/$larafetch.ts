import { $fetch, FetchOptions } from "ofetch";
import { H3Event, EventHandlerRequest, parseCookies } from "h3";

const CSRF_COOKIE = "XSRF-TOKEN";
const CSRF_HEADER = "X-XSRF-TOKEN";

// could not import these types from ofetch, so copied them here
interface ResponseMap {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
}
type ResponseType = keyof ResponseMap | "json";
// end of copied types

export type LarafetchOptions<R extends ResponseType> = FetchOptions<R> & {
  event?: H3Event<EventHandlerRequest> | null;
};

export async function $larafetch<T, R extends ResponseType = "json">(
  path: RequestInfo,
  {
    event = null,
    ...options
  }: LarafetchOptions<R> = {}
) {
  const { backendUrl, frontendUrl } = useRuntimeConfig().public;
  let token = event
    ? parseCookies(event)[CSRF_COOKIE]
    : useCookie(CSRF_COOKIE).value;

  // on client initiate a csrf request and get it from the cookie set by laravel
  if (
    process.client &&
    ["post", "delete", "put", "patch"].includes(
      options?.method?.toLowerCase() ?? ""
    )
  ) {
    await initCsrf();
    // cannot use nuxt composables such as useCookie after an async operation:
    // https://github.com/nuxt/framework/issues/5238
    token = getCookie(CSRF_COOKIE);
  }

  let headers: any = {
    accept: "application/json",
    ...options?.headers,
    ...(token && { [CSRF_HEADER]: token }),
  };

  if (process.server) {
    const cookieString = event
      ? event.headers.get("cookie")
      : useRequestHeaders(["cookie"]).cookie;

    headers = {
      ...headers,
      cookie: cookieString,
      referer: frontendUrl,
    };
  }

  return await $fetch<T, R>(path, {
    baseURL: backendUrl,
    ...options,
    headers,
    credentials: "include",
  });
}

async function initCsrf() {
  const { backendUrl } = useRuntimeConfig().public;

  await $fetch("/sanctum/csrf-cookie", {
    baseURL: backendUrl,
    credentials: "include",
  });
}

// https://github.com/axios/axios/blob/bdf493cf8b84eb3e3440e72d5725ba0f138e0451/lib/helpers/cookies.js
function getCookie(name: string) {
  const match = document.cookie.match(
    new RegExp("(^|;\\s*)(" + name + ")=([^;]*)")
  );
  return match ? decodeURIComponent(match[3]) : null;
}
