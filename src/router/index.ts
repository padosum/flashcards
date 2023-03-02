import DashboardView from '@/views/DashboardView.vue';
import LearnsetView from '@/views/LearnsetView.vue';
import LearnView from '@/views/LearnView.vue';

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/DashboardView.vue'),
      name: 'Dashboard',
    },
    {
      path: '/learnset/:id',
      component: () => import('@/views/LearnsetView.vue'),
      name: 'LearnsetView',
    },
    {
      path: '/learn/:id',
      component: () => import('@/views/LearnView.vue'),
      name: 'Learn',
    },
  ],
});

export default router;
