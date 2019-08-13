import React from 'react';
import  { render } from 'react-dom';
import './static/css/index.css';
//import components
import App from './App';
import { history } from "./helpers/history";
import { Provider } from 'react-redux'; // to connect react with redux
import { configureStore, configureDefaultState} from './store/index';
import {fetchUserSession} from './helpers/api'
import {
  BrowserRouter,
  Router,
  Route,
  Switch,
} from "react-router-dom";


// const renderApp = (preloadedState: any) => {
//   const defaultState = configureDefaultState(preloadedState);
//   console.log(defaultState)
//   const store = configureStore(defaultState);
//   // window.state = store.getState;

//   render(
//     <Provider store={store}>
//       <Router history={history}>
//           <Route path="/" component={App}/>
//       </Router>
//     </Provider>,
//     document.getElementById("root")
//   );
// };
  const defaultState = configureDefaultState();
  const store = configureStore(defaultState);
   
  const router = (
    <Provider store={store}>
      <Router history={history}>
          <Route path="/" component={App}/>
      </Router>
    </Provider>
  );

  render(router, document.getElementById('root'));

// (async () => renderApp(await checkLoggedIn()))();

//(async() => renderApp(await fetchUserSession()))();
