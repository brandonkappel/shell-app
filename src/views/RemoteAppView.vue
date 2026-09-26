<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { APP_REGISTRY } from '../config/apps';
import { getAccessToken, signOut } from '../services/authService';

const props = defineProps<{
  appName: string;
}>();

const mountPoint = ref<HTMLElement | null>(null);
const loading = ref(true);
const loadFailed = ref(false);
let unmountRemote: (() => void) | undefined;

onMounted(async () => {
  const definition = APP_REGISTRY[props.appName];

  if (!definition) {
    loading.value = false;
    loadFailed.value = true;
    return;
  }

  try {
    // Dynamic import of a URL only known at runtime - @vite-ignore
    // tells Vite not to try to statically analyze/bundle this.
    const remoteModule = await import(/* @vite-ignore */ definition.url);
    const { mount } = remoteModule;

    if (typeof mount !== 'function') {
      throw new TypeError(
        `Remote app "${props.appName}" does not export a mount function.`
      );
    }

    loading.value = false;
    // Wait a tick so mountPoint's <div> is actually in the DOM.
    await new Promise((resolve) => requestAnimationFrame(resolve));

    if (mountPoint.value) {
      // basePath tells the remote app's own router what prefix it's
      // mounted under, so its createWebHistory(basePath) resolves the
      // *current* browser URL correctly on first render - no hardcoded
      // push('/') and no memory history, so deep links and refresh work.
      unmountRemote = await mount({
        element: mountPoint.value,
        basePath: `/app/${props.appName}`,
        getAccessToken,
        signOut,
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Unable to mount remote app "${props.appName}".`, error);
    loading.value = false;
    loadFailed.value = true;
  }
});

onBeforeUnmount(() => {
  unmountRemote?.();
});
</script>

<template>
  <div>
    <p v-if="loading">Loading {{ appName }}...</p>
    <p v-else-if="loadFailed">
      Sorry, {{ appName }} failed to load. Try refreshing, or head
      <RouterLink to="/">back home</RouterLink>.
    </p>
    <div v-show="!loading && !loadFailed" ref="mountPoint"></div>
  </div>
</template>
