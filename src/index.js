import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


//LA FONCTION ReactDOM.render() prend en premier argument notre JSX construit et en second là ou on va l'implementer(id = root)

//EXEMPLE ReactDOM.render(JSX , document.getElementById("toto")) --> injecte le JSX dans toto

//REACT.STRICTMODE est une constante importer de React pour travailler en mode use strict  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
