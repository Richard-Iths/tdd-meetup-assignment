import React from 'react';
import './app.scss';
import Header from './components/app/header/Header';
import LandingPage from './pages/Landing/Landing';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <LandingPage />
      </main>
    </div>
  );
}

export default App;
