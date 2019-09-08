import React from 'react';
import { Link, withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
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
} from '../../../helpers/formValidations';
import { UserFieldInfo, FormErrors } from "../store/types"; 
import { StateProps } from '../../../store/types';
//import selectors
import { getRegistrationStateProps } from '../store/selectors';
import { getSessionStateProps } from '../../../store/selector'
import RegistrationForm from '../components/RegistrationForm'

interface StateType {
  formErrors: FormErrors;
  user: UserFieldInfo;
}

interface ActionProps {
  register: (user: User) => any;
  doesEmailExist: (email: string) => void;
}

interface DataProps {
  formErrors: FormErrors;
  status: {
    success?: string,
    failure?: string,  
  }
  emailExists: boolean;
  isLoggedIn: boolean;
}

type Props = DataProps & ActionProps;

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
          formErrors: {},
        };
    }
    componentDidUpdate(previousProps: Props) {
      const { formErrors } = this.props;
      if(previousProps.formErrors !== formErrors) {
        this.setState({
          formErrors: formErrors
        });
      }
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

    handleFirstName = () => {
      //get firstName from the state;
      const { firstName } = this.state.user;
      //get errors object from the state;
      const { formErrors } = this.state;
      //Run validations to see if firstName has atleast 2 chars.
      const nameError = validateName(firstName);
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
      }
       else {
        delete formErrors.username;
        this.setState({
          formErrors: formErrors
        })
      } 
    }

    handleEmail = async() => {
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
        this.props.doesEmailExist(email);
      }
    }

    handleSubmit = ()  => {

      const { user } = this.state;
      const { emailExists } = this.props;
      const errors = validateForm(user);
      console.log(errors)
      if((Object.entries(errors).length === 0 && errors.constructor === Object) && emailExists === false) {
        this.props.register({
          firstName: user.firstName,
          username: user.username,
          password: user.password,
          email: user.email
        });
        this.clear();
      }
      else if( emailExists === true && errors) {
        console.log("errors inside second if", errors)
        this.setState({
          formErrors: {
            ...errors,
            email: "This email is already registered with another account."
          }
        });
      }
      else if(errors) {
        console.log(errors)
        this.setState({
          formErrors: {
            ...errors,
          }
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
        return (
          (this.props.isLoggedIn === true) ? <Redirect to='/' /> : 
          <RegistrationForm 
              user={user} 
              formErrors={formErrors}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              handleFirstName={this.handleFirstName}
              handleUsername={this.handleUsername}
              handlePassword={this.handlePassword}
              handleComparePassword={this.handleComparePassword}
              handleEmail={this.handleEmail}
              />
        );
    }
}
function mapStateToProps(state: StateProps){
   return {
    status: getRegistrationStateProps(state).status,
    emailExists: getRegistrationStateProps(state).emailExists,
    formErrors: getRegistrationStateProps(state).formErrors,
    isLoggedIn: getSessionStateProps(state).isLoggedIn,
  }
}
export default connect(mapStateToProps, {
  register: register,
  doesEmailExist: doesEmailExist
})(RegisterPage);