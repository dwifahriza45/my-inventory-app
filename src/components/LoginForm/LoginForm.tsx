import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import FlashMessage from '../FlashMessage/FlashMessage';
import {login} from '../../utils/data';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [flash, setFlash] = useState<{ type: "error" | "success"; message: string } | null>(null);

    const navigate = useNavigate();

    const handleLogin = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setFlash(null);

        try {
            const response = await login({ email, password });

            if (response.status === 400 || response.status === 401) {
                setFlash({
                type: "error",
                message: response.error || "Email atau password salah",
                });
                return;
            }

            setFlash({
                type: "success",
                message: "Login berhasil, mengalihkan...",
            });

            setTimeout(() => navigate('/dashboard'), 800);
        } catch (err) {
            setFlash({
                type: "error",
                message: "Gagal terhubung ke server",
            });
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Login</h2>

            {flash && (
                <FlashMessage
                type={flash.type}
                message={flash.message}
                onClose={() => setFlash(null)}
                />
            )}
            
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