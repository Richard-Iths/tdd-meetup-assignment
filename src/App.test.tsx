import { render } from '@testing-library/react';
import App from './App';
import React from 'react';
import { mount } from 'enzyme';
import LandingPage from './pages/Landing/Landing';
import Header from './components/app/header/Header';
import { RecoilRoot } from 'recoil';

describe('App.tsx', () => {
  describe('Smoke tests', () => {
    it('Should render landing page', () => {
      render(
        <RecoilRoot>
          <App />
        </RecoilRoot>
      );
    });
    it('should render landing page', () => {
      const wrapper = mount(
        <RecoilRoot>
          <App />
        </RecoilRoot>
      );
      const landingPage = wrapper.find(LandingPage);
      expect(landingPage.exists()).toBe(true);
    });
    it('should render header component', () => {
      const wrapper = mount(
        <RecoilRoot>
          <App />
        </RecoilRoot>
      );
      const header = wrapper.find(Header);
      expect(header.exists()).toBe(true);
    });
  });
});
