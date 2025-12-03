import { api } from './axiosInstance';
import { saveAccessToken, saveRefreshToken, removeTokens } from './tokenStorage';
import { AxiosError } from 'axios';

export interface RegisterData {
  phone: string;
  password: string;
}

export interface LoginData {
  phone: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    phone: string;
    name: string | null;
  };
}

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  try {
    const res = await api.post<AuthResponse>('/auth/register', data);

    await saveAccessToken(res.data.accessToken);
    await saveRefreshToken(res.data.refreshToken);

    return res.data;
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    console.log('Registration error:', error.response?.data || error.message);

    throw new Error(error.response?.data?.message || 'Registration failed');
  }
}

export async function loginUser(data: LoginData): Promise<AuthResponse> {
  try {
    const res = await api.post<AuthResponse>('/auth/login', data);

    await saveAccessToken(res.data.accessToken);
    await saveRefreshToken(res.data.refreshToken);

    return res.data;
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    throw new Error(error.response?.data?.message || 'Login failed');
  }
}

export async function logout() {
  await removeTokens();
}
