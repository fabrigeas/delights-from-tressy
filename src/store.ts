import { createStore } from 'vuex';
import { type User } from './types';

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
  },
  mutations: {
    setUser(state, user: User | null) {
      state.user = user;

      user != null || user !== undefined
        ? localStorage.setItem('user', JSON.stringify(user))
        : localStorage.removeItem('user');
    },
  },
  getters: {
    getUser: state => state.user,
  },
});
