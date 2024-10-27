import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Adicione esta linha

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Adicione esta linha

    const handleLogin = async (e) => {
        e.preventDefault();
        try {

                        
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
               
                username,
                password,
            });
            console.log(response.data); // Log do retorno
            
            // Aqui você pode armazenar o token no localStorage, se necessário
            localStorage.setItem('authToken', response.data.token); // Supondo que você esteja retornando um token

            // Redirecionar para a tela principal
            navigate('/home'); // Altere '/home' para a rota da sua tela principal
        } catch (error) {
            setError('Credenciais inválidas.');
            console.error('Erro ao fazer login:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Login;
