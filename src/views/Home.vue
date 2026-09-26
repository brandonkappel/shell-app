<script setup lang="ts">
import { APP_REGISTRY } from '../config/apps';
</script>

<template>
  <div>
    <h1>Summit Employee Platform</h1>
    <p>Pick an app to launch it inside the shell:</p>
    <ul>
      <li v-for="(app, key) in APP_REGISTRY" :key="key">
        <RouterLink :to="`/app/${key}`">{{ app.label }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
