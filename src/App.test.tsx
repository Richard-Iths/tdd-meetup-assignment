import { render } from '@testing-library/react';
import App from './App';
import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from './pages/Landing/Landing';
import Header from './components/app/header/Header';

describe('App.tsx', () => {
  describe('Smoke tests', () => {
    it('Should render landing page', () => {
      render(<App />);
    });
    it('should render landing page', () => {
      const wrapper = shallow(<App />);
      const landingPage = wrapper.find(LandingPage);
      expect(landingPage.exists()).toBe(true);
    });
    it('should render header component', () => {
      const wrapper = shallow(<App />);
      const header = wrapper.find(<Header />);
      expect(header.exists()).toBe(true);
    });
  });
});
