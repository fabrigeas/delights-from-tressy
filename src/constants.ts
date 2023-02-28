import { type OfferType } from './types';
export const ROUTES = {
  HOME: '/',
  TODAY: '/today',
  FOOD: 'food',
  DRINK: 'drink',
  SALAD: 'salad',
};
export const API_BASE_URL = `/api`;

export const API_ROUTES = {
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
};

export const OFFER_TYPES: OfferType[] = ['drink', 'food', 'fruit', 'salad'];
