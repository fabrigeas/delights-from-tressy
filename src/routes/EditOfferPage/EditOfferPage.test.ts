import { mount } from '@vue/test-utils';
import axios from 'axios';
import OfferDetail from './EditOfferPage.vue';
import { it, expect, vi, beforeAll } from 'vitest';
import { fakeOffer } from '../../fake';

const global = {
  mocks: {
    $route: {
      params: {
        id: '12344',
      },
    },
  },
};

beforeAll(() => {
  const offer = fakeOffer();

  vi.mock('axios');
  axios.get = vi.fn().mockResolvedValue({ data: { offer } });
});

it('renders', async () => {
  const wrapper = mount(OfferDetail, {
    global,
  });

  expect(
    wrapper
      .find('form')
      .text()
      .trim()
      .replace(/ /g, '')
      .includes(
        'Title:Date:Offertype:fooddrinkfruitsaladtodayMondayTuesdayWednesdayThursdayFridaySaturdaySundayDescription'
      )
  ).toBeTruthy();
});
