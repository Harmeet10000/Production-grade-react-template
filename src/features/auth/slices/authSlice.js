import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../services/authService';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    return await authService.login(credentials);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;