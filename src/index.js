import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

import createSagaMiddleware from 'redux-saga';

// const sagas = createSagaMiddleware();
const middlewares = [createLogger()];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

// sagas.run();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
