import { RegistrationFormProps, RegistrationFormStatus } from './types'
import { UserActionTypes, UserActions } from './actions'

export const defaultRegistrationFormProps: RegistrationFormProps = {
  // user: {
  //   firstName: '',
  //   username: '',
  //   password: '',
  //   confirmPass: '',
  //   email: '',
  // },
  formErrors: {},
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
     return {
        ...state,
        status:{ 
          success:action.data,
          failure: ""
        },
        submitted: true,
        isNewUser: false
     }
     case 'REGISTER_FAILURE':
     return {
        ...state,
        status:{ 
          success: "",
          failure: action.data
        },
        submitted: false,
        isNewUser: true
     }
     case 'EMAIL_DOES_NOT_EXIST':
      const val = action.data.emailExists
     return {
        ...state,
        emailExists: false,
        isNewUser: true,
        formErrors: {...state.formErrors, email: ''}
        // isNewUser: val ? false: true,
        // formErrors: val ? {...state.formErrors, email: "This email is already registered with another account"} : {}
     }
     case 'EMAIL_EXISTS':
      const emailExists = action.data
     return {
        ...state,
        emailExists: emailExists,
        isNewUser: false,
        formErrors: {...state.formErrors, email: "This email is already registered with another account"}
     }
    default: 
     return state;
  }
}