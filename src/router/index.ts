import DashboardView from '@/views/DashboardView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: DashboardView }],
});

export default router;
