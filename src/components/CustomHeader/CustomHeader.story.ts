import Header from './CustomHeader.vue';

export default {
  title: 'Components/Header',
  component: Header,
};

const Template = () => ({
  components: { Header },
  template: '<Header />',
});

export const Primary = Template.bind({});
