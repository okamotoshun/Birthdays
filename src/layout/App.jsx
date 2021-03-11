import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import ScrollToTop from './ScrollToTop';
import HomePage from '../features/HomePage';

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
