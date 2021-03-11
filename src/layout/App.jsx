import { useState, createContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import Auth from '../components/Auth';

import ScrollToTop from './ScrollToTop';
import useMedia from 'use-media';
import './App.css';
import Birthdaylist from '../components/BirthdayList';
import { useEffect } from 'react';

export const iPhoneContext = createContext();
const App = () => {
  const isWide = useMedia({ minWidth: '900px' });
  const [iPhone, setiPhone] = useState(isWide);

  useEffect(() => {
    setiPhone(isWide);
  }, [isWide]);
  return (
    <div className="App">
      <BrowserRouter>
        <iPhoneContext.Provider value={iPhone}>
          <ScrollToTop />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/birthdaylist" component={Birthdaylist} />
        </iPhoneContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
