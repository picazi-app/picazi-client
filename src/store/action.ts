import { fetchUserSession } from '../helpers/api'
import axios from 'axios';

import getBaseUrl from "../helpers/config";
const apiUrl = `${getBaseUrl()}`

export enum UserActionTypes {
  FETCH_USER_SESSION = "FETCH_USER_SESSION",
  SET_USER_SESSION = "SET_USER_SESSION",
  REMOVE_USER_SESSION = "REMOVE_USER_SESSION",
}


export const success = (actionType: any, msg: {}) => {
  return {
    type: actionType,
    data: msg,
    status: "success"
  }
}
export const error = (actionType: any, msg: {}) => {
  return {
    type: actionType,
    failure: msg
  }
}

export function logout() {
  return (dispatch: any) => {
    return axios.delete(`${apiUrl}/api/session`,{withCredentials: true})
      .then(response => {
        console.log(response);
        dispatch(success(UserActionTypes.REMOVE_USER_SESSION, response.data))
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function saveUserSession() {
  return (dispatch: any) => {
    return axios.get(`${apiUrl}/api/session`, {withCredentials: true})
      .then(response => {
          
            dispatch(success(UserActionTypes.FETCH_USER_SESSION, ''));
          
          if (response.status >= 200 && response.status < 300) {
            if(response.data.isLoggedIn) {
              dispatch(success(UserActionTypes.SET_USER_SESSION, response.data.user));
            } else {
              dispatch(success(UserActionTypes.REMOVE_USER_SESSION, response.data.user));
            }
          }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
// export function saveUserSession() {
//   return async (dispatch: any) => {
//     try {
//       return new Promise(function(res, rej){
//         dispatch(dispatch(UserActionTypes.FETCH_USER_SESSION));
//       })
//       const response = await fetchUserSession();
//       console.log("response inside saveUserSession", response.data);

//       if(response.data.isLoggedIn) {
//         dispatch(success(UserActionTypes.SET_USER_SESSION, response.data.user));
//       } else {
//         dispatch(success(UserActionTypes.REMOVE_USER_SESSION, response.data.user));
//       }
//     }
//     catch(err) {
//       console.log(err);
//     }
//   }
// }
