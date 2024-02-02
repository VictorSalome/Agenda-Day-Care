import React, { useState } from 'react';
import dogLogin from '../../assets/dogLogin.png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Lógica de autenticação aqui
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const backgroundStyle: React.CSSProperties = {
        position: 'relative',
        backgroundImage: `url(${dogLogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };



    return (
        <div className="min-h-screen flex items-center justify-center" style={backgroundStyle} >
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Faça o login</h1>
                <form onSubmit={handleLogin}>
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
                            required
                        />
                    </div>
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
                            required
                        />
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
