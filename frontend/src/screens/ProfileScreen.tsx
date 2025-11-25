import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import user from '../../assets/user.png';
import pencil from '../../assets/pencil.png';
import { styles } from './ProfileScreen.styles';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  const isNextDisabled = !name.trim();

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
          </View>
        </View>

        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            <Image source={user} style={styles.avatarIcon} />
          </View>

          <View style={styles.editIconWrapper}>
            <Image source={pencil} style={styles.editIcon} />
          </View>
        </View>
      </View>

      <View style={styles.headerSpacer} />

      <View style={styles.inputRow}>
        <Image source={user} style={styles.inputLeftIcon} />

        <TextInput
          placeholder="Your Name"
          placeholderTextColor="#999"
          style={styles.input}
          keyboardAppearance="dark"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.rowButtons}>
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isNextDisabled && styles.disabled]}
          disabled={isNextDisabled}
        >
          <Text style={styles.buttonIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;
