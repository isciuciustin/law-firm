import Error from './components/Error';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Main from './components/Main';
import Premium  from './components/Premium';
import Article from './components/Article';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Row } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={<Error />} />
      <Route path="/user/:email" element={<Main />} />
      <Route path="/user/:email/premium" element= {<Premium />} />
      <Route path="/user/:email/premium/:id" element={<Article />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
