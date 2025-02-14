import { toast } from "react-toastify";
import { dogApi } from "../../services";

interface IRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const useAuth = () => {

  const postRegister = async (data: IRegister) => {
    const response = await dogApi.post("auth/register", data);

    if (response.status === 201) {
      toast.success("Cadastro realizado com sucesso!");
    } else {
      toast.error("Erro ao cadastrar");
    }

    if (response.status === 422) {
      toast.error("Erro ao cadastrar");
    }
    return response.data;

  };



  return { postRegister };
}

export default useAuth;