import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import FlashMessage from '../FlashMessage/FlashMessage';
import { login } from '../../utils/data';
import Loading from '../Loading/Loading';
import { useAuthContext } from '../../hooks/useAuthContext';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { saveToken } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [flash, setFlash] = useState<{ type: "error" | "success"; message: string } | null>(null);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setFlash(null);

        setLoading(true);

        const response = await login({ email, password });

        if (response.code === 200 && response.status === "OK" && response.error === false) {
            setFlash({ type: 'success', message: response.message });

            saveToken(response.data.token);
        } else {
            setFlash({ type: 'error', message: response.message });
        }

        setLoading(false);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Login
            </h2>

            {flash && (
                <FlashMessage
                    type={flash.type}
                    message={flash.message}
                    onClose={() => setFlash(null)}
                />
            )}

            <Input
                label="Email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => {
                    setEmail(e.target.value);
                    setErrors(prev => ({ ...prev, email: '' }));
                }}
                error={errors.email}
            />

            <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => {
                setPassword(e.target.value);
                setErrors(prev => ({ ...prev, password: '' }));
                }}
                error={errors.password}
            />

            <Button
                text="Sign In"
                onClick={handleSubmit}
                className='w-full rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:bg-gray-400'
            />

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account? <span className="cursor-pointer text-indigo-600 font-medium">
                    <Link to="/register">Register</Link>
                </span>
            </p>

            {loading && <Loading />}
        </div>
    );
};

export default LoginForm;
