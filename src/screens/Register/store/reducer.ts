import { RegistrationFormProps } from './types'


export const defaultRegistrationFormProps: RegistrationFormProps = {
  formErrors: {},
  status: {
    success: '',
    failure: ''
  },
  isNewUser: true,
  submitted: false,
  emailExists: false,
  usernameExists: false
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
      return {
        ...state,
        emailExists: false,
        isNewUser: true,
        formErrors: {...state.formErrors, email: ''}
      }
    case 'EMAIL_EXISTS':
      return {
        ...state,
        emailExists: true,
        isNewUser: false,
        formErrors: {...state.formErrors, email: "This email is already registered with another account"}
      }
    case 'USERNAME_DOES_NOT_EXIST':
      return {
        ...state,
        usernameExists: false,
        formErrors: {...state.formErrors, username: ''}
      }
    case 'USERNAME_EXISTS':

      return {
        ...state,
        usernameExists: true,
        formErrors: {...state.formErrors, username: 'This username is already taken. Please enter a different username.'}
      }
    default: 
     return state;
  }
}