import { render } from '@testing-library/react';
import React from 'react';
import { shallow } from 'enzyme';
import ListItem from './ListItem';

describe('ListItem.tsx', () => {
  describe('Smoke tests', () => {
    it('should render ListItem component', () => {
      render(<ListItem />);
    });
  });
  describe('Black box tests', () => {});

  describe('White box tests', () => {});
});
