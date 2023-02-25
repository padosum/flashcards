import DashboardView from '@/views/DashboardView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: DashboardView, name: 'Dashboard' }],
});

export default router;
