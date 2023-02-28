import ListView from './ListView.vue';
import { fakeOfferList } from '../../fake';

export default {
  component: ListView,
  argTypes: {
    items: {
      control: { type: 'select' },
      options: {
        '3 - items': fakeOfferList(2),
        '5 - items': fakeOfferList(5),
        '6 - items': fakeOfferList(6),
        '8 - items': fakeOfferList(8),
        '9 - items': fakeOfferList(9),
      },
    },
  },
};

const Template = args => ({
  components: { ListView },
  setup() {
    return { args };
  },
  template: '<ListView v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  items: fakeOfferList(6),
};

// export const Paginated = Template.bind({});
// Paginated.args = { items: fakeOfferList(6) };
