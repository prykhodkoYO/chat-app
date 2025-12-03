import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import Checkbox from 'expo-checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../constants/style';
import { ActivityIndicator } from 'react-native';
import PasswordField from '../../components/passwordField/PasswordField';
import PhoneField from '../../components/phoneField/PhoneField';
import { loginUser } from '../../api/auth';
import { saveAccessToken, saveRefreshToken } from '../../api/tokenStorage';
import { styles } from './LoginScreen.styles';
import { Country } from '../../data/countries';
import { RootStackNavigation } from '../../types/navigation.types';

const MIN_PASSWORD_LENGTH = 6;

interface LoginForm {
  phone: string;
  password: string;
  remember: boolean;
}

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigation>();

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, watch, setValue } = useForm<LoginForm>({
    defaultValues: {
      phone: '',
      password: '',
      remember: false,
    },
  });

  const phone = watch('phone');
  const password = watch('password');

  const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
  const isButtonDisabled = !isPhoneValid || !isPasswordValid;

  const onSubmit = async ({ remember }: LoginForm) => {
    if (!selectedCountry) {
      Alert.alert('Error', 'Country not selected');
      return;
    }

    const fullPhone = `+${selectedCountry.callingCode}${phone}`;

    try {
      setIsLoading(true);

      const res = await loginUser({
        phone: fullPhone,
        password,
      });

      if (remember) {
        await saveAccessToken(res.accessToken);
        await saveRefreshToken(res.refreshToken);
      } else {
        await saveAccessToken(res.accessToken);
      }

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (e: any) {
      Alert.alert('Login error', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      enableAutomaticScroll
      extraScrollHeight={80}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Registration')}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Enter your mobile phone</Text>
      </View>

      <View style={styles.headerSpacer} />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <PhoneField
            value={value}
            onChange={onChange}
            onValidChange={(valid) => setIsPhoneValid(valid)}
            onCountryChange={(country) => setSelectedCountry(country)}
          />
        )}
      />

      <PasswordField
        value={password}
        onChangeText={(val) => setValue('password', val)}
        placeholder="Password"
        secure={!showPassword}
        toggleSecure={() => setShowPassword(!showPassword)}
      />

      <View style={styles.row}>
        <View style={styles.checkRow}>
          <Controller
            control={control}
            name="remember"
            render={({ field: { onChange, value } }) => (
              <Checkbox value={value} onValueChange={onChange} color={COLORS.accentBlue} />
            )}
          />
          <Text style={styles.checkLabel}>Remember me</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, (isButtonDisabled || isLoading) && styles.disabled]}
          disabled={isButtonDisabled || isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.buttonIcon}>→</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
