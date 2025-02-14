import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import dogLogin from "../../../assets/dogLogin.png";
import type { IFormInput } from "./types";
import { schemaRegister } from "./schemaValidation";
import useAuth from "../../../hooks/auth/authHook";
import { toast } from "react-toastify";
import axios from "axios";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: schemaRegister
  });

  const { postLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);


  const messageToastLogin = {
    success: "Usuário logado com sucesso!",
    warning: "verifique se o email e senha estão corretos.",
    error: "Verifique se o usuário está cadastrado.",

  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      console.log("Enviando requisição...");
      const response = await postLogin(data);
      console.log("Resposta recebida:", response);

      if (response.status === 200) {
        reset();
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success(messageToastLogin.success);
        return;
      }

      if (response.status === 404) {
        console.log("Erro 404 - Usuário não encontrado");
        toast.error(messageToastLogin.error);
        return;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);

      if (axios.isAxiosError(error)) {
        console.log("Código de status:", error.response?.status);

        if (error.response?.status === 422) {
          toast.error(messageToastLogin.warning);
        } else {
          console.error("Erro inesperado:", error);
        }
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  };



  const backgroundStyle: React.CSSProperties = {
    position: "relative",
    backgroundImage: `url(${dogLogin})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={backgroundStyle}
    >
      <div className="w-full sm:w-96 p-6 bg-white rounded-lg shadow-md mx-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Faça o login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
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
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-sm text-gray-700">
                Mostrar senha
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};


