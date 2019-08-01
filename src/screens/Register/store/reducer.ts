import { RegistrationFormProps } from './types'
import { UserActionTypes, UserActions } from './actions'

export const defaultRegistrationFormProps: RegistrationFormProps = {
  newUser: true,
  passErr: '',
  nameErr: '',
  emailError: ''
}

export function reducers(state: RegistrationFormProps = defaultRegistrationFormProps, action: UserActions) : RegistrationFormProps{
  switch(action.type){
    case UserActionTypes.REGISTER_SUCCESS:
     return {
        newUser: true,
        passErr: '',
        nameErr: '',
        emailError: ''
     }
    default: 
     return state;
  }
}