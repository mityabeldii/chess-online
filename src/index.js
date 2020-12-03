/*eslint-disable*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase'

import config from './constants/config'

firebase.initializeApp(config);
var db = firebase.firestore();

var swapArrayElements = function (arr, indexA, indexB) {
  var temp = arr[indexA];
  if (indexA > -1 && indexB > -1 && indexB < arr.length) {
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
  }
  return temp
};

window.createId = () => Math.random().toString(36).substring(3).split(``).map(i => i[Math.random() > 0.5 ? `toLowerCase` : `toUpperCase`]()).join(``)

Array.prototype.swap = function (indexA, indexB) {
  swapArrayElements(this, indexA, indexB);
  return this
};

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
  return this
};

Array.prototype.remove = function (index) {
  if (index > -1) {
    this.splice(index, 1);
  }
  return this
};

Array.prototype.get = function (key) {
  return this.filter(i => i.id === key)[0]
};

Array.prototype.crossing = function (anotherArray) {
  return [...this, ...anotherArray].some((i) => this.indexOf(i) > -1 && anotherArray.indexOf(i) > -1)
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

/*eslint-enable*/