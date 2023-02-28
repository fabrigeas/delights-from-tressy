import { mount, RouterLinkStub } from '@vue/test-utils';
import OfferCard from './OfferCard.vue';
import { describe, it, test, expect } from 'vitest';
import { fakeOffer, fakeCartItem, fakeUser } from '../../fake';
import { type Offer, type CartItem, type OfferType } from '../../types';

const quantityInput = '.order input';
const btnIncrementQtt = '.order button';
const user = fakeUser();
const provide = {
  user,
};

describe('Offer', () => {
  test('data and props', () => {
    const data = fakeOffer();
    const wrapper = mount(OfferCard, {
      props: {
        data,
      },
      global: {
        provide,
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.find('.title').html()).contains(data.title);
  });

  test.each([
    { data: fakeOffer(), type: 'offer' },
    { data: fakeCartItem(1), type: 'cart-item' },
  ])(`OfferCard Type`, ({ data, type }) => {
    const wrapper = mount(OfferCard, {
      props: {
        data,
      },
      global: {
        provide,
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.find('.title').html()).contains(
      (data as CartItem).offer?.title ?? (data as Offer).title
    );

    expect(wrapper.classes()).includes(type);
  });

  test.each([fakeUser(), undefined])(`Link to Edit page exists`, () => {
    const wrapper = mount(OfferCard, {
      props: {
        data: fakeOffer(),
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const link = expect(wrapper.find('.link-to-edit-offer').exists());

    link.toBeTruthy();
  });

  test.each(['drink', 'food', 'fruit', 'salad'] as OfferType[])(
    'OfferType',
    offerType => {
      const data = fakeOffer({ offerType });
      const wrapper = mount(OfferCard, {
        shallow: true,
        props: {
          data,
        },
        global: {
          provide,
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
      });

      expect(wrapper.classes()).includes(offerType);
    }
  );

  test('add to cart', async () => {
    const data = fakeOffer();
    const wrapper = mount(OfferCard, {
      props: {
        data,
      },
      global: {
        provide: {
          user: fakeUser(),
          router: {},
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.find(quantityInput).exists()).toBeFalsy();
    await wrapper.find(btnIncrementQtt).trigger('click');
    await wrapper.find(quantityInput).setValue(5);
  });
});

describe('Cart item', () => {
  it('renders props', () => {
    const data: CartItem = fakeCartItem();
    const wrapper = mount(OfferCard, {
      shallow: true,
      props: {
        data,
      },
      global: {
        provide,
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.find('.title').text()).toBe(data.offer.title);
    expect(wrapper.find('.price').text()).toBe(`${data.offer.price}FCFA`);
  });

  // test.each([2])('quantity', quantity => {
  //   const data = fakeCartItem(quantity);
  //   const wrapper = mount(OfferCard, {
  //     shallow: true,
  //     props: {
  //       data,
  //     },
  //     global: {
  //       provide: {
  //         store,
  //         user: fakeUser(),
  //       },
  //       stubs: {
  //         RouterLink: RouterLinkStub,
  //       },
  //     },
  //   });

  //   expect(wrapper.find(quantityInput).text()).toBe(quantity);
  // });
});
