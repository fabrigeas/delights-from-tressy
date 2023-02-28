import { mount } from '@vue/test-utils';
import CustomButton, { type CustomButtonType } from './CustomButton.vue';
import { describe, it, test, expect } from 'vitest';

describe('Default props', () => {
  it('renders default class "primary"', () => {
    const wrapper = mount(CustomButton, {});
    const component = wrapper.get('button');

    expect(component.classes()).toStrictEqual(['CustomButton', 'primary']);
  });

  it.each(['danger', 'primary', 'success', 'warning'] as CustomButtonType[])(
    'renders buttonType "%s"',
    buttonType => {
      const wrapper = mount(CustomButton, {
        props: { buttonType },
      });
      const component = wrapper.get('button');

      expect(component.classes()).toContain(buttonType);
    }
  );

  it.each(['submit', 'button', 'reset'])('renders type "%s"', type => {
    const wrapper = mount(CustomButton, {
      props: { type },
    });

    expect(wrapper.get('button').attributes().type).toBe(type);
  });

  test('passthrough attributes', () => {
    const attrs = {
      id: 'lorem-id',
      title: 'lorem ipsum dolor',
    };

    const wrapper = mount(CustomButton, {
      attrs,
    });

    expect(wrapper.attributes()).contain(attrs);
  });
});
