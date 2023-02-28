import { mount } from '@vue/test-utils';
import OfferDetail from './EditOfferPage.vue';
import { it, expect } from 'vitest';

const $route = {
  params: {
    id: '12344',
  },
};

it('renders', async () => {
  const wrapper = mount(OfferDetail, {
    global: {
      mocks: {
        $route,
      },
    },
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
