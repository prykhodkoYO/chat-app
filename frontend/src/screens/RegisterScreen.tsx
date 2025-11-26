import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useForm, Controller } from 'react-hook-form';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import PasswordInput from '../components/PasswordInput';
import { styles } from './RegisterScreen.styles';
import { registerUser } from '../api/auth';

const MIN_PASSWORD_LENGTH = 6;

interface RegisterForm {
  phone: string;
  password: string;
  confirmPassword: string;
  remember: boolean;
}

const RegisterScreen = () => {
  const navigation: any = useNavigation();
  const phoneRef = useRef<PhoneInput>(null);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { control, handleSubmit, watch, setValue } = useForm<RegisterForm>({
    defaultValues: {
      phone: '',
      password: '',
      confirmPassword: '',
      remember: false,
    },
  });

  const phone = watch('phone');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
  const isConfirmValid =
    confirmPassword.length >= MIN_PASSWORD_LENGTH && password === confirmPassword;

  const isButtonDisabled = !isPhoneValid || !isPasswordValid || !isConfirmValid;

  const onSubmit = async () => {
    try {
      await registerUser({
        phone,
        password,
      });

      navigation.navigate('Profile');
    } catch (error: any) {
      Alert.alert('Registration error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.loginButton}>
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

      <PasswordInput
        value={confirmPassword}
        onChangeText={(val) => setValue('confirmPassword', val)}
        placeholder="Confirm Password"
        secure={!showConfirm}
        toggleSecure={() => setShowConfirm(!showConfirm)}
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

export default RegisterScreen;
