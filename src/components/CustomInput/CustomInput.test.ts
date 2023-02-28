import { mount } from '@vue/test-utils';
import CustomInput from './CustomInput.vue';
import { describe, it, test, expect } from 'vitest';

describe('Default props', () => {
  it('renders', () => {
    const wrapper = mount(CustomInput, {});

    expect(wrapper.find('.custom-input').exists()).toBe(true);
    expect(wrapper.find('input.form-control').exists()).toBe(true);
  });

  test.each([undefined, 'Email'])('has lebel: %s', label => {
    const wrapper = mount(CustomInput, {
      props: {
        label,
      },
    });

    const dom = wrapper.find('label');

    if (label) {
      expect(dom.exists()).toBe(true);
      expect(dom.text()).toBe(label);
    } else {
      expect(dom.exists()).toBe(false);
    }
  });

  test.each([
    { validFeedback: undefined, isValid: false },
    { validFeedback: undefined, isValid: true },
    { validFeedback: 'lorem', isValid: false },
    { validFeedback: 'lorem', isValid: true },
  ])('should render valid-feedback: %s', ({ validFeedback, isValid }) => {
    const wrapper = mount(CustomInput, {
      props: {
        validFeedback,
        isValid,
      },
    });

    const dom = wrapper.find('.valid-feedback');
    const shouldRender = validFeedback && isValid;

    if (shouldRender) {
      expect(dom.exists()).toBe(true);
    } else {
      expect(dom.exists()).toBe(false);
    }
  });

  test.each([
    { invalidFeedback: undefined, isValid: false },
    { invalidFeedback: undefined, isValid: true },
    { invalidFeedback: 'lorem', isValid: false },
    { invalidFeedback: 'lorem', isValid: true },
  ])('should render invalid-feedback: %s', ({ invalidFeedback, isValid }) => {
    const wrapper = mount(CustomInput, {
      props: {
        invalidFeedback,
        isValid,
      },
    });

    const dom = wrapper.find('.invalid-feedback');
    const shouldRender = invalidFeedback && !isValid;

    if (shouldRender) {
      expect(dom.exists()).toBe(true);
    } else {
      expect(dom.exists()).toBe(false);
    }
  });

  test.each([
    { id: 'lorem-id' },
    { title: 'lorem ipsum dolor' },
    { name: 'lorem' },
    { data: 'test-hello' },
  ])('attribiutes passthrough %s', attrs => {
    const wrapper = mount(CustomInput, {
      attrs,
    });

    expect(wrapper.find('input').attributes()).contain(attrs);
  });
});
