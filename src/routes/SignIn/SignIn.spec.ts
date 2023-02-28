import { mount, RouterLinkStub } from '@vue/test-utils';
import SignIn from './SignIn.vue';
import { it, expect } from 'vitest';
import router from '../../router';
import { faker } from '@faker-js/faker';

it('renders inputs', async () => {
  const wrapper = mount(SignIn, {
    props: {},
    global: {
      provide: {
        store: {},
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
      plugins: [router],
    },
  });
  const { email, password } = faker.internet;

  await wrapper.find('input[type="email"]').setValue(email());
  await wrapper.find('input[type="password"]').setValue(password());
  await wrapper.find('[type="submit"]').trigger('click');

  expect(wrapper.classes()).toContain('sign-in');
});
