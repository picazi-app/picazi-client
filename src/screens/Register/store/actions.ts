import axios from 'axios';
import getBaseUrl from "../../../helpers/config.js";
import { history } from '../../../helpers/history'

const apiUrl = getBaseUrl();

export enum UserActionTypes {
  REGISTER_REQUEST = "REGISTER_REQUEST",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAILURE = "REGISTER_FAILURE",

  USERNAME_DOES_NOT_EXIST = "USERNAME_DOES_NOT_EXIST",
  USERNAME_EXISTS = "USERNAME_EXISTS",

  EMAIL_EXISTS = "EMAIL_EXISTS",
  EMAIL_DOES_NOT_EXIST = "EMAIL_DOES_NOT_EXIST",
  CHECK_EMAIL_EXIST = "CHECK_EMAIL_EXIST",

  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",

  LOGOUT= "LOGOUT"
}

export interface User {
  firstName: string;
  username: string;
  email: string;
  password: string;
}

export const success = (actionType: any, msg: string) => {
  return {
    type: actionType,
    data: msg
  }
}

export const error = (actionType: any, msg: string) => {
  return {
    type: actionType,
    data: msg
  }
}

export function register(user: User) {
  return (dispatch: any) => {
    return axios.post(`${apiUrl}/users/email/register`, {...user})
      .then(response => {
        dispatch(success(UserActionTypes.REGISTER_SUCCESS, response.data.msg));
        if(response.status === 200) {
          history.push('/login')
        }
      })
      .catch(err => {
        dispatch(error(UserActionTypes.REGISTER_FAILURE, err.response.data))
        throw(err);
      });
  };
}

export const doesEmailExist =  (email: string) => {
    return (dispatch: any) => {
      return axios.post(`${apiUrl}/users/email/check`, {email})
        .then(response => {
          dispatch(success(UserActionTypes.EMAIL_DOES_NOT_EXIST, response.data.message))
        })
        .catch(err => {
          dispatch(error(UserActionTypes.EMAIL_EXISTS, err.response.data.message))
        });
    };
  }

export const doesUserNameExist = (username: string) => {
  return (dispatch: any) => {
    return axios.post(`${apiUrl}/users/username/check`, {username})
      .then(response => {
          dispatch(success(UserActionTypes.USERNAME_DOES_NOT_EXIST, response.data.message))
      })
      .catch((err) => {
        if(err.response) {
          dispatch(error(UserActionTypes.USERNAME_EXISTS, err.response.data.message))
        }
      })
  }
}