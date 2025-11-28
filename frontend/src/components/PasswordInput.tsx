import React from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import eye from '../../assets/eye.png';
import closedEye from '../../assets/closedEye.png';

export interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secure: boolean;
  toggleSecure: () => void;
}

export default function PasswordInput({
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

const styles = StyleSheet.create({
  wrapper: {
    width: '85%',
    marginTop: 25,
    borderBottomWidth: 2,
    borderColor: '#007ACC',
    paddingBottom: 4,
    position: 'relative',
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#000',
  },
  eyeButton: {
    position: 'absolute',
    right: 5,
    top: 8,
    padding: 4,
  },
  eyeIcon: {
    width: 22,
    height: 22,
  },
});
