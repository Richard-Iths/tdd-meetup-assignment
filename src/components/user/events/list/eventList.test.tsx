import { render } from '@testing-library/react';
import React from 'react';
import { shallow } from 'enzyme';
import EventList from './EventList';

describe('EventList.tsx', () => {
  describe('Smoke tests', () => {
    it('should render Template component', () => {
      render(<EventList />);
    });
  });
  describe('Black box tests', () => {
    it('should have a List Component');
  });

  describe('White box tests', () => {});
});
