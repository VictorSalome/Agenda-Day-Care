import React, { useState } from 'react';
import dogRegister from '../../assets/dogRegister.png';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Nome completo:', fullName);
        console.log('E-mail:', email);
        console.log('Senha:', password);
        console.log('Confirmação de senha:', confirmPassword);
    };

    const backgroundStyle: React.CSSProperties = {
        backgroundImage: `url(${dogRegister})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100" style={backgroundStyle}>
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Criar conta</h1>
                <form onSubmit={handleRegister}>
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
