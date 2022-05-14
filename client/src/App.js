import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Footer from './components/layouts/Footer';
import MainRoutes from './components/routing/MainRoutes';
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser, logout } from './redux/features/auth/authSlice';
import setAuthToken from './utils/setAuthToken';
import 'react-toastify/dist/ReactToastify.css';
import './sass/styles.scss';

const App = () => {
  useEffect (() => {
    if (localStorage.token) setAuthToken(localStorage.token);
    store.dispatch(loadUser());
    // logout user from all tabs if logged out from one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch(logout());
    });
  }, []);

  return (
    <Provider store={store} >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" component={Landing} />
          <Route component={ MainRoutes } />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer
        position='bottom-left'
        newestOnTop={true}
        autoClose={5000}
        closeOnClick
        pauseOnHover
      />
    </Provider>
  )
};
export default App;