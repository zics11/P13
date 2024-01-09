import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; // Assurez-vous que le chemin d'accès est correct

import Index from './scenes/index/Index';
import SignIn from './scenes/signin/SignIn';
import User from './scenes/user/User';
import Error from './scenes/error/Error';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/index" element={<Index />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/user" element={<User />}></Route>
          {/* Vous pouvez ajouter une route par défaut pour gérer les chemins non reconnus */}
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
