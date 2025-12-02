import React from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import eye from '../../../assets/eye.png';
import closedEye from '../../../assets/closedEye.png';
import { styles } from './PasswordField.styles';

export interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secure: boolean;
  toggleSecure: () => void;
}

export default function PasswordField({
  value,
  onChangeText,
  placeholder,
  secure,
  toggleSecure,
}: PasswordInputProps) {
  const handleFocus = () => {
    setTimeout(() => {
      if (!value) {
        onChangeText('');
      }
    }, 0);
  };
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        secureTextEntry={secure}
        placeholder={placeholder}
        value={value ?? ''}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
        textContentType="none"
        autoComplete="off"
        onFocus={handleFocus}
      />

      <TouchableOpacity style={styles.eyeButton} onPress={toggleSecure}>
        <Image source={secure ? closedEye : eye} style={styles.eyeIcon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}
