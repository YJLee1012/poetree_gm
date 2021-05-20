import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';


import {BrowserRouter} from 'react-router-dom';

// redux 셋팅
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';

const store= createStore(reducers, compose(applyMiddleware(thunk)));


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* Provider로 감싸진 애들은 모두 같은 state를 공유 */}
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
