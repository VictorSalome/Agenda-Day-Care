import { dogApi } from "../../services";
import type { ILoginProps, IRegisterProps } from "./types";

const useAuth = () => {

  const postRegister = async (data: IRegisterProps) => {
    const response = await dogApi.post("auth/register", data);
    return response.data;
  };

  const postLogin = async (data: ILoginProps) => {
    const response = await dogApi.post("auth/login", data);
    return response
  };



  return { postRegister, postLogin };
}

export default useAuth;