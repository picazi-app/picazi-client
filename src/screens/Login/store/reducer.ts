import { LoginFormProps } from './types'
import { deleteSession } from '../../../helpers/session';

export const defaultLoginFormProps: LoginFormProps = {
  formErrors: {},
  status: {
    success: '',
    failure: ''
  },
  submitted: false,
}

export function reducers(state: LoginFormProps = defaultLoginFormProps, action: any) : LoginFormProps{
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      console.log(action.data)
      return {
        ...state,
        status: {
          success: action.status,
          failure: ''
        },
        // submitted: true,
      }
    case 'LOGIN_FAILURE':
      return {
        status: {
          failure: action.data.message,
          success: ''
        },
        submitted: false
      }
      case 'LOGOUT':
        deleteSession();
        return {
          ...state,
        }
    default:
      return state;
  }
  
}