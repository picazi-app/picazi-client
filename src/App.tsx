import React from 'react';
import  { render } from 'react-dom';

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
      <Route path="/" component={App}/>
		</BrowserRouter>
	</Provider>
)

// "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"