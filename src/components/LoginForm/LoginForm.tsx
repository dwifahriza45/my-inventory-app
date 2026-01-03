<<<<<<< HEAD
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
=======
import Input from '../Input';
import Button from '../Button';
import { useState } from 'react';
import { login, putAccessToken } from '../../utils/data';
import type { Login } from '../../model/handler';
import { Link, useNavigate } from 'react-router-dom';

type ToastType = "success" | "error";

const LoginForm = () => {
  const [formData, setFormData] = useState<Login>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast(prev => prev ? { ...prev, visible: false } : null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData);

    if ("error" in result) {
      setError(result.error);
      showToast(result.error, "error");
    } else {
      setError(null);
      showToast("Login berhasil", "success");

      // Simpan token dan data user
      putAccessToken(result.data?.token || "dummy-token");
      localStorage.setItem("userEmail", result.data?.email || formData.email);

      // Redirect ke dashboard
      setTimeout(() => navigate('/dashboard'), 2000);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Login</h2>

      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
        {error && <p className="text-red-600">{error}</p>}
        <Button
          type="submit"
          text={loading ? (
            <span className="flex items-center justify-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span>Signing In...</span>
            </span>
          ) : "Sign In"}
        />
      </form>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{' '}
        <span className="cursor-pointer text-indigo-600">
          <Link to="/register">Register</Link>
        </span>
      </p>

      {toast && (
        <div
          className={`fixed top-1/2 left-1/2 z-50 flex items-center space-x-3 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transform transition-all duration-500
            -translate-x-1/2 -translate-y-1/2
            ${toast.visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
            ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          <span className="text-xl">{toast.type === "success" ? "✅" : "⚠️"}</span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
>>>>>>> d949834111886c2f77b3c8a3b02298ea0e9180d3
