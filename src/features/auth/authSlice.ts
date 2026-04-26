import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

// 1. Define Types & Interfaces
export interface User {
  email: string;
  id?: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email?: string;
  username?: string;
  password?: string;
}

const API_URL = import.meta.env.VITE_API_URL

// 2. Async Thunk (Using FormData)
export const loginUser = createAsyncThunk<
  User, // Return type of the payload creator
  LoginCredentials, // First argument to the payload creator
  { rejectValue: string } // Types for ThunkAPI
>(
  'auth/loginUser',
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (email) formData.append('email', email);
      if (username) formData.append('username', username);
      if (password) formData.append('password', password);

      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || 'Login failed. Please check your credentials.');
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data.access_token));
      return data as User; 
    } catch {
      return rejectWithValue('Network error or server is unreachable.');
    }
  }
);

const savedUser = localStorage.getItem('user');

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedUser,
  loading: false,
  error: null,
};

// 4. Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        state.user = JSON.parse(savedUser);
        state.isAuthenticated = true;
      }
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export const { initializeAuth, logout, clearError } = authSlice.actions;
export default authSlice.reducer;