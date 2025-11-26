import { api } from './axiosInstance';

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
