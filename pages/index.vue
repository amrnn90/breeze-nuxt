<script lang="ts" setup>
const { user, isLoggedIn, login, logout, refresh } = await useAuth();

// await login({ email: "amrnn90@gmail.com", password: "password" });
</script>

<template>
  <div>
    <button
      @click="login({ email: 'amrnn90@gmail.com', password: 'password' })"
      v-if="!isLoggedIn"
    >
      login
    </button>
    <button @click="logout" v-if="isLoggedIn">logout</button>

    <button @click="refresh">refresh</button>
    <pre>{{ user }}</pre>
  </div>
</template>
