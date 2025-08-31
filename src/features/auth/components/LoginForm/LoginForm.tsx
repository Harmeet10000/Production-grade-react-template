import { useState, FormEvent } from 'react';
import Button from '../../../../components/common/Button';
import './LoginForm.module.scss';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;