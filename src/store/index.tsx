import { createStore, compose, applyMiddleware } from 'redux';
import { defaultRegistrationFormProps } from "../screens/Register/store/reducer";
import { defaultPostListScreenProps } from "../screens/PostList/store/reducer";
import { defaultPostInfoScreenProps } from "../screens/Post/store/reducer";
import { defaultUserSessionProps } from './reducers';

import rootReducer from './reducers';
import thunk from 'redux-thunk'
import { StateProps } from './types'


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
  const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const store = createStore(rootReducer, defaultState, composeEnhancers(applyMiddleware(thunk)));
  return store;
}