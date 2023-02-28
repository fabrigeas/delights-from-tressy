import { createStore } from 'vuex';
import { CartItem, Offer, CartType, User } from './types/index';

const name = 'state';
const getState = (): Shop => {
  const cart = localStorage.getItem(name);

  return cart
    ? JSON.parse(cart)
    : {
        cart: {},
        favorites: {},
        oders: {},
        wishlist: {},
      };
};
const getUser = (): User | null => {
  const user = localStorage.getItem('user');

  if (user) {
    return JSON.parse(user);
  }

  return null;
};

export default createStore({
  state: {
    user: getUser(),
    cart: getState(),
  },
  mutations: {
    addItemToCart({ cart }, offer: Offer) {
      cart.cart[offer.id] = {
        offer,
        quantity: 1,
      };

      localStorage.setItem(name, JSON.stringify(cart));
    },
    updateItemInCart({ cart }: Shop, { offer, quantity }: CartItem) {
      cart.cart[offer.id] = {
        quantity,
        offer,
      };
      localStorage.setItem(name, JSON.stringify(cart));
    },
    removeFromCart({ cart }, { id }: Offer) {
      delete cart.cart[id];
      localStorage.setItem(name, JSON.stringify(cart));
    },
    setUser(state, user: User | null) {
      state.user = user;

      user != null || user !== undefined
        ? localStorage.setItem('user', JSON.stringify(user))
        : localStorage.removeItem('user');
    },
  },
  getters: {
    getUser: state => state.user,
    itemsByType:
      ({ cart }) =>
      (cartType: CartType) => {
        console.log(cart, cartType);

        return cart[cartType];
      },
  },
});
