import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import PasswordInput from '../components/PasswordInput';
import PhoneField from '../components/PhoneField';
import { styles } from './RegisterScreen.styles';
import { registerUser } from '../api/auth';
import { Country } from '../data/countries';

const MIN_PASSWORD_LENGTH = 6;

interface RegisterForm {
  phone: string;
  password: string;
  confirmPassword: string;
  remember: boolean;
}

const RegisterScreen = () => {
  const navigation: any = useNavigation();

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const { control, handleSubmit, watch, setValue, reset } = useForm<RegisterForm>({
    defaultValues: {
      phone: '',
      password: '',
      confirmPassword: '',
      remember: false,
    },
  });

  useEffect(() => {
    reset();
  }, []);

  const phone = watch('phone');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
  const isConfirmValid = confirmPassword.length >= MIN_PASSWORD_LENGTH;
  const isPasswordsSame = password === confirmPassword;

  const isButtonDisabled = !isPhoneValid || !isPasswordValid || !isConfirmValid || !isPasswordsSame;

  const onSubmit = async () => {
    if (!isPhoneValid) {
      Alert.alert('Error', 'Invalid phone number');
      return;
    }

    if (!isPasswordValid) {
      Alert.alert('Error', `Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      return;
    }

    if (!isConfirmValid) {
      Alert.alert('Error', `Confirm password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      return;
    }

    if (!isPasswordsSame) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!selectedCountry) {
      Alert.alert('Error', 'Country not selected');
      return;
    }

    const fullPhone = `+${selectedCountry.callingCode}${phone}`;

    try {
      await registerUser({
        phone: fullPhone,
        password,
      });

      navigation.navigate('Profile');
    } catch (error: any) {
      Alert.alert('Registration error', error.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={40}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>← Login</Text>
          </TouchableOpacity>

          <View style={styles.headerRight}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.subtitle}>Enter your mobile phone</Text>
          </View>
        </View>
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
            onCountryChange={(country: Country) => setSelectedCountry(country)}
          />
        )}
      />

      <PasswordInput
        value={password}
        onChangeText={(val) => setValue('password', val)}
        placeholder={`Password (min ${MIN_PASSWORD_LENGTH} symbols)`}
        secure={!showPassword}
        toggleSecure={() => setShowPassword(!showPassword)}
      />

      {!isPasswordValid && password.length > 0 && (
        <Text style={styles.errorText}>
          Password must be at least {MIN_PASSWORD_LENGTH} characters
        </Text>
      )}

      <PasswordInput
        value={confirmPassword}
        onChangeText={(val) => setValue('confirmPassword', val)}
        placeholder={`Confirm Password (min ${MIN_PASSWORD_LENGTH} symbols)`}
        secure={!showConfirm}
        toggleSecure={() => setShowConfirm(!showConfirm)}
      />

      {!isPasswordsSame && confirmPassword.length > 0 && (
        <Text style={styles.errorText}>Passwords do not match</Text>
      )}

      <View style={styles.row}>
        <View style={styles.checkRow}>
          <Controller
            control={control}
            name="remember"
            render={({ field: { onChange, value } }) => (
              <Checkbox value={value} onValueChange={onChange} color="#0095ff" />
            )}
          />
          <Text style={styles.checkLabel}>Remember me</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, isButtonDisabled && styles.disabled]}
          disabled={isButtonDisabled}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
