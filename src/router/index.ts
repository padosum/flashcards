import DashboardView from '@/views/DashboardView.vue';
import LearnsetView from '@/views/LearnsetView.vue';

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: DashboardView, name: 'Dashboard' },
    { path: '/learnset/:id', component: LearnsetView, name: 'LearnsetView' },
  ],
});

export default router;
