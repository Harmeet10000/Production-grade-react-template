import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const login = (credentials) => {
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