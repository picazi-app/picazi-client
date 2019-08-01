import { createStore, compose, applyMiddleware } from 'redux';
import { defaultRegistrationFormProps } from "../screens/Register/store/reducer";
import { defaultPostListScreenProps } from "../screens/PostList/store/reducer";
import { defaultPostInfoScreenProps } from "../screens/Post/store/reducer";

import {createBrowserHistory} from 'history'
import rootReducer from './reducers';
// react-router has its own Redux middleware, so we'll use this
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

// create an object with default data
const defaultState = {
  registration_screen: defaultRegistrationFormProps,
	postList_screen: defaultPostListScreenProps,
  postInfo_screen: defaultPostInfoScreenProps,
}

// Create a history of your choosing (we're using a browser history in this case)
const history1 = createBrowserHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history1)

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const store = createStore(rootReducer, defaultState, enhancers);
const store = createStore(rootReducer, defaultState, composeEnhancers(applyMiddleware(middleware, thunk)));

export default store;