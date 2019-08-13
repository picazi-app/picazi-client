import React from 'react';
import '../../../App.css';
import { Link, withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {LoginFormStatus, LoginFormProps, FormErrors, LoginUserFieldInfo} from '../store/types';
import { validateEmail, validatePassword, validateForm } from '../../../helpers/formValidations';
import { StateProps } from '../../../store/types';
import { getSessionStateProps } from '../../../store/selector'
import { login } from '../store/action';
import LoginForm from './LoginForm';
import {getLoginStateProps} from '../store/selectors';

interface DataProps {
  isLoggedIn: boolean;
  failure: string | undefined;
}
interface LoginStateType {
  user: LoginUserFieldInfo;
  formErrors: FormErrors;
}
interface ActionProps {
  login: (user: LoginUserFieldInfo) => void;
}
type Props = DataProps & ActionProps & RouteComponentProps;

class LoginPage extends React.Component<Props, LoginStateType> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      },
      formErrors: {}
    }
  }

    // componentDidUpdate(prevProps: Props) {
    //   const {status, history } = this.props;
    //   if(prevProps.status !== status) {
    //     if(status.success) {
    //       history.push("/");
    //     }
    //   }
    // }
   
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

    handlePassword = () => {
      const { password } = this.state.user;
      const { formErrors } = this.state;
      const passwordError = validatePassword(password);
      if(passwordError) {
        this.setState({
          formErrors: {
            ...formErrors,
            password: passwordError
          }
        })
      }
      else{
        delete formErrors.password;
        this.setState({
          formErrors: formErrors
        })
      }
    }

    handleEmail = () => {
      const { email } = this.state.user;
      const { formErrors } = this.state;
      const emailError = validateEmail(email);
      if(emailError) {
        this.setState({
          formErrors: {
            ...formErrors,
            email: emailError
          }
        })
      }
      else{
        delete formErrors.email;
        this.setState({
          formErrors: formErrors
        })
      }
    }
    handleSubmit = () => {
      const { user } = this.state;
      const { email, password} = this.state.user;
      const { formErrors } = this.state;
      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);
      if(emailError) {
        this.setState({
          formErrors: {
            ...formErrors,
            email: emailError,
          }
        })
      }
      else if(passwordError) {
        this.setState({
          formErrors: {
            ...formErrors,
            password: passwordError,
          }
        })
      }
      else {
        delete formErrors.email;
        delete formErrors.password;
        this.props.login({email, password})
      }
    }
    
    render() {
      const {formErrors } = this.state;
      const { isLoggedIn,failure } = this.props;
      const loginForm = (isLoggedIn === true) 
        ? 
        <Redirect to='/'/> 
        :
        <LoginForm 
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit} 
          formErrors={formErrors} 
          handleEmail={this.handleEmail}
          handlePassword={this.handlePassword}
          failure={failure}
        />
         
        return (
            <div>  
              {loginForm}
            </div>
          //   <LoginForm 
          //   handleChange={this.handleChange} 
          //   handleSubmit={this.handleSubmit} 
          //   formErrors={formErrors} 
          //   handleEmail={this.handleEmail}
          //   handlePassword={this.handlePassword}
          //   failure={failure}
          // />
        );
    }
}

function mapStateToProps(state: StateProps,  { location}: RouteComponentProps){
   return {
    isLoggedIn: getSessionStateProps(state).isLoggedIn,
    failure: getLoginStateProps(state).status.failure
  }
}

export default connect(mapStateToProps, {
  login: login,
})(LoginPage);
