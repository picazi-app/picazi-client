import React from 'react';
import PostInfo from './screens/Post/containers/PostInfo';
import PhotoGrid from './screens/PostList/container/PhotoGrid';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";

import LoginPage from './screens/Login/components/LoginPage'
import RegisterPage from './screens/Register/containers/RegisterPage';
import { getSessionStateProps, getAppErrorsStateProps } from "./store/selector";
import { StateProps } from './store/types';
import { saveUserSession } from './store/action';
import  Header from './components/Header';
import { logout } from './store/action'
import GenericNotFound from './components/GenericNotFound'
interface MatchParams {
  postId: string
}
type OwnProps = RouteComponentProps&RouteProps
interface AppStateProps {
  isLoading: boolean;  
  isLoggedIn: boolean;
  status: number | null;
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
    const { isLoading, isLoggedIn, logout, history, status } = this.props;
    const url = history.location.pathname;
		return(
			<div>
          {
            (isLoading  === false )?
              (status === 404) ?
                <Route component={GenericNotFound}/>
            
              : (
                <>
                  <Header
                    isLoggedIn={isLoggedIn}
                    title="Reduxstagram"
                    logout={logout} 
                    logoutRedirectUrl={url}
                  />
                  <Switch>                     
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/signup" component={() => (<RegisterPage {...this.props} />)} />
                    {/* <Route exact path="/" component={() =>(
                    <PhotoGrid {...this.props}/>
                    )}/> */}
                    <Route exact={true} path="/" component={ PhotoGrid} />
                    <Route exact={true} path="/posts" component={ PhotoGrid} />
                     <Route path="/view/:postId" component={PostInfo}/>     
                      
                  
                  </Switch>
                </> 
              )
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
    isLoggedIn: getSessionStateProps(state).isLoggedIn,
    status: getAppErrorsStateProps(state).status
  }
}

export default connect(mapStateToProps, { 
  saveUserSession: saveUserSession, 
  logout: logout
})(App)

