import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { fireBaseContext } from './store/fireBaseContext';
import firebase from './firebase/config';
import { UserProvider } from './store/UserContext';

ReactDOM.render(
  <fireBaseContext.Provider value={{ firebase }}>
    <UserProvider>
    <App />
    </UserProvider>
  </fireBaseContext.Provider>,
  document.getElementById('root')
);
