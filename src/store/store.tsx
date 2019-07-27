import { createStore, compose, applyMiddleware, Store} from 'redux';
import { Post } from './types/posts'
import { Comment, UserComments } from './types/comments'
import {createBrowserHistory} from 'history'
// import { syncHistoryWithStore } from 'react-router-redux'; //sync react-router with redux
//to connect react-router with redux
// import { browserHistory } from 'react-router';

//import the root Reducer
import rootReducer from '../reducer/index';
//import the default data
import comments from '../data/comments';
import posts from '../data/posts';
import { interfaces } from 'mocha';
// react-router has its own Redux middleware, so we'll use this
import { routerMiddleware } from 'react-router-redux'
import { History } from 'history'
// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it
import { composeWithDevTools } from 'redux-devtools-extension'


// create an object with default data
const defaultState = {
	posts: posts,
	comments: comments
}

// Create a history of your choosing (we're using a browser history in this case)
const history1 = createBrowserHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history1)

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const store = createStore(rootReducer, defaultState, enhancers);
const store= createStore(rootReducer, defaultState, composeEnhancers(applyMiddleware(middleware)));

//we'll use the history in reduxstagram file
// export const history = syncHistoryWithStore(browserHistory, store1);

export default store;


























//const enhancers = compose(
  //   // window.devToolsExtension? window.devToolsExtension() : fu => fu
  //   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  // );

// export interface ApplicationState {
//   posts: Post[];
//   comments: UserComments;
// }
// export default function configureStore(
//   history: History,
//   initialState: ApplicationState
// ): Store<ApplicationState> {
//   // create the composing function for our middlewares
//   const composeEnhancers = composeWithDevTools({})

//   // We'll create our store with the combined reducers and the initial Redux state that
//   // we'll be passing from our entry point.
//   return createStore(
//     rootReducer,
//     initialState,
//     composeEnhancers(applyMiddleware(routerMiddleware(history)))
//   )
// }
// declare global {
//   interface Window {
//       // devToolsExtension: any;
//       __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }
