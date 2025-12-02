import axios from 'axios';
import Constants from 'expo-constants';

import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
  removeTokens,
} from './tokenStorage';

const API_URL = Constants.expoConfig?.extra?.apiUrl;

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let failedQueue: (() => void)[] = [];

function processQueue(newToken: string | null) {
  failedQueue.forEach((cb) => cb());
  failedQueue = [];
}

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          failedQueue.push(() => resolve(api(original)));
        });
      }

      isRefreshing = true;
      try {
        const refresh = await getRefreshToken();
        if (!refresh) {
          await removeTokens();
          return Promise.reject(error);
        }

        const res = await api.post('/auth/refresh', { refreshToken: refresh });

        await saveAccessToken(res.data.accessToken);
        await saveRefreshToken(res.data.refreshToken);

        processQueue(res.data.accessToken);
        isRefreshing = false;

        original.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(original);
      } catch (err) {
        isRefreshing = false;
        processQueue(null);
        await removeTokens();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
