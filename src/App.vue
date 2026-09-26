<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="shell">
    <header class="shell-nav">
      <RouterLink to="/" class="brand">Summit Platform</RouterLink>
      <nav>
        <RouterLink to="/app/app-one">App One</RouterLink>
        <RouterLink to="/app/app-two">App Two</RouterLink>
      </nav>
    </header>

    <main class="shell-content">
      <!--
        Key the router-view on the top-level appName segment only
        (see route meta below), NOT on the full path. This is the
        piece that keeps a mounted remote app from being torn down
        and remounted every time it navigates internally.
      -->
      <RouterView v-slot="{ Component }">
        <component :is="Component" :key="route.params.appName ?? route.path" />
      </RouterView>
    </main>
  </div>
</template>

<style>
  body {
    margin: 0;
    font-family: system-ui, sans-serif;
  }
  .shell-nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 0.75rem 1.5rem;
    border-bottom: 1px solid #ddd;
  }
  .shell-nav .brand {
    font-weight: 700;
    text-decoration: none;
    color: #111;
  }
  .shell-nav nav {
    display: flex;
    gap: 1rem;
  }
  .shell-nav a {
    text-decoration: none;
    color: #333;
  }
  .shell-nav a.router-link-active {
    color: #0a5;
    font-weight: 600;
  }
  .shell-content {
    padding: 1.5rem;
  }
</style>
