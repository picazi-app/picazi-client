import { createStore, compose, applyMiddleware } from 'redux';
import { UserSession } from "./types";
import { defaultRegistrationFormProps } from "../screens/Register/store/reducer";
import { defaultPostListScreenProps } from "../screens/PostList/store/reducer";
import { defaultPostInfoScreenProps } from "../screens/Post/store/reducer";
import { defaultUserSessionProps } from './reducers';
import { history } from "../helpers/history";

import rootReducer from './reducers';
// react-router has its own Redux middleware, so we'll use this
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { StateProps } from './types'
import { createBrowserHistory } from 'history';


export function configureDefaultState() {
  // create an object with default data
  const defaultState = {
    registration_screen: defaultRegistrationFormProps,
    postList_screen: defaultPostListScreenProps,
    postInfo_screen: defaultPostInfoScreenProps,
    user_session: defaultUserSessionProps
  } as StateProps;

  return defaultState;
}

export function configureStore(defaultState: StateProps) {
  
  // const history = createBrowserHistory();
  // const middleware = routerMiddleware(history)

  const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  // const store = createStore(rootReducer, defaultState, enhancers);
  const store = createStore(rootReducer, defaultState, composeEnhancers(applyMiddleware(thunk)));
  return store;
}