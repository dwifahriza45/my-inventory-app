import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import * as DataService from '../../utils/data';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        try {
            const response = await DataService.login({ email, password });
            if (!response.error) {
                alert("Login Berhasil!");
                navigate('/dashboard');
            } else {
                alert(response.message || "Login Gagal");
            }
        } catch (err) {
            alert("Terjadi kesalahan koneksi ke server.");
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Login</h2>
            <Input 
                label="Email" 
                placeholder="Email" 
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
            />
            <Input 
                label="Password" 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
            />
            
            <Button text="Sign In" onClick={handleLogin} />

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account? <span className="cursor-pointer text-indigo-600 font-medium">
                    <Link to="/register">Register</Link>
                </span>
            </p>
        </form>
    );
};

export default LoginForm;