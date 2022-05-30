import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainContainer from "./containers/main";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainContainer />
  </React.StrictMode>
);

