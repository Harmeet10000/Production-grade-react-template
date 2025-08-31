import LoginForm from '../components/LoginForm/LoginForm';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const { login } = useAuth();

  const handleLogin = (credentials) => {
    login(credentials);
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;