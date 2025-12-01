import axios from 'axios';
import Constants from 'expo-constants';
import { getToken } from './tokenStorage';

const API_URL = Constants.expoConfig?.extra?.apiUrl as string;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
