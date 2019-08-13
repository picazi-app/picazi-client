import { UserFieldInfo, FormErrors } from '../screens/Register/store/types';
const VALIDATORS = {
  name: {
    MIN: 2,
    MAX: 20
  },
  password: {
    MIN: 6,
    MAX: 20
  },
  username: {
    MIN: 2,
    MAX: 15
  },
}

export function validateName(name: string) : string | null {
  if (name.length > VALIDATORS.name.MAX) {
    return `Name cannot be more than ${VALIDATORS.name.MAX} characters`;
  }
  else if (name.length < VALIDATORS.name.MIN) {
    return `Name cannot be less than ${VALIDATORS.name.MIN} characters`;
  }
  else {
    return null;
  }
}

export function validateUsername(username: string) : string | null {
  if (username.length > VALIDATORS.username.MAX) {
    return `Username cannot be more than ${VALIDATORS.username.MAX} characters`;
  }
  else if (username.length < VALIDATORS.username.MIN) {
    return `Username cannot be less than ${VALIDATORS.username.MIN} characters`;
  }
  else {
    return null;
  }
}

export function validateEmail(email: string) : string | null {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmailValid = re.test(email.toLowerCase());
  if (email.length === 0 ){
    return `Email can't be empty.`
  }
  if (!isEmailValid) {
    return `Are you sure that this is the right email?`;
  } else {
    return null;
  }
}

export function validatePassword(password: string) : string | null{
  if(password.length === 0) {
    return `Password can't be empty`;
  }
  if (password.length > VALIDATORS.password.MAX) {
    return `Password cannot be more than ${VALIDATORS.password.MAX} characters`;
  }
  else if (password.length < VALIDATORS.password.MIN) {
    return `Password cannot be less than ${VALIDATORS.password.MIN} characters`;
  }
  else {
    return null;
  }
}

export function comparePasswords(passwordA: string, passwordB: string) : string | null {
  if (passwordA !== passwordB) {
    return `Passwords do not match`;
  } else {
    return null;
  }
}

export function validateForm(userInfo: UserFieldInfo) : FormErrors {
  const firstNameError = validateName(userInfo.firstName);
  const usernameError = validateUsername(userInfo.username);
  const emailError = validateEmail(userInfo.email);
  const passwordError = validatePassword(userInfo.password);
  const comparePasswordsError = comparePasswords(userInfo.password, userInfo.confirmPass);
  const formErrors :FormErrors = {};
  if (firstNameError) {
    formErrors.firstName = firstNameError;
  }

  if (emailError) {
    formErrors.email = emailError;
  }

  if(passwordError) {
    formErrors.password = passwordError;
  }

  if(comparePasswordsError) {
    formErrors.confirmPassword = comparePasswordsError;
  }

  if(usernameError) {
    formErrors.username = usernameError;
  }

  return formErrors;
}
