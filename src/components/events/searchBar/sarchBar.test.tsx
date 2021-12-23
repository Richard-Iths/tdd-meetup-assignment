import { render } from '@testing-library/react';
import React from 'react';
import { mount, shallow } from 'enzyme';
import SearchBar, { Props } from './SearchBar';

afterAll(() => {
  jest.clearAllMocks();
});

describe('SearchBar.tsx', () => {
  const props: Props = {
    onChangeHandler: jest.fn(),
    placeholder: 'my search bar',
  };
  describe('Smoke tests', () => {
    it('Should render SearchBar component', () => {
      render(<SearchBar {...props} />);
    });
  });
  describe('Black box tests', () => {
    it('should have an input for search text', () => {
      const wrapper = mount(<SearchBar {...props} />);
      const searchBarInput = wrapper.find('[data-test="input-searchBar"]');
      expect(searchBarInput.exists()).toBe(true);
    });
    it('should run onChangeHandler function when typing in search input', () => {
      const wrapper = mount(<SearchBar {...props} />);
      const searchBarInput = wrapper.find('[data-test="input-searchBar"]');
      expect(props.onChangeHandler).toHaveBeenCalledTimes(0);
      searchBarInput.simulate('change');
      expect(props.onChangeHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('White box tests', () => {
    it('should have props for placeholder and a handler function to receive search text', () => {
      const wrapper = mount(<SearchBar {...props} />);
      expect(wrapper.props()).toStrictEqual({ ...props });
    });
  });
});
