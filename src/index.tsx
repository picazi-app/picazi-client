import React from 'react';
import  { render } from 'react-dom';
import './static/css/index.css';
import App from './App';
import { history } from "./helpers/history";
import { Provider } from 'react-redux'; // to connect react with redux
import { configureStore, configureDefaultState} from './store/index';
import {
  Router,
  Route,
} from "react-router-dom";

const defaultState = configureDefaultState();
const store = configureStore(defaultState);
const router = (
  <Provider store={store}>
    <Router history={history}>
        <Route component={App}/>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));
