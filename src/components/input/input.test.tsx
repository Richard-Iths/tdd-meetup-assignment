import { render } from '@testing-library/react';
import React from 'react';
import { shallow } from 'enzyme';
import Input, { Props } from './Input';

describe('Input.tsx', () => {
  const onChangeHandler = jest.fn();
  const props: Props = {
    inputName: 'username',
    inputType: 'text',
    onChangeHandler,
    label: 'Username',
    placeholder: 'write username here',
  };
  describe('Smoke tests', () => {
    it('Should render UserLogin component', () => {
      render(<Input {...props} />);
    });
  });
  describe('Black box tests', () => {
    it('Should have props to create different input elements', () => {
      const input1 = shallow(<Input {...props} />);
      const input2 = shallow(<Input {...props} inputType="password" inputName="password" />);

      const userNameInput = input1.find('[data-test="input-username"]');
      const passwordInput = input2.find('[data-test="input-password"]');

      expect(userNameInput.prop('type')).toBe('text');
      expect(passwordInput.prop('type')).toBe('password');
    });
  });

  describe('White box tests', () => {
    it('should emit on change value for input', () => {
      const wrapper = shallow(<Input {...props} />);
      expect(onChangeHandler).toHaveBeenCalledTimes(0);
      const userNameInput = wrapper.find('[data-test="input-username"]');
      userNameInput.simulate('change');
      expect(onChangeHandler).toHaveBeenCalledTimes(1);
    });
    it('should render a optional label from prop', () => {
      const wrapper = shallow(<Input {...props} />);
      const label = wrapper.find('[data-test="label-username"]');
      expect(label.exists()).toBe(true);
    });
    it('should have an optional prop for number step', () => {
      const wrapper = shallow(<Input {...props} inputType={'number'} step={2} />);
      const userNameInput = wrapper.find('[data-test="input-username"]');
      expect(userNameInput.prop('step')).toBe(2);
    });
    it('should have an optional prop for default value', () => {
      const wrapper = shallow(<Input {...props} inputType={'number'} step={2} value="hello" />);
      const userNameInput = wrapper.find('[data-test="input-username"]');
      expect(userNameInput.prop('defaultValue')).toBe('hello');
    });
  });
});
