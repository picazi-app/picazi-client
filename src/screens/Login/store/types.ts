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