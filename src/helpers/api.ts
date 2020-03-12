import axios from 'axios';
import getBaseUrl from "./config.js";

const apiUrl = getBaseUrl();

export function isEmailAvailable(email: string) :Promise<any> {
  return axios({
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    url: `${apiUrl}/users/email/check`,
    data: {
      email: email
    }
  }).catch(err => {
    console.log(err);
  });
}

export function fetchUserSession() :Promise<any> {
  return axios({
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    url: `${apiUrl}/api/session`,
    withCredentials: true,
  }).catch(err => {
    console.log(err);
  });
}