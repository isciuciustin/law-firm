import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Discuss from './components/Discuss';
import Main from './components/Main';
import Error from './components/Error';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route  path = "/" element = {<App />} />
      <Route path = "/user/:email" element = {<Main />} />
      <Route path = "/discuss" element = {<Discuss />} />
      <Route  path = "*" element = {<Error />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
