import React from 'react';
import { Link, Redirect } from 'react-router-dom';

interface Props {
  isLoggedIn: boolean;
  title: string;
  logoutRedirectUrl: string;
  logout: () => void
}

class Header extends React.Component<Props> {

render() {
  const { isLoggedIn, title, logout, logoutRedirectUrl} = this.props;
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
            <Redirect to={
              (logoutRedirectUrl === "/login" || logoutRedirectUrl === "/signup") ? logoutRedirectUrl  : "/login"
             } />
          }
        </div>
    );
  }
}

export default Header;