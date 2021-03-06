import 'babel-polyfill';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// use HashRouter to host in GitHub pages. 
// BrowserRouter are not supported here

const useHash = process.env.REACT_APP_ROUTER_TYPE === "hash";
const Router = useHash ? HashRouter : BrowserRouter;

ReactDOM.render(
  <Router basename={`${process.env.PUBLIC_URL}/`}>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
