import { useState, createContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import Auth from '../components/Auth';

import ScrollToTop from './ScrollToTop';
import useMedia from 'use-media';
import './App.css';

export const iPhoneContext = createContext();
const App = () => {
  const isWide = useMedia({ minWidth: '900px' });
  const [iPhone, setiPhone] = useState(isWide);
  return (
    <div className="App">
      <BrowserRouter>
        <iPhoneContext.Provider value={iPhone}>
          <ScrollToTop />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/auth" component={Auth} />
        </iPhoneContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
