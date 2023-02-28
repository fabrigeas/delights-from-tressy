import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../routes/HomePage';
import EditOfferPage from '../routes/EditOfferPage';

const routes = [
  { path: '/offers', component: HomePage },
  { path: '/offer/:id', component: EditOfferPage },
  { path: '/:pathMatch(.*)*', name: 'HomePage', component: HomePage },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});
export default router;
