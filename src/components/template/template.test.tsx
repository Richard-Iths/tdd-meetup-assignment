import { render } from '@testing-library/react';
import React from 'react';
import { shallow } from 'enzyme';
import Template from './Template';

describe('Template.tsx', () => {
  describe('Smoke tests', () => {
    it('Should render Template component', () => {
      render(<Template />);
    });
  });
  describe('Black box tests', () => {});

  describe('White box tests', () => {});
});
