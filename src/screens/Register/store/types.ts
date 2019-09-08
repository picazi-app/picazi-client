export interface UserFieldInfo {
  firstName: string;
  username: string;
  password: string;
  confirmPass: string;
  email: string;
}

export interface FormErrors {
  firstName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface RegistrationFormProps {
  formErrors: FormErrors;
  status: RegistrationFormStatus;
  isNewUser: boolean;
  submitted: boolean;
  emailExists: boolean;
}

export interface RegistrationFormStatus {
  success: string;
  failure: string;
}