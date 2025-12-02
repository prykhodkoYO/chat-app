import { api } from './axiosInstance';
import { saveAccessToken, saveRefreshToken, removeTokens } from './tokenStorage';

export interface RegisterData {
  phone: string;
  password: string;
}

export interface LoginData {
  phone: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  try {
    const res = await api.post('/auth/register', data);

    await saveAccessToken(res.data.accessToken);
    await saveRefreshToken(res.data.refreshToken);

    return res.data;
  } catch (e: any) {
    console.log('Registration error:', e.response?.data || e.message);
    throw new Error(e.response?.data?.message || 'Registration failed');
  }
}

export async function loginUser(data: LoginData) {
  try {
    const res = await api.post('/auth/login', data);

    await saveAccessToken(res.data.accessToken);
    await saveRefreshToken(res.data.refreshToken);

    return res.data;
  } catch (e: any) {
    throw new Error(e.response?.data?.message || 'Login failed');
  }
}

export async function logout() {
  await removeTokens();
}
