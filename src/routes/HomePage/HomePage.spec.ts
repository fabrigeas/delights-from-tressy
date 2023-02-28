import { nextTick } from 'vue';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import axios from 'axios';
import { fakeOfferList } from '../../fake';
import HomePage from './HomePage.vue';
import ListView from '../../components/ListView';

const $route = {
  query: {
    title: '',
  },
};

const global = {
  mocks: {
    $route,
  },
  stubs: {
    RouterLink: RouterLinkStub,
  },
};

beforeAll(() => {
  const offers = fakeOfferList(2);

  vi.mock('axios');
  axios.get = vi.fn().mockResolvedValue({ data: { offers } });
});

describe('fetchOffers', () => {
  it('renders', async () => {
    const wrapper = mount(HomePage, {
      global,
    });

    expect(wrapper.text().replace(/ /g, '')).toContain('Checkoutmyorders');
  });

  it.each([1, 2, 3])('fetches length %d offers', async length => {
    const offers = fakeOfferList(length);

    axios.get = vi.fn().mockResolvedValue({ data: { offers } });

    const wrapper = mount(HomePage, {
      global,
    });

    await nextTick();
    await wrapper.find('form').trigger('submit');
    expect(wrapper.findComponent(ListView).props('items')).toEqual(offers);

    expect(wrapper.text().replace(/ /g, '')).toContain('Checkoutmyorders');
  });
});
