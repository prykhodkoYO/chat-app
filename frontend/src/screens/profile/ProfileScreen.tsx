import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import userIcon from '../../../assets/user.png';
import pencilIcon from '../../../assets/pencil.png';

import NameField from '../../components/nameField/NameField';
import { styles } from './ProfileScreen.styles';
import { logout } from '../../api/auth';
import { updateProfile } from '../../api/user';
import { RootStackNavigation } from '../../types/navigation.types';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen = () => {
  const navigation = useNavigation<RootStackNavigation>();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const isNextDisabled = !name.trim() && !avatar;

  const handlePickAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        base64: false,
        aspect: [1, 1],
        allowsEditing: true,
        quality: 0.7,
      });

      if (result.canceled) return;

      let uri = result.assets[0].uri;

      const fileInfo = await fetch(uri);
      const blob = await fileInfo.blob();
      const sizeMB = blob.size / (1024 * 1024);

      if (sizeMB > 5) {
        Alert.alert('Error', 'The image is too large. Max size: 5 MB');
        return;
      }

      setUploading(true);

      const manipulated = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 500, height: 500 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
      );

      setAvatar(manipulated.uri);
      setUploading(false);
    } catch (err) {
      console.log('Pick error:', err);
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      if (avatar) {
        const formData = new FormData();

        const trimmedName = name.trim();
        if (trimmedName) {
          formData.append('name', trimmedName);
        }

        const file: {
          uri: string;
          name: string;
          type: string;
        } = {
          uri: avatar,
          name: 'avatar.jpg',
          type: 'image/jpeg',
        };

        formData.append('avatar', file as any);

        await updateProfile(formData);
      } else {
        await updateProfile({ name: name.trim() || null });
      }

      setSaving(false);
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (e: any) {
      console.log('Update error:', e.message);
      setSaving(false);
    }
  };

  const handleSkip = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  const handleLogout = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid={true}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <View style={styles.headerRight}>
            <Text style={styles.title}>Profile</Text>
          </View>
        </View>

        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            {uploading ? (
              <ActivityIndicator size="large" color="#666" />
            ) : (
              <Image
                source={avatar ? { uri: avatar } : userIcon}
                style={avatar ? styles.avatarFull : styles.avatarPlaceholder}
              />
            )}
          </View>

          <TouchableOpacity style={styles.editIconWrapper} onPress={handlePickAvatar}>
            <Image source={pencilIcon} style={styles.editIcon} />
          </TouchableOpacity>

          {!avatar && <Text style={styles.avatarHint}>Upload your avatar</Text>}
        </View>
      </View>

      <NameField value={name} onChangeText={setName} />

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextButton, isNextDisabled && styles.disabled]}
          disabled={isNextDisabled || saving}
          onPress={handleSave}
        >
          {saving ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.nextButtonIcon}>→</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ProfileScreen;
