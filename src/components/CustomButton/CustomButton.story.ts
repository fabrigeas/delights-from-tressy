import CustomButton from './CustomButton.vue';

export default {
  title: 'Components/CustomButton',
  component: CustomButton,
  argTypes: {
    buttonType: {
      control: { type: 'select' },
      options: ['primary', 'warning', 'danger', 'success'],
    },
    class: {
      control: { type: 'select' },
      options: ['outlined', 'active'],
    },
  },
};

const Template = args => ({
  components: { CustomButton },
  setup() {
    return { args };
  },
  template: '<custom-button v-bind="args" >Hello</custom-button>',
});

export const Primary = Template.bind({});
Primary.args = {
  buttonType: 'primary',
  class: 'outlined',
};
