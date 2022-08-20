import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter, HashRouter } from "react-router-dom";
// import { AppProvider } from './components/Context'; 

import {AppStateContextProvider} from './components/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <AppStateContextProvider>
      <App />
 </AppStateContextProvider>
  </BrowserRouter>
);

