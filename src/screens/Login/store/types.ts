export interface LoginFormProps {
  formErrors?: FormErrors;
  status: LoginFormStatus;
  submitted: boolean;
}
export interface LoginFormStatus {
  success?: string;
  failure?: string;
}
export interface FormErrors {
  email?: string;
  password?: string;
}

export interface LoginUserFieldInfo {
  email: string;
  password: string;
}

//hhh. - invalid email
// "" - email can't empty
// onBlur check if email is present, if not, set email: 'Invalid email/password';
// if emailexists === true, but pass is wrong, then errmsg
// if emailExists === true, then check for password, compare pass, if matches, show display message and redirect to home page
//hhh@gmail.com - 