import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import Checkbox from 'expo-checkbox';
import PasswordInput from '../components/PasswordInput';
import { loginUser } from '../api/auth';
import { styles } from './LoginScreen.styles';

const MIN_PASSWORD_LENGTH = 6;

interface LoginForm {
  phone: string;
  password: string;
  remember: boolean;
}

const LoginScreen = () => {
  const navigation: any = useNavigation();
  const phoneRef = useRef<PhoneInput>(null);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit = async () => {
    try {
      const res = await loginUser({ phone, password });

      navigation.navigate('Profile');
    } catch (e: any) {
      Alert.alert('Login error', e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            ref={phoneRef}
            defaultCode="UA"
            layout="first"
            value={value}
            textInputProps={{ keyboardAppearance: 'dark' }}
            onChangeFormattedText={(text) => {
              onChange(text);
              setIsPhoneValid(phoneRef.current?.isValidNumber(text) || false);
            }}
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.phoneTextContainer}
          />
        )}
      />

      <PasswordInput
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
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
