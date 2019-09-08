import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter, RouteComponentProps, RouteProps} from 'react-router-dom';
import { getSessionStateProps } from '../store/selector';
import { StateProps } from '../store/types';
import { history } from './history'
// const mapStateToProps = ({ session: { userId }}: StateType) => ({
//   loggedIn: Boolean(userId)
// })
function mapStateToProps(state: StateProps, { location}: RouteComponentProps){
  return {
   isLoggedIn: getSessionStateProps(state).isLoggedIn,
 }
}

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
  isLoggedIn: boolean;
  path: string;
  location: any;
  // exact?: boolean;
}


const Auth =  (props: PrivateRouteProps ) => {
  const { component: Component, isLoggedIn, ...rest} = props;
  console.log(isLoggedIn);
  return (
    <Route
      render={(props) => (
       isLoggedIn ? 
          <Redirect to="/"/>
          : 
          <Component {...props} />
    )}
    />
  )
}

const Protected = (props: PrivateRouteProps) => {
  const { component: Component, isLoggedIn, path, ...rest} = props;
  return (
    <Route
      path={path}
      render={props => (
        isLoggedIn?
          <Component {...props} />
          :
          <Redirect to='/login' />
    )}
  />
  )
}

export const AuthRoute = withRouter(
  connect(mapStateToProps)(Auth)
);

export const ProtectedRoute = withRouter(
  connect(mapStateToProps)(Protected)
);
