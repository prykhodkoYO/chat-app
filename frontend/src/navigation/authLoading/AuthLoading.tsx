import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './AuthLoading.styles';
import { COLORS } from '../../constants/style';

export default function AuthLoading({ navigation }: any) {
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Profile' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    };

    checkToken();
  }, []);

  return (
    <View style={styles.loaderWrapper}>
      <ActivityIndicator size="large" color={COLORS.accentBlue} />
    </View>
  );
}
