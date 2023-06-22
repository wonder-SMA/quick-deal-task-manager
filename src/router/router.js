import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import TaskPage from '../pages/TaskPage.vue';

const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/:category',
    component: TaskPage,
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
