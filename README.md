# Laravel Breeze - Nuxt3 Edition 🏝️

## Introduction

Based on the work made at [breeze-next](https://github.com/laravel/breeze-next)

This repository is an implementation of the [Laravel Breeze](https://laravel.com/docs/starter-kits) application / authentication starter kit frontend in [Nuxt3](https://v3.nuxtjs.org/). All of the authentication boilerplate is already written for you - powered by [Laravel Sanctum](https://laravel.com/docs/sanctum), allowing you to quickly begin pairing your beautiful Nuxt3 frontend with a powerful Laravel backend.

## Installation

First, create a Nuxt3 compatible Laravel backend by installing Laravel Breeze into a [fresh Laravel application](https://laravel.com/docs/installation) and installing Breeze's API scaffolding:

```bash
# Create the Laravel application...
laravel new backend

cd backend

# Install Breeze and dependencies...
composer require laravel/breeze --dev

php artisan breeze:install api

# Run database migrations
php artisan migrate
```

Next, ensure that your application's `APP_URL` and `FRONTEND_URL` environment variables are set to `http://localhost:8000` and `http://localhost:3000`, respectively.

Also, when using email verification, you can change the page your users are redirected to by updating `HOME` constant in your `RouteServiceProvider.php` file:

```php
class RouteServiceProvider extends ServiceProvider
{
    // ...
    public const HOME = '/dashboard';
    // ...
}
```

After defining the appropriate environment variables, you may serve the Laravel application using the `serve` Artisan command:

```bash
# Serve the application...
php artisan serve
```

Next, clone this repository and install its dependencies with `yarn install` or `npm install`. Then, copy the `.env.example` file to `.env` and supply the URL of your backend and frontend:

```
NUXT_PUBLIC_BACKEND_URL=http://localhost:8000
NUXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

Finally, run the application via `npm run dev`. The application will be available at `http://localhost:3000`:

```
npm run dev
```

> **Note**  
> Currently, we recommend using `localhost` during local development of your backend and frontend to avoid CORS "Same-Origin" issues.


**Alternatively**, you can use [concurrently](https://github.com/open-cli-tools/concurrently) to run both servers of Nuxt and Laravel with a single command.

```bash
# Install concurrently
npm install --save-dev concurrently
```
Then add this script to `package.json` (this assumes your Laravel app lives in `../backend` relative to your Nuxt app):
```json
  "scripts": {
    "dev:fullstack": "concurrently --names 'LARAVEL,NUXT' --prefix-colors 'yellow,blue' --kill-others 'cd ../backend/ && php artisan serve' 'nuxi dev'",
  },
```

## Utilities

You have the following auto imported utilities in the `utils` directory:

### $larafetch

`$larafetch` is a wrapper around Nuxt's `$fetch` that makes it a breeze to make requests to your Laravel app:

- Base URL is already set to `NUXT_PUBLIC_BACKEND_URL` value specified in your `.env` file.
- Auto CSRF management.
- Forwards the appropriate headers/cookies when in SSR context.

> **Note**  
> To take advantage of Nuxt3 SSR Hydration when making `GET` requests, you should use the `useLarafetch` composable rather than directly calling `$larafetch`, otherwise your app will make additional unnecessary requests once the page loads in your browser (The same also applies to Nuxt's regular `$fetch` and `useFetch`).

## Composables

### useAuth

This Nuxt3 application contains a custom `useAuth` composable, designed to abstract all authentication logic away from your pages. In addition, the composable can be used to access the currently authenticated user:

```vue
<script setup lang="ts">
const { user, logout } = useAuth();
</script>

<template>
  <div>
    <p>{{ user.name }}</p>

    <button @click="logout">Sign out</button>
  </div>
</template>
```

### useLarafetch

`useLarafetch` is a wrapper around Nuxt's `useFetch` which uses `$larafetch` instead of `$fetch`:

```vue
<script setup lang="ts">
const { data: posts } = await useLarafetch("/api/posts");
</script>

<template>
  <div>
    <pre>{{ posts }}</pre>
  </div>
</template>

```

### useSubmit

`useSubmit` is a useful composable to track validation errors and loading state when making `POST` or `PUT` requests:

```vue
<script setup lang="ts">
const data = reactive({
  title: "lorem ipsum",
  body: "lorem ipsum",
});

const {
  submit: createPost,
  inProgress,
  validationErrors,
} = useSubmit(() => $larafetch("/api/posts", { method: "post", body: data }), {
  onSuccess: (result) => console.log("Post created successfully", result),
});
</script>

<template>
  <div>
    <button @click="createPost" :disabled="inProgress">Create Post</button>
    <pre>{{ validationErrors }}</pre>
  </div>
</template>
```

## Middleware

You can use any of the provided middlewares in your pages:

```vue
<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });
</script>

<template>
  <p>Only logged in users can access this page.</p>
</template>
```

- `auth`

  Only logged in users can access the page, otherwise redirect to `/login` page.

- `guest`

  Only non-logged in users can access the page, otherwise redirect to the `/dashboard` page.

- `verified`

  Only logged in users with verified emails can access the page, otherwise redirect to `/login` page (if not logged in) or `/verify-email` page (if logged in).

- `unverified`

  Only logged in users with unverified emails can access the page, otherwise redirect to `/login` page (if not logged in) or `/dashboard` page (if logged in). This is used only for the `/verify-email` page.

## License

Laravel Breeze Nuxt3 is open-sourced software licensed under the [MIT license](LICENSE.md).
