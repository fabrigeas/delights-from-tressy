import { mount, RouterLinkStub } from '@vue/test-utils';
import CustomHeader from './CustomHeader.vue';
import { describe, it, expect } from 'vitest';

describe('Properties', () => {
  it('renders', async () => {
    const wrapper = mount(CustomHeader, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.find('menu').text().replace(/ /g, '')).toBe(
      'MenudujourNosMenusCruditeesBoissons'
    );
  });
});
