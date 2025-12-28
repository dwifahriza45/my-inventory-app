import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { Link, useNavigate } from 'react-router-dom';
import * as DataService from '../../utils/data';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e?: React.FormEvent) => {
        // Mencegah halaman reload saat diklik
        if (e) e.preventDefault();
        
        console.log("Tombol diklik, mencoba daftar..."); // Untuk cek di Console F12

        if (!name || !email || !password) {
            alert("Semua field harus diisi!");
            return;
        }

        try {
            const response = await DataService.register({ name, email, password });
            
            if (response && !response.error) {
                alert("Registrasi Berhasil! Silakan login.");
                navigate('/'); 
            } else {
                alert(response?.message || "Registrasi Gagal, silakan coba lagi.");
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan koneksi ke server.");
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Register</h2>
            <Input 
                label="Full Name" 
                placeholder="Your name" 
                value={name}
                onChange={(e: any) => setName(e.target.value)}
            />
            <Input 
                label="Email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
            />
            <Input 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
            />
            {/* Pakai type="submit" agar lebih mantap diklik */}
            <Button text="Create Account" onClick={handleRegister} />
            
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account? <span className="cursor-pointer text-indigo-600 font-medium">
                    <Link to="/">Login</Link>
                </span>
            </p>
        </form>
    );
};

export default RegisterForm;