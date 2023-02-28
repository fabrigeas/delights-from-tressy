import { type Store } from 'vuex';
import { CartItem, User } from './types/index';

declare module '@vue/runtime-core' {
  interface State {
    cart: {
      cart: Record<string, CartItem>;
      favorites: Record<string, CartItem>;
      orders: Record<string, CartItem>;
      wishlist: Record<string, CartItem>;
    };
    user: User;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
