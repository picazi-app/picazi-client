import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../../App.css';
import {isEmailAvailable} from '../../../helpers/api';
import {register, User} from '../store/actions';

interface StateType {
  user: {
    firstName: string,
    username: string,
    password: string,
    confirmPass: string,
    email: string,   
  },
  isNewUser: boolean
  submitted: boolean,
  statusText: string
}

interface ActionProps {
  register: (user: User) => any,
}

export type Props = ActionProps;

class RegisterPage extends React.Component<Props, StateType> {
    constructor(props: any) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                username: '',
                password: '',
                confirmPass: '',
                email: '',
            },
            isNewUser: true,
            statusText: '',
            submitted: false,
        };
    }

    handleChange = (event: any) => {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    isEmailAvailable = (event: any) => {
      let email = event.target.value;
      console.log("email is", email)
      isEmailAvailable(email).then((response: any) => {
        if(response.data.emailExist === true) {
          this.setState({
            isNewUser: false,
            statusText: "This email has already been taken"
          })
        }else {
          this.setState({
            isNewUser: true,
            statusText: ''
          })
        }
      });
    }

    validate = () => {
      const { password, confirmPass } = this.state.user;

      if (!this.state.isNewUser) {
        this.setState({
          statusText: 'This email is already registered'
        });
      } else if (password !== confirmPass) {
        this.setState({
          statusText: 'Passwords do not match'
        });
      } 
    }

    handleSubmit = (event: any)  => {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        // if (user.firstName && user.username && user.password && user.email) {
            this.props.register({
              firstName: user.firstName,
              username: user.username,
              password: user.password,
              email: user.email
            });
            console.log("this.props.register({}).............", this.props.register)
        // }

    }

  render() {
      const { user } = this.state;
        return (
            <div>
                <h2 style={{textAlign: "center"}}>New User? Register here!</h2>
                <form className="center-form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input  
                          className="form-control" 
                          type="text" 
                          name="firstName" 
                          value={user.firstName} 
                          onChange={this.handleChange}>
                    </input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input  
                          className="form-control"
                          type="text" 
                          name="username" 
                          value={user.username} 
                          onChange={this.handleChange}>
                    </input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input  
                          className="form-control" 
                          type="email" 
                          name="email" 
                          value={user.email} 
                          onBlur={this.isEmailAvailable}
                          onChange={this.handleChange}>
                    </input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input  
                          className="form-control"
                          type="password" 
                          name="password" 
                          value={user.password} 
                          onChange={this.handleChange}>
                    </input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPass">Confirm password</label>
                    <input  
                          className="form-control"
                          type="password" 
                          name="confirmPass" 
                          value={user.confirmPass} 
                          onChange={this.handleChange}>
                    </input>
                  </div>
                  <div className="form-group">
                        <button className="btn btn-primary"  onClick={this.validate}>Register</button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                  </div>
                </form>
            </div>
        );
    }
}

export default connect(null, {
  register: register
})(RegisterPage);