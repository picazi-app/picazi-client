import { LoginUserFieldInfo } from './types';
import axios from 'axios';
import getBaseUrl from "../../../helpers/config.js";
import {saveUserSession} from '../../../store/action'

const apiUrl = getBaseUrl();

export enum UserActionTypes {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
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
            return new Promise(function(res, rej){
              dispatch(dispatch(saveUserSession()))
            })
          }
      })
      .catch(err => {
        if(err.response){
          dispatch(dispatch(error(UserActionTypes.LOGIN_FAILURE, err.response.data)));
        }
      });
  };
}
