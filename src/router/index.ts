import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../routes/HomePage';

const routes = [
  { path: '/offers', component: HomePage },
  { path: '/:pathMatch(.*)*', name: 'HomePage', component: HomePage },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});
export default router;
