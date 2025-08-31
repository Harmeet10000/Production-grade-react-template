import { useState } from 'react';
import Button from '../../../../components/common/Button';
import './LoginForm.module.scss';

const LoginForm = ({ onSubmit }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
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