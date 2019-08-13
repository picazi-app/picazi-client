import React from 'react';
import PostInfo from './screens/Post/containers/PostInfo';
import PhotoGrid from './screens/PostList/container/PhotoGrid';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
  Link,
  RouteComponentProps,
  Router,
  Redirect
} from "react-router-dom";

import LoginPage from './screens/Login/components/LoginPage'
import RegisterPage from './screens/Register/containers/RegisterPage';
import { getSessionStateProps } from "./store/selector";
import { StateProps } from './store/types';
// import { fetchUserProfile } from './screens/UserProfile/store/
import { getUserSession} from './helpers/session';
import { saveUserSession } from './store/action';
import { ProtectedRoute, AuthRoute} from './helpers/routes';
import  Header from './components/Header';
import { logout } from './store/action'
interface MatchParams {
  postId: string
}
type OwnProps = RouteComponentProps

interface AppStateProps {
  isLoading: boolean;  
  isLoggedIn: boolean;
}
interface ActionProps {
  saveUserSession: () => void;
  logout: () => void;
}
type Props = OwnProps & ActionProps & AppStateProps;

class App extends React.Component<Props> {

  componentWillMount() {
    this.props.saveUserSession()
  }
  logout = () => {
    this.props.logout()
  }

	render(){
    const { isLoading, isLoggedIn, logout } = this.props;
		return(
			<div>
          {/* <h1>
            <Link to="/">Reduxstagram</Link>

          </h1>  */}
          <Header isLoggedIn={isLoggedIn} title="Reduxstagram" logout={logout}/>

          {
            (isLoading === false )?
            <Switch> 
              <Route path="/login" component={LoginPage}/>
              <Route path="/signup" component={() => (<RegisterPage {...this.props} />)} />
              <Route path="/view/:postId" component={() => (<PostInfo />)}/>
              {/* <Route exact path="/" component={() =>(
                <PhotoGrid {...this.props}/>
              )}/> */}
              <Route exact={true} path="/" component={ () => <PhotoGrid />} />
            </Switch>

            : 
            <div>loading...loading...loading...loading...loading...loading... </div>

          }
        
            
			</div>
		)
	}
}

function mapStateToProps(state: StateProps, { location}: RouteComponentProps ) : AppStateProps {
  return {
    isLoading: getSessionStateProps(state).isLoading,
    isLoggedIn: getSessionStateProps(state).isLoggedIn
  }
}

export default connect(mapStateToProps, { 
  saveUserSession: saveUserSession, 
  logout: logout
})(App)

