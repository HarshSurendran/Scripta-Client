
export interface SignupFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: Date | undefined;
  password: string;
  confirmPassword: string;
}

export interface SignupErrors {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: string;
    password: string;
    confirmPassword: string;
}
