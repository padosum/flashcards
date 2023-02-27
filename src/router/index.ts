import DashboardView from '@/views/DashboardView.vue';
import LearnsetView from '@/views/LearnsetView.vue';
import LearnView from '@/views/LearnView.vue';

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: DashboardView, name: 'Dashboard' },
    { path: '/learnset/:id', component: LearnsetView, name: 'LearnsetView' },
    {
      path: '/learn/:id',
      component: LearnView,
      name: 'Learn',
    },
  ],
});

export default router;
