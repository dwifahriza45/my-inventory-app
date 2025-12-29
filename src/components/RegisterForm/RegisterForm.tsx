import Input from '../Input';
import Button from '../Button';
import { useState } from 'react';
import { register } from '../../utils/data';
import { Link, useNavigate } from 'react-router-dom';
import type { Register } from '../../model/handler';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async () => {
    if (!username || !email || !password) {
      setToast({ type: 'error', message: 'Harap isi semua bidang yang dibutuhkan.' });
      return;
    }

    setLoading(true);
    setToast(null);

    const result = await register({ username, email, password } as Register);

    if (result.success) {
      setToast({ type: 'success', message: result.message });
      setTimeout(() => navigate('/'), 1500);
    } else {
      setToast({ type: 'error', message: result.message });
    }

    setLoading(false);
  };

  return (
    <div className="relative space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Register
      </h2>

      {/* Toast Notification */}
        {toast && (
        <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-50">
        <div
        className={`px-6 py-3 rounded shadow-lg text-white font-medium pointer-events-auto transition-all duration-300
        ${toast.type === 'success' ? 'bg-green-500 animate-bounce-in' : 'bg-red-500 animate-bounce-in'}`}
        >
        {toast.message}
        </div>
      </div>
    )}



      <Input
        label="Full Name"
        name="username"
        placeholder="Your name"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <Input
        label="Email"
        name="email"
        placeholder="you@example.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <Button
        text={
          loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="loader-border animate-spin rounded-full w-5 h-5 border-4 border-t-4 border-t-white border-gray-200"></span>
              Creating...
            </div>
          ) : (
            'Create Account'
          )
        }
        onClick={handleSubmit}
        disabled={loading}
        className="flex items-center justify-center gap-2"
      />

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <span className="cursor-pointer text-indigo-600">
          <Link to="/">Login</Link>
        </span>
      </p>

      {/* Tailwind loader style */}
      <style>{`
        .loader-border {
          border-top-color: white;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s forwards;
        }
        @keyframes bounce-in {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default RegisterForm;