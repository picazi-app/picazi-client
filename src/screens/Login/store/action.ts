import { LoginUserFieldInfo } from './types';
import axios from 'axios';
import getBaseUrl from "../../../helpers/config";
import {saveUserSession} from '../../../store/action'

// const apiUrl = `${getBaseUrl()}/users`;
const apiUrl = `${getBaseUrl()}`

export enum UserActionTypes {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  // LOGOUT= "LOGOUT"
}


export const success = (actionType: any, data: {}) => {
  return {
    type: actionType,
    data: data,
    status: "success"
  }
}
export const error = (actionType: any, data: {}) => {
  return {
    type: actionType,
    data: data,
  }
}
export function login(user: LoginUserFieldInfo) {
  return (dispatch: any) => {
    return axios.post(`${apiUrl}/api/session/login`, {...user}, {withCredentials: true})
      .then(response => {
          if (response.status >= 200 && response.status < 300) {
            dispatch(success(UserActionTypes.LOGIN_SUCCESS, response.data.user))
            console.log(response.data.user.email);
            return new Promise(function(res, rej){
              dispatch(dispatch(saveUserSession()))
            })
          }
      })
      .catch(err => {
        console.log("err.response.............", err.response)
        if(err.response){
          dispatch(dispatch(error(UserActionTypes.LOGIN_FAILURE, err.response.data)));
        }
      });
  };
}


// export function logout() {
//   return (dispatch: any) => {
//     return axios.delete(`${apiUrl}/api/session`,{withCredentials: true})
//       .then(response => {
//         console.log(response);
//         dispatch(success(UserActionTypes.LOGOUT, response.data))
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
// }