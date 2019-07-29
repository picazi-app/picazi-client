import React from 'react';
import  { render } from 'react-dom';
import LoginPage from './components/LoginPage'
import RegisterPage from './components/SignUpPage';
// import css


//import components
import App from './components/AppComponent';

import { Provider } from 'react-redux'; // to connect react with redux
import store from './store/store';
import {
  BrowserRouter,
  Route,
} from "react-router-dom";

export const router = (
	<Provider store={store}>
		<BrowserRouter>
      <Route exact path="/" component={App}/>
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={RegisterPage} />
		</BrowserRouter>
	</Provider>
)

// "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"