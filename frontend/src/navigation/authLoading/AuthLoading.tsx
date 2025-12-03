import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../../types/navigation.types';
import { getAccessToken, getRefreshToken, saveAccessToken } from '../../api/tokenStorage';
import { api } from '../../api/axiosInstance';
import { styles } from './AuthLoading.styles';
import { COLORS } from '../../constants/style';

export default function AuthLoading() {
  const navigation = useNavigation<RootStackNavigation>();

  useEffect(() => {
    const checkTokens = async () => {
      const access = await getAccessToken();

      if (access) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
        return;
      }

      const refresh = await getRefreshToken();

      if (!refresh) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        return;
      }

      try {
        const res = await api.post('/auth/refresh', { refreshToken: refresh });

        await saveAccessToken(res.data.accessToken);

        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } catch (err) {
        console.log('Refresh failed:', err);

        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    };

    checkTokens();
  }, []);

  return (
    <View style={styles.loaderWrapper}>
      <ActivityIndicator size="large" color={COLORS.accentBlue} />
    </View>
  );
}
