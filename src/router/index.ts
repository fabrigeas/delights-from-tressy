import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../routes/HomePage';
import EditOfferPage from '../routes/EditOfferPage';
import SignInPage from '../routes/SignIn';
import MyCart from '../routes/MyCart';
import SignUp from '../routes/SignUp';

const routes = [
  { path: '/offers', component: HomePage },
  { path: '/sign-in', component: SignInPage },
  { path: '/sign-up', component: SignUp },
  { path: '/offer/:id', component: EditOfferPage },
  { path: '/my/:cart', component: MyCart },
  { path: '/:pathMatch(.*)*', name: 'HomePage', component: HomePage },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});
export default router;
