import React from 'react';
import { View, TextInput, Image } from 'react-native';
import { styles } from './NameField.styles';
import userIcon from '../../../assets/user.png';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function NameField({ value, onChangeText, placeholder }: Props) {
  return (
    <View style={styles.container}>
      <Image source={userIcon} style={styles.leftIcon} />

      <TextInput
        style={styles.input}
        placeholder={placeholder || 'Enter your name'}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
      />
    </View>
  );
}
