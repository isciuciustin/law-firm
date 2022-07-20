import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Main from './components/Main';
import Premium  from './components/Premium';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Row } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/user/:email" element={<Main />} />
      <Route path="/user/:email/premium" element= {<Premium />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
