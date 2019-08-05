import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../../App.css';
// import {isEmailAvailable} from '../../../helpers/api';
import { doesEmailExist } from '../store/actions';
import {register, User} from '../store/actions';
import { 
  validateName,
  validateUsername,
  validatePassword,
  comparePasswords,
  validateForm,
  validateEmail,
} from '../helpers/formValidations';
import { UserFieldInfo, FormErrors, RegistrationFormProps } from "../store/types"; 
import { StateProps } from '../../../store/types';
//import selectors
import { getRegistrationStateProps } from '../store/selectors'
import { async } from 'q';

type StateType = RegistrationFormProps;

interface Props {
  register: (user: User) => any;
  formErrors: FormErrors;
  success: string;
  doesEmailExist: (email: string) => void,
  emailExists: boolean
}

class RegisterPage extends React.Component<Props, StateType> {
    constructor(props: Props) {
        super(props);

        this.state = {
          user: {
            firstName: '',
            username: '',
            password: '',
            confirmPass: '',
            email: '',
          },
          // formErrors: props.formErrors,
          formErrors: {},
          isNewUser: true,
          submitted: false,
          emailExists: false,
          status:{
            success: props.success,
            failure: ''
          }
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

    handleFirstName = (event: any) => {
      //get firstName from the state;
      const { firstName } = this.state.user;
      //get errors object from the state;
      const { formErrors } = this.state;
      console.log(formErrors)
      //Run validations to see if firstName has atleast 2 chars.
      const nameError = validateName(firstName);
      console.log(nameError)
      if (nameError) {
        this.setState({
          formErrors: {
            ...formErrors,
            firstName: nameError
          }
        });
      } else {
        delete formErrors.firstName;
        this.setState({
          formErrors: formErrors,
        })
        // this.setState({
        //   formErrors: {
        //     ...formErrors,
        //     firstName: ''
        //   }
        // })
      } 
    }

    handlePassword = () => {
      const { password, confirmPass } = this.state.user;
      const { formErrors } = this.state;

      const passError = validatePassword(password)
      if (passError) {
        this.setState({
          formErrors: {
            ...formErrors,
            password: passError
          }
        });
      } else {
        delete formErrors.password;
        this.setState({
          formErrors: formErrors
        })
        // this.setState({
        //   formErrors: {
        //     ...formErrors,
        //     password: ''
        //   }
        // })
      } 
    }
    handleComparePassword = () => {
      const { password, confirmPass } = this.state.user;
      const { formErrors } = this.state;
      
      const confirmPassError = comparePasswords(password, confirmPass)
      if (confirmPassError) {
        this.setState({
          formErrors: {
            ...formErrors,
            confirmPassword: confirmPassError
          }
        });
      } else {
        delete formErrors.confirmPassword;
        this.setState({
          formErrors: formErrors
        })
      } 
    }

    handleUsername= () => {
      const { username } = this.state.user;
      const { formErrors } = this.state;
      const usernameError = validateUsername(username)
      if (usernameError) {
        this.setState({
          formErrors: {
            ...formErrors,
            username: usernameError
          }
        });
      } else {
        delete formErrors.username;
        this.setState({
          formErrors: formErrors
        })
      } 
    }

    handleEmail = async() => {
      // const email = event.target.value;
      const { formErrors } = this.state;
      const { email } = this.state.user;

      const emailError = validateEmail(email);
      if (emailError) {
        this.setState({
          formErrors: {
            ...formErrors,
            email: emailError
          }
        });
      } else{
            await this.props.doesEmailExist(email);
            console.log("this.props.emailExists", this.props.emailExists)
            if(this.props.emailExists) {
              this.setState({
                formErrors: {
                  ...formErrors,
                  email: "This email is already taken. Please enter another email"
                }
              });
            }
            else{
              delete formErrors.email;
              this.setState({
                formErrors: formErrors
              });
            }
      }
    }

    handleSubmit = (event: any)  => {

      const { user, isNewUser } = this.state;
      const { emailExists } = this.props;
      console.log("val....................", this.props.emailExists)
      const errors = validateForm(user);
      
      if((Object.entries(errors).length === 0 && errors.constructor === Object) && emailExists === false) {
        this.props.register({
          firstName: user.firstName,
          username: user.username,
          password: user.password,
          email: user.email
        });
        this.setState({
          submitted: true,
        }, () => this.clear())
      }
      else {
        this.setState({
          // formErrors: errors,
          formErrors: {
            ...errors,
            email: "This email is already registered with another account."}
        });
      }
    }

    clear = () => {
      this.setState({
        user: {
          firstName: '',
          username: '',
          email: '',
          password: '',
          confirmPass: ''
        },
        formErrors: {},
      })
    }

  render() {
      const { user, formErrors } = this.state;
      console.log("this.state.formErrors", this.state.formErrors)
        return (
            <div>
                <h2 style={{textAlign: "center"}}>New User? Register here!</h2>
                <div className="center-form">
                  <h3 style={{color: "green"}}> 
                  {
                    this.props.success 
                    ? 
                    "Registration is successful."
                    : null 
                  }
                  </h3>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input  
                        className="form-control" 
                        type="text" 
                        name="firstName" 
                        value={user.firstName} 
                        onBlur={this.handleFirstName}
                        onChange={this.handleChange}>
                    </input>
                    <div> {formErrors ? formErrors.firstName : null} </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input  
                        className="form-control"
                        type="text" 
                        name="username" 
                        value={user.username} 
                        onBlur={this.handleUsername}
                        onChange={this.handleChange}>
                    </input>
                    <div> {formErrors ? formErrors.username : null} </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input  
                        className="form-control" 
                        type="email" 
                        name="email" 
                        value={user.email} 
                        onBlur={this.handleEmail}
                        onChange={this.handleChange}>
                    </input>
                    <div> {formErrors ? formErrors.email : null} </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input  
                        className="form-control"
                        type="password" 
                        name="password" 
                        value={user.password} 
                        onBlur={this.handlePassword}
                        onChange={this.handleChange}>
                    </input>
                    <div> {formErrors ? formErrors.password : null} </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPass">Confirm password</label>
                    <input  
                        className="form-control"
                        type="password" 
                        name="confirmPass" 
                        value={user.confirmPass}
                        onBlur={this.handlePassword} 
                        onChange={this.handleChange}>
                    </input>
                    <div> {formErrors ? formErrors.confirmPassword : null} </div>
                  </div>
                  <div className="form-group">
                      <button className="btn btn-primary"  onClick={this.handleSubmit}>Register</button>
                      <Link to="/login" className="btn btn-link">Cancel</Link> 
                  </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state: StateProps){
  console.log(getRegistrationStateProps(state))
  // console.log({...state})
   return {
    success: getRegistrationStateProps(state).status.success,
    emailExists: getRegistrationStateProps(state).emailExists
  }
}
export default connect(mapStateToProps, {
  register: register,
  doesEmailExist: doesEmailExist
})(RegisterPage);