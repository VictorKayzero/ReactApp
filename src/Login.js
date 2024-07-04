// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const url = 'http://localhost:8081/api/login';
            const data = {
              nombre:username,
              clave: password
            };

            const response = await axios.post(url, data);
            console.log('Login successful:', response.data);
            
            //guardo en sesion el login
            localStorage.setItem('userType', response.data);
            localStorage.setItem('token', response.data.token); 
            onLoginSuccess();

            //redirigimos a mantenedor libros
            navigate('/libros');

        } catch (error) {
            console.error('Login error:', error);
            setError('Usuario o contraseña incorrectos');
        }


    };

    return (
        <div>
            <header className="App-header">
                <h1>Login Biblioteca</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
