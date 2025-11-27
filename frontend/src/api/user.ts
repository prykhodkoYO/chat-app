import { api } from './axiosInstance';

export interface UpdateProfilePayload {
  name?: string;
  avatar?: string | null;
}

export async function updateProfile(data: UpdateProfilePayload) {
  const res = await api.put('/user/profile', data);
  return res.data;
}
