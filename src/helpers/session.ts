import { UserSession } from "../store/types"

export function getUserSession(): UserSession | null {
  const userSessionString =  sessionStorage.getItem("user");

  if(userSessionString !== "undefined" && userSessionString !== null) {
    return JSON.parse(JSON.stringify(userSessionString));
  } else {
    return null;
  }
}

export function saveUserSession(user: UserSession) {
  const userString = JSON.stringify(user);
  sessionStorage.setItem("user", userString);
}

export function deleteSession() {
  sessionStorage.removeItem('user');
  sessionStorage.clear()
}