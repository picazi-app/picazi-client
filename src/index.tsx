import React from 'react';
import  { render } from 'react-dom';
import './static/css/index.css';

//import components
import App from './App';

import { Provider } from 'react-redux'; // to connect react with redux
import store from './store/index';
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";


const router = (
	<Provider store={store}>
	  <BrowserRouter>
			<Switch>
				<Route path="/" component={App}/>
			</Switch>
	  </BrowserRouter>
	</Provider>
)


render(router, document.getElementById('root'));
