import React, { useState } from 'react';

const Login = () => {
    // Estados para armazenar os dados do formulário e configurações
    const [email, setEmail] = useState('');  // Estado para o e-mail
    const [password, setPassword] = useState('');  // Estado para a senha
    const [showPassword, setShowPassword] = useState(false);  // Estado para mostrar/ocultar a senha

    // Função para lidar com o envio do formulário
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();  // Evita o comportamento padrão de recarregar a página no envio

        // Aqui você pode implementar a lógica de autenticação
        console.log('Email:', email);
        console.log('Password:', password);
    };

    // Renderiza o formulário e outros elementos na página
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Faça o login</h1>
                <form onSubmit={handleLogin}>
                    {/* Campo para inserir o e-mail */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                            required  // Campo obrigatório
                        />
                    </div>
                    {/* Campo para inserir a senha com opção de mostrar/ocultar */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                            required  // Campo obrigatório
                        />
                        {/* Checkbox para mostrar/ocultar a senha */}
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            className="mt-2"
                        />
                        <label htmlFor="showPassword" className="text-sm text-gray-700 ml-2">
                            Mostrar senha
                        </label>
                    </div>
                    {/* Botão para enviar o formulário */}
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

export default Login;