import './App.scss';
import { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from './components/Auth';
import HomePage from './components/HomePage';
import Calender from './components/Calender';
import Birthdaylist from './components/BirthdayList';
import Nav from './components/Nav';

import firebase from 'firebase';
import useMedia from 'use-media';
import ScrollToTop from './layout/ScrollToTop';
import { auth } from './firebase';
import { thisYear } from './util/form';
import Form from './components/Form';

// context
export const iPhoneContext = createContext();
export const CalenderContext = createContext();
export const UserContext = createContext();

const App = () => {
  const isWide = useMedia({ minWidth: '900px' });
  const [iPhone, setiPhone] = useState(isWide);
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState();
  const [calenderData, setCalenderData] = useState([]);
  const { currentUser } = firebase.auth();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // userがログインしていたらuser情報が、していなければnullが入る
      setUser(user);
    });
  }, []);
  useEffect(() => {
    setiPhone(isWide);
    let unsubscribe = () => {};
    if (currentUser) {
      const db = firebase.firestore();
      db.collection(`users/${currentUser.uid}/birth`).onSnapshot(
        (querySnapshot) => {
          const fetchdata = [];
          querySnapshot.forEach((doc) => {
            fetchdata.push([doc.id, doc.data().data]);
          });

          // userdata ---------------------------------
          const getdata = fetchdata.map((value) => {
            return {
              id: value[0],
              title: `${value[1].name}`,
              date: `${thisYear}-${value[1].month}-${value[1].day}`,
              year: `${value[1].year}`,
              month: `${value[1].month}`,
              day: `${value[1].day}`,
              color: `${value[1].color}`,
              textColor: `${value[1].textColor}`,
              memo: `${value[1].memo}`,
            };
          });
          setUsers(getdata);
          console.log(getdata);
          // ------------------------------------------
          // calendar用データ 今年と来年の表示
          const calenderdata = fetchdata.map((value) => {
            return [
              {
                id: value[0],
                title: `${value[1].name}`,
                date: `${thisYear}-${value[1].month}-${value[1].day}`,
                year: `${value[1].year - 1}`,
                month: `${value[1].month}`,
                day: `${value[1].day}`,
                color: `${value[1].color}`,
                textColor: `${value[1].textColor}`,
                memo: `${value[1].memo}`,
              },
              {
                id: `${value[0]}x`,
                title: `${value[1].name}`,
                date: `${thisYear + 1}-${value[1].month}-${value[1].day}`,
                year: `${value[1].year - 2}`,
                month: `${value[1].month}`,
                day: `${value[1].day}`,
                color: `${value[1].color}`,
                textColor: `${value[1].textColor}`,
                memo: `${value[1].memo}`,
              },
            ];
          });
          // [],{}を使いやすく変える処理
          const opendata = [];
          calenderdata.forEach((doc) => {
            opendata.push(...doc);
          });
          setCalenderData(opendata);
          // -------------------------------------------
          console.log(calenderdata);
        }
      );
      return unsubscribe();
    }
  }, [currentUser, isWide]);

  return (
    <div className="App">
      <CalenderContext.Provider value={calenderData}>
        <UserContext.Provider value={users}>
          <iPhoneContext.Provider value={iPhone}>
            <BrowserRouter>
              <ScrollToTop />
              <Route exact path="/" component={HomePage} />
              <Route exact path="/auth" component={Auth} />
              <Route exact path="/birthdaylist" component={Birthdaylist} />
              <Route exact path="/form" component={Form} />
              <Route exact path="/calender" component={Calender} />
              <Route exact path="/nav" component={Nav} />
            </BrowserRouter>
          </iPhoneContext.Provider>
        </UserContext.Provider>
      </CalenderContext.Provider>
    </div>
  );
};

export default App;
