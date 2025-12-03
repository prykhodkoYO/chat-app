import { api } from './axiosInstance';
import { AxiosError } from 'axios';

export interface UpdateProfileData {
  name?: string | null;
  avatar?: string | null;
}

export async function updateProfile(data: FormData | UpdateProfileData) {
  try {
    const isForm = data instanceof FormData;

    const response = await api.patch('/user/profile', data, {
      headers: isForm
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' },
    });

    return response.data;
  } catch (e) {
    const error = e as AxiosError<{ message?: string }>;

    console.log('Update error:', error.response?.data || error.message);

    throw new Error(error.response?.data?.message || 'Update failed');
  }
}
