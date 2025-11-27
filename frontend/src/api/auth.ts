import { api } from './axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegisterData {
  phone: string;
  password: string;
}

interface LoginData {
  phone: string;
  password: string;
}

interface SaveProfilePayload {
  name: string;
  avatar: string | null;
}

export async function registerUser(data: RegisterData) {
  try {
    const res = await api.post('/auth/register', data);
    await AsyncStorage.setItem('token', res.data.token);
    return res.data;
  } catch (error: any) {
    console.log('Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
}

export async function loginUser(data: LoginData) {
  try {
    const res = await api.post('/auth/login', data);
    await AsyncStorage.setItem('token', res.data.token);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
}

export async function saveProfile(data: SaveProfilePayload) {
  try {
    const res = await api.post('/user/profile', data);
    return res.data;
  } catch (error: any) {
    console.log('Profile save error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Profile save failed');
  }
}

export async function logout() {
  await AsyncStorage.removeItem('token');
}
