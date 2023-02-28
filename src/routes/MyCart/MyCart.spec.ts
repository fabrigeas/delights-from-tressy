import { mount } from '@vue/test-utils';
import MyCart from './MyCart.vue';
import { describe, it, expect } from 'vitest';
import $store from '../../store';

const $route = {
  params: {
    id: '12344',
  },
};

describe('Properties', () => {
  it('renders', async () => {
    const wrapper = mount(MyCart, {
      global: {
        mocks: {
          $route,
          $store,
        },
      },
    });

    expect(wrapper.text().replace(/ /g, '')).toBe('Itemsinyou(0)');
    expect(wrapper.find('section.cart-container').exists()).toBeTruthy();
  });
});

// describe('State', () => {
//   const $store = {
//     state: {
//       cart: {
//         cart: fakeCartItemList(5),
//       },
//     },
//     getters: {
//       itemsByType: fakeCartItemList(5),
//     },
//   };

//   it('renders', async () => {
//     const wrapper = mount(MyCart, {
//       global: {
//         provide: {
//           store: $store
//         },
//         mocks: {
//           $route,
//           $store,
//         },
//       },
//     });

//     expect(wrapper.text().replace(/ /g, '')).toBe('Itemsinyou(0)');
//     expect(wrapper.find('section.cart-container').exists()).toBeTruthy();
//   });
// });
