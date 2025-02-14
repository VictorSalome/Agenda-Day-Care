import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import dogRegister from "../../../assets/dogRegister.png";
import type { IFormInput } from "./types";
import { schemaRegister } from "./schemaRegister";
import useAuth from "../../../hooks/authHook/serviceAuth";
import { yupResolver } from "@hookform/resolvers/yup";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schemaRegister),
  });
  const { postRegister } = useAuth();

  const [showPasswords, setShowPasswords] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await postRegister(data);
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
