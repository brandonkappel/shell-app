import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import RemoteAppView from '../views/RemoteAppView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      // Catch-all for any app mounted under /app/{appName}/...
      // pathMatch captures everything after the app name so it
      // can be forwarded to the remote app as its initial route.
      path: '/app/:appName/:pathMatch(.*)*',
      name: 'remote-app',
      component: RemoteAppView,
      props: true,
    },
  ],
});
