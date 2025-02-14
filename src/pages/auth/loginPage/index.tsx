import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import dogLogin from "../../../assets/dogLogin.png";
import type { IFormInput } from "./types";
import { schemaRegister } from "./schemaValidation";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: schemaRegister
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setLoginError(result.msg || "Erro ao realizar login");
        return;
      }

      // Sucesso: Armazene o token JWT
      console.log("Login bem-sucedido", result);
      localStorage.setItem("token", result.token);
      // Redirecione o usuário ou atualize o estado de autenticação conforme necessário
    } catch (error) {
      console.error("Erro:", error);
      setLoginError("Erro no servidor, tente novamente mais tarde");
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
          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
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

