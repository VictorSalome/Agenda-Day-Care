import { HTTPService } from "../services";

interface IRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const useAuth = () => {
  const postRegister = async (data: IRegister) => {
    const response = await HTTPService.post("auth/register", data);
    return response.data;
  };

  return { postRegister };
};

export default useAuth;