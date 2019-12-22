import axios from 'axios';

import getBaseUrl from "../helpers/config";
const apiUrl = getBaseUrl()

export enum UserActionTypes {
  FETCH_USER_SESSION = "FETCH_USER_SESSION",
  SET_USER_SESSION = "SET_USER_SESSION",
  REMOVE_USER_SESSION = "REMOVE_USER_SESSION",
  NOT_FOUND_ERROR = "NOT_FOUND_ERROR"
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
    return axios.delete(`${apiUrl}/api/session/delete`,{withCredentials: true})
      .then(response => {
        dispatch(success(UserActionTypes.REMOVE_USER_SESSION, response.data))
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function saveUserSession() {
  return (dispatch: any) => {
    dispatch(success(UserActionTypes.FETCH_USER_SESSION, ''));
    return axios.get(`${apiUrl}/api/session/saveSession`, {withCredentials: true})
      .then(response => {          
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
