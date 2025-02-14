import { dogApi } from "../../services";
import type { IRegisterProps } from "./types";

const useAuth = () => {

  const postRegister = async (data: IRegisterProps) => {
    const response = await dogApi.post("auth/register", data);
    return response.data;

  };



  return { postRegister };
}

export default useAuth;