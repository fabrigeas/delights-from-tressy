import { type Store } from 'vuex';
import { type User } from './types';

declare module '@vue/runtime-core' {
  interface State {
    user: User;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
