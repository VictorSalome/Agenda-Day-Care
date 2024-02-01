// Importa o React e o hook useState do React
import React, { useState } from 'react';

// Componente de registro
const Register = () => {
    // Estados para armazenar os dados do formulário e configurações
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);

    // Função para lidar com o envio do formulário
    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();  // Evita o comportamento padrão de recarregar a página no envio

        // Exibe os dados do formulário no console
        console.log('Nome completo:', fullName);
        console.log('E-mail:', email);
        console.log('Senha:', password);
        console.log('Confirmação de senha:', confirmPassword);
    };

    // Renderiza o formulário e outros elementos na página
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Crie sua conta</h1>
                <form onSubmit={handleRegister}>
                    {/* Campo para inserir o nome completo */}
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                            Nome completo
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    {/* Campo para inserir o e-mail */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    {/* Campo para inserir a senha com opção de mostrar/ocultar */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
                            type={showPasswords ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    {/* Campo para confirmar a senha com opção de mostrar/ocultar */}
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirmação de senha
                        </label>
                        <input
                            type={showPasswords ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    {/* Checkbox para mostrar/ocultar senhas */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                checked={showPasswords}
                                onChange={() => setShowPasswords(!showPasswords)}
                                className="mr-2"
                            />
                            Mostrar senhas
                        </label>
                    </div>
                    {/* Botão para enviar o formulário */}
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

// Exporta o componente Register para ser utilizado em outras partes do aplicativo
export default Register;
