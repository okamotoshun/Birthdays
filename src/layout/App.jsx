import { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from '../components/Auth';
import './App.css';

import ScrollToTop from './ScrollToTop';
import HomePage from '../components/HomePage';
import useMedia from 'use-media';
import Calender from '../components/Calender';
import Birthdaylist from '../components/BirthdayList';

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
          <Route exact path="/calender" component={Calender} />
        </iPhoneContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
