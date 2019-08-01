import axios from 'axios';
import getBaseUrl from "./config";

const apiUrl = `${getBaseUrl()}/users`;

export function isEmailAvailable(email: string) :Promise<any> {
  return axios({
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    url: `${apiUrl}/email/check`,
    data: {
      email: email
    }
  }).catch(err => {
    console.log(err);
  });
}
