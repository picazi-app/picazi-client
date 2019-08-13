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
          success:action.success,
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
          failure: action.error
        },
        submitted: false,
        isNewUser: true
     }
     case 'CHECK_EMAIL_EXIST':
      const val = action.emailExists
     return {
        ...state,
        emailExists: val,
        isNewUser: val ? false: true,
        formErrors: val ? {...state.formErrors, email: "This email is already registered with another account"} : {}
     }
    default: 
     return state;
  }
}