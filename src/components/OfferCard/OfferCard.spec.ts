import { mount, RouterLinkStub } from '@vue/test-utils';
import OfferCard from './OfferCard.vue';
import { describe, it, test, expect } from 'vitest';
import { fakeOffer, fakeCartItem, fakeUser } from '../../fake';
import { type Offer, type CartItem, type OfferType } from '../../types';
import store from '../../store';

const quantityInput = '.order input';
const btnIncrementQtt = '.order button';
const provide = {
  store,
  user: fakeUser(),
  router: {},
};
const global = {
  provide,
  stubs: {
    RouterLink: RouterLinkStub,
  },
};
describe('Offer', () => {
  test('data and props', () => {
    const data = fakeOffer();
    const wrapper = mount(OfferCard, {
      global,
      props: {
        data,
      },
    });

    expect(wrapper.find('.title').html()).contains(data.title);
  });

  test.each([
    { data: fakeOffer(), type: 'offer' },
    { data: fakeCartItem(1), type: 'cart-item' },
  ])(`OfferCard Type`, ({ data, type }) => {
    const wrapper = mount(OfferCard, {
      global,
      props: {
        data,
      },
    });

    expect(wrapper.find('.title').html()).contains(
      (data as CartItem).offer?.title ?? (data as Offer).title
    );

    expect(wrapper.classes()).includes(type);
  });

  // test.each([fakeUser(), undefined])(`Link to Edit page exists`, () => {
  //   const wrapper = mount(OfferCard, {
  //     props: {
  //       data: fakeOffer(),
  //     },
  //     global
  //   });

  //   const link = expect(wrapper.find('.link-to-edit-offer').exists());

  //   link.toBeTruthy();
  // });

  test.each(['drink', 'food', 'fruit', 'salad'] as OfferType[])(
    'OfferType "%s"',
    offerType => {
      const data = fakeOffer({ offerType });
      const wrapper = mount(OfferCard, {
        props: {
          data,
        },
        global,
      });

      expect(wrapper.classes()).includes(offerType);
    }
  );

  test('add to cart', async () => {
    const data = fakeOffer();
    const wrapper = mount(OfferCard, {
      global,
      props: {
        data,
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
      global,
      props: {
        data,
      },
    });

    expect(wrapper.find('.title').text()).toBe(data.offer.title);
    expect(wrapper.find('.price').text()).toBe(`${data.offer.price}FCFA`);
  });

  // test.each([2])('quantity', quantity => {
  //   const data = fakeCartItem({ quantity });
  //   console.log(data);

  //   const wrapper = mount(OfferCard, {
  //     global,
  //     props: {
  //       data,
  //     },
  //   });

  //   expect(wrapper.text()).toBe(quantity);
  // });
});
