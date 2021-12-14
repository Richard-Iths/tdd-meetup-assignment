import { render } from '@testing-library/react';
import LandingPage from './Landing';
import React from 'react';

describe('Landing.tsx', () => {
  describe('Smoke tests', () => {
    it('Should render landing page', () => {
      render(<LandingPage />);
    });
  });
});
