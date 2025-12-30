import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import FlashMessage from '../FlashMessage/FlashMessage';
import { register } from '../../utils/data';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [flash, setFlash] = useState<{ type: "error" | "success"; message: string } | null>(null);

    const navigate = useNavigate();

    const handleRegister = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setFlash(null);

        if (!name || !email || !password) {
            setFlash({ type: "error", message: "Semua field harus diisi!" });
            return;
        }

        try {
            const response = await register({ name, email, password });
            console.log("Response API Register:", response);

            // Menangkap Error (Sudah benar jangan diubah)
            if (response.status === 400 || response.error) {
                setFlash({
                    type: "error",
                    message: response.message || "Registrasi gagal",
                });
                return;
            }

            // MENANGKAP SUKSES: Mengambil pesan asli dari API
            setFlash({
                type: "success",
                message: response.message || "Registrasi berhasil!", 
            });

            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setFlash({ type: "error", message: "Gagal terhubung ke server" });
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Register</h2>
            {flash && (
                <FlashMessage
                    type={flash.type}
                    message={flash.message}
                    onClose={() => setFlash(null)}
                />
            )}
            <Input label="Full Name" placeholder="Your name" value={name} onChange={(e: any) => setName(e.target.value)} />
            <Input label="Email" placeholder="you@example.com" value={email} onChange={(e: any) => setEmail(e.target.value)} />
            <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e: any) => setPassword(e.target.value)} />
            <Button text="Create Account" onClick={handleRegister} />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account? <span className="cursor-pointer text-indigo-600 font-medium"><Link to="/">Login</Link></span>
            </p>
        </form>
    );
};

export default RegisterForm;