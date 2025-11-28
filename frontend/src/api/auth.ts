import { api } from './axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeToken } from './tokenStorage';

interface RegisterData {
  phone: string;
  password: string;
}

interface LoginData {
  phone: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error: any) {
    console.log('Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
}

export async function loginUser(data: LoginData) {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Login failed');
  }
}

export async function logout() {
  await removeToken();
}
