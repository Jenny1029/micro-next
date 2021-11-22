import React from 'react';
import ReactDOM from 'react-dom';
import MicroApp from './MicroApp';
import reportWebVitals from './reportWebVitals';
import { registerMicroApps, start } from 'qiankun';
import microAppList from './microAppList';
import './micro.css';

ReactDOM.render(
  <React.StrictMode>
    <MicroApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

registerMicroApps(microAppList);
start();
