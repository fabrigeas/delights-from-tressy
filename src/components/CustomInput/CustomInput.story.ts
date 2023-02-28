import CustomInput from './CustomInput.vue';

export default {
  title: 'Components/CustomInput',
  component: CustomInput,
  argTypes: {
    label: {
      options: ['Email:', 'Password', undefined],
    },
    isValid: {
      options: [true, false, null, undefined],
    },
    validFeedback: {
      options: ['looks good', 'nice', 'well done'],
    },
    invalidFeedback: {
      options: ['this field is required', 'please fill this!'],
    },
    required: {
      options: [true, false],
    },
  },
};

const Template = args => ({
  components: { CustomInput },
  setup() {
    return { args };
  },
  template: '<custom-input v-bind="args" >Hello</custom-input>',
});

export const Default = Template.bind({});
Default.args = {};

export const Label = Template.bind({});
Label.args = {
  label: 'Email:',
};

export const Valid = Template.bind({});
Valid.args = {
  validFeedback: 'Looks good',
  isValid: true,
};

export const Invalid = Template.bind({});

Invalid.args = {
  invalidFeedback: 'Please fill this',
  isValid: false,
};
