import { RegistrationFormProps, RegistrationFormStatus } from './types'
import { UserActionTypes, UserActions } from './actions'

export const defaultRegistrationFormProps: RegistrationFormProps = {
  user: {
    firstName: '',
    username: '',
    password: '',
    confirmPass: '',
    email: '',
  },
  formErrors: {
    firstName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  status: {
    success: '',
    failure: ''
  },
  isNewUser: true,
  submitted: false,
  emailExists: false
}

export function reducers(state: RegistrationFormProps = defaultRegistrationFormProps, action: any) : RegistrationFormProps{
  switch(action.type){
    case 'REGISTER_SUCCESS':
      console.log(action.success)
     return {
        ...state,
        status:{ 
          success:action.success,
          failure: state.status.failure
        },
        submitted: true,
        isNewUser: false
     }
     case 'REGISTER_FAILURE':
      console.log(action.failure)
     return {
        ...state,
        status:{ 
          success: state.status.success,
          failure: action.error
        },
        submitted: false,
        isNewUser: true
     }
     case 'CHECK_EMAIL_EXIST':
      console.log(action.emailExists)
      const val = action.emailExists
     return {
        ...state,
        emailExists: val,
        submitted: val ? false: true,
        isNewUser: val ? false: true,
        // formErrors: val ? {...state.formErrors, email: "This email is already registered with another account"} : {}
     }
    default: 
     return state;
  }
}