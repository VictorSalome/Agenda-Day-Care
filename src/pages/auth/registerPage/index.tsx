import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";  // Importando o axios
import dogRegister from "../../../assets/dogRegister.png";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Nome completo é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem corresponder")
    .required("Confirmação de senha é obrigatória"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const [showPasswords, setShowPasswords] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/register', data);
      console.log(response.data);
      // Faça algo com a resposta, como mostrar uma mensagem de sucesso
    } catch (error) {
      console.error(error);
      // Lide com o erro, como mostrar uma mensagem de erro
    }
  };

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${dogRegister})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={backgroundStyle}
    >
      <div className="w-full sm:w-96 p-6 bg-white rounded-lg shadow-md mx-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">Criar conta</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome completo
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              id="password"
              {...register("password")}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmação de senha
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword")}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="showPasswords"
              checked={showPasswords}
              onChange={() => setShowPasswords(!showPasswords)}
              className="mr-2"
            />
            <label htmlFor="showPasswords" className="text-sm text-gray-700">
              Mostrar senhas
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
