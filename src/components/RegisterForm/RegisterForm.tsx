import Input from '../Input';
import Button from '../Button';
import { useState } from 'react';
import { register } from '../../utils/data';
import { Link } from 'react-router-dom';
import FlashMessage from '../FlashMessage/FlashMessage';
import Loading from '../Loading/Loading';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState<{ type: "error" | "success"; message: string } | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFlash(null);

    setLoading(true);

    const response = await register({ username, email, password });

    if (response.success) {
      setFlash({ type: 'success', message: response.message });
    } else {
      setFlash({ type: 'error', message: response.message });

      if (response.errors) {
        setErrors(response.errors);
      }
    }

    setLoading(false);
  };

  return (
    <div className="relative space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Register
      </h2>

      {flash && (
        <FlashMessage
          type={flash.type}
          message={flash.message}
          onClose={() => setFlash(null)}
        />
      )}

      <Input
        label="Full Name"
        name="username"
        placeholder="Your name"
        value={username}
        onChange={e => {
          setUsername(e.target.value);
          setErrors(prev => ({ ...prev, username: '' }));
        }}
        error={errors.username}
      />

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
        text="Create Account"
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

      {loading && <Loading />}
    </div>
  );
};

export default RegisterForm;