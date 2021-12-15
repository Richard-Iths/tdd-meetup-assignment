import { render } from '@testing-library/react';
import React from 'react';
import { mount, shallow } from 'enzyme';
import UserSettings from './UserSettings';

describe('UserSettings.tsx', () => {
  describe('Smoke tests', () => {
    it('Should render UserSettings component', () => {
      render(<UserSettings />);
    });
  });

  describe('Black box tests', () => {});
});
