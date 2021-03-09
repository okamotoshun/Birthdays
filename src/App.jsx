import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './page/HomePage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Route exact path="/" component={HomePage} />
      </BrowserRouter>
    </div>
  );
};

export default App;
