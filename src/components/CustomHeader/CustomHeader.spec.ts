import { mount, RouterLinkStub } from '@vue/test-utils';
import CustomHeader from './CustomHeader.vue';
import { describe, it, test, expect } from 'vitest';
import { fakeUser } from '../../fake';

describe('Properties', () => {
  it('renders', async () => {
    const wrapper = mount(CustomHeader, {
      global: {
        provide: {
          store: {
            state: {},
          },
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.find('menu').text().replace(/ /g, '')).toBe(
      'MenudujourNosMenusCruditeesBoissons'
    );
  });

  test.each([null, undefined, fakeUser()])(`is Authenticated`, async user => {
    const wrapper = mount(CustomHeader, {
      global: {
        provide: {
          store: {
            state: {
              user,
            },
          },
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const button = wrapper.find('nav > li').exists();
    const dropdown = wrapper.find('.dropdown').exists();

    if (user != null) {
      expect(wrapper.text().replace(/ /g, '')).toBe(
        `showMenuMenudujourNosMenusCruditeesBoissons${user.email}MyCartMyfavoritesMyordersSign-out`
      );
      expect(button).toBe(false);
      expect(dropdown).toBe(true);
    } else {
      expect(wrapper.text().replace(/ /g, '')).toBe(
        'showMenuMenudujourNosMenusCruditeesBoissonsSignin'
      );
      expect(dropdown).toBe(false);
      expect(button).toBe(true);
    }
  });
});
