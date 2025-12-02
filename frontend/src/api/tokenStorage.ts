import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

async function saveSecure(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
    });
  } catch {
    await AsyncStorage.setItem(key, value);
  }
}

async function readSecure(key: string) {
  try {
    const result = await SecureStore.getItemAsync(key);
    if (result) return result;
  } catch {}

  return AsyncStorage.getItem(key);
}

async function deleteSecure(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch {
    await AsyncStorage.removeItem(key);
  }
}

export async function saveAccessToken(token: string) {
  await saveSecure(ACCESS_TOKEN_KEY, token);
}

export async function saveRefreshToken(token: string) {
  await saveSecure(REFRESH_TOKEN_KEY, token);
}

export async function getAccessToken(): Promise<string | null> {
  return (await readSecure(ACCESS_TOKEN_KEY)) || null;
}

export async function getRefreshToken(): Promise<string | null> {
  return (await readSecure(REFRESH_TOKEN_KEY)) || null;
}

export async function removeTokens() {
  await deleteSecure(ACCESS_TOKEN_KEY);
  await deleteSecure(REFRESH_TOKEN_KEY);
}
