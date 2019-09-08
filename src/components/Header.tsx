import React from 'react';
import { Link, withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface Props {
  isLoggedIn: boolean;
  title: string;
  logout: () => void
}

class Header extends React.Component<Props> {

render() {
  const { isLoggedIn, title, logout} = this.props;
    return (
        <div>
          <h1>
            <Link to="/">{title}</Link>
          </h1>
          {
            isLoggedIn 
            ? 
            <button style={{ 
              "display": 'block', 
              "margin": "20px auto", 
              "padding": "5px 20px"
              }}
              onClick={logout}
            >
              Logout
            </button>
            :
            <Redirect to='/login' />
          }
        </div>
    );
  }
}

export default Header;