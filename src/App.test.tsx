import { render } from '@testing-library/react';
import App from './App';
import React from 'react';

describe('Landing.tsx', () => {
  describe('Smoke tests', () => {
    it('Should render landing page', () => {
      render(<App />);
    });
  });
});
