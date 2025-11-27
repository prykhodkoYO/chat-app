import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

import userIcon from '../../assets/user.png';
import pencil from '../../assets/pencil.png';

import { styles } from './ProfileScreen.styles';
import { logout } from '../api/auth';
import { updateProfile } from '../api/user';

const ProfileScreen = () => {
  const navigation: any = useNavigation();

  const [name, setName] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const isNextDisabled = !name.trim() || isSaving;

  const handleLogout = async () => {
    await logout();

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const pickAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setAvatarUri(asset.uri);

        if (asset.base64) {
          setAvatarBase64(`data:image/jpeg;base64,${asset.base64}`);
        } else {
          setAvatarBase64(null);
        }
      }
    } catch (e: any) {
      console.log('Image picker error', e);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSave = async () => {
    if (!name.trim()) return;

    try {
      setIsSaving(true);

      await updateProfile({
        name: name.trim(),
        avatar: avatarBase64 ?? undefined,
      });

      navigation.navigate('Home' as never);
    } catch (e: any) {
      console.log('Profile update error', e);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Home' as never);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
            <Text style={styles.loginButtonText}>Logout</Text>
          </TouchableOpacity>

          <View style={styles.headerRight}>
            <Text style={styles.title}>Profile</Text>
          </View>
        </View>

        <View style={styles.avatarWrapper}>
          <TouchableOpacity onPress={pickAvatar}>
            <View style={styles.avatarCircle}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatarIcon} />
              ) : (
                <Image source={userIcon} style={styles.avatarIcon} />
              )}
            </View>
          </TouchableOpacity>

          <View style={styles.editIconWrapper}>
            <Image source={pencil} style={styles.editIcon} />
          </View>
        </View>
      </View>

      <View style={styles.headerSpacer} />

      <View style={styles.inputRow}>
        <Image source={userIcon} style={styles.inputLeftIcon} />

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
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isNextDisabled && styles.disabled]}
          disabled={isNextDisabled}
          onPress={handleSave}
        >
          <Text style={styles.buttonIcon}>{isSaving ? '…' : '→'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;
