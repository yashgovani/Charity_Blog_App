import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import loginReducer from './store/reducer/login';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  loginReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

/* const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
) */

ReactDOM.render(app, document.getElementById('root'));
