export interface IRegisterProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginProps {
  email: string;
  password: string;
}
