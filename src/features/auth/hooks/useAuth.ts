import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../slices/authSlice';
import { RootState, AppDispatch } from '../../../store';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, error } = useSelector((state: RootState) => state.auth);

  const login = (credentials: LoginCredentials) => {
    dispatch(loginUser(credentials));
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!user
  };
};