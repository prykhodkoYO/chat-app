import { api } from './axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegisterData {
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

export async function loginUser(data: { phone: string; password: string }) {
  try {
    const res = await api.post('/auth/login', data);
    await AsyncStorage.setItem('token', res.data.token);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Login failed');
  }
}

export async function logout() {
  await AsyncStorage.removeItem('token');
}
