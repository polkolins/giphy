import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GifsProvider from "context/gifsProvider";
import ModalProvider from "context/modalProvider";

ReactDOM.render(
  <React.StrictMode>
    <GifsProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </GifsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
