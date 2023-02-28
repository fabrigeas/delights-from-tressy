import OfferCard from './OfferCard.vue';
import { fakeOffer, fakeCartItem } from '../../fake';

export default {
  component: OfferCard,
  argTypes: {
    data: {
      control: { type: 'select' },
      options: {
        offer: fakeOffer(),
        cartItem: fakeCartItem(),
      },
    },
  },
};

const Template = args => ({
  components: { OfferCard },
  setup() {
    return { args };
  },
  template: '<OfferCard v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  data: fakeOffer(),
};

// export const CartItem = Template.bind({});
// CartItem.args = { data: fakeCartItem() };
