import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../routes/HomePage';
import EditOfferPage from '../routes/EditOfferPage';
import SignInPage from '../routes/SignIn';
import MyCart from '../routes/MyCart';

const routes = [
  { path: '/offers', component: HomePage },
  { path: '/sign-in', component: SignInPage },
  { path: '/offer/:id', component: EditOfferPage },
  { path: '/my/:cart', component: MyCart },
  { path: '/:pathMatch(.*)*', name: 'HomePage', component: HomePage },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});
export default router;
