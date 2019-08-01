import axios from 'axios';
import getBaseUrl from "../../../helpers/config";
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
// URL
const apiUrl = `${getBaseUrl()}/users`;

export interface CheckEmailExist {
  type: UserActionTypes.EMAIL_EXIST,
  email: string
}

export enum UserActionTypes {
  REGISTER_REQUEST = "REGISTER_REQUEST",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAILURE = "REGISTER_FAILURE",
  EMAIL_EXIST = "EMAIL_EXIST",

  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",

  LOGOUT= "LOGOUT"
}
export interface RegSuccessReturnType {
  type: UserActionTypes.REGISTER_SUCCESS,
  msg: string
}

export interface RegFailureReturnType {
  type: UserActionTypes.REGISTER_FAILURE,
  msg: string
}

export interface RegRequestReturnType {
  type: UserActionTypes.REGISTER_REQUEST,
  msg: string
}

export type UserActions = RegSuccessReturnType | RegFailureReturnType | RegRequestReturnType;
export interface User {
  firstName: string,
  username: string,
  email: string,
  password: string
}

export function register(user: User) {
  return (dispatch: any) => {
    return axios.post(`${apiUrl}/email/register`, {...user})
      .then(response => {
        console.log(response);
        dispatch(success(response.data.msg))
      })
      .catch(error => {
        console.log(error);
        dispatch(error("Error"))
        throw(error);
      });
  };
}

export const success = (msg: string): RegSuccessReturnType =>{
  return {
    type: UserActionTypes.REGISTER_SUCCESS,
    msg: msg
  }
}

export const error = (msg: string): RegFailureReturnType =>{
  return {
    type: UserActionTypes.REGISTER_FAILURE,
    msg: msg
  }
}

export const checkEmailExist =  (email: string) : CheckEmailExist => {
  return {
    type: UserActionTypes.EMAIL_EXIST,
    email: email
  }
}

export const doesEmailExist =  (email: string) => {
    return (dispatch: any) => {
      return axios.post(`${apiUrl}/email/check`, {email})
        .then(response => {
          dispatch(checkEmailExist(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
  }
  
