import { mount, RouterLinkStub } from '@vue/test-utils';
import SignIn from './SignUp.vue';
import { it, expect } from 'vitest';
import router from '../../router';
import store from '../../store';

it('renders inputs', async () => {
  const wrapper = mount(SignIn, {
    props: {},
    global: {
      provide: {
        store,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
      plugins: [router],
    },
  });

  expect(wrapper.text().replace(/ /g, '')).toEqual(
    'LOGOCreateanaccountEmail:Passowrd:CreatemyaccountIalreadyhaveanaccount,signmeininstead'
  );
});
