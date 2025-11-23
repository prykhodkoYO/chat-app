import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const ProfileScreen = () => {
  const [name, setName] = useState('');

  const isNextDisabled = name.trim().length === 0;

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
            <Text style={styles.avatarIcon}>👤</Text>
          </View>

          <View style={styles.editIconWrapper}>
            <Text style={styles.editIcon}>✏️</Text>
          </View>
        </View>
      </View>

      <View style={styles.headerSpacer} />

      <View style={styles.inputRow}>
        <Text style={styles.inputLeftIcon}>👤</Text>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },

  header: {
    backgroundColor: '#00a6ff',
    width: '100%',
    paddingTop: 70,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  loginButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },

  loginButtonText: {
    color: '#00a6ff',
    fontSize: 16,
    fontWeight: '600',
  },

  headerRight: {
    paddingRight: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },

  avatarWrapper: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#34cfff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarIcon: {
    fontSize: 50,
    color: 'white',
  },

  editIconWrapper: {
    position: 'absolute',
    bottom: 5,
    right: '35%',
    backgroundColor: '#003b78',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  editIcon: {
    fontSize: 18,
    color: 'white',
  },

  headerSpacer: {
    width: '100%',
    height: 70,
    backgroundColor: '#F7FBFF',
  },

  inputRow: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    borderBottomWidth: 2,
    borderColor: '#00a6ff',
    paddingBottom: 3,
  },

  inputLeftIcon: {
    fontSize: 20,
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  buttonWrapper: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 25,
  },

  button: {
    backgroundColor: '#00a6ff',
    width: 60,
    height: 60,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonIcon: {
    fontSize: 30,
    color: '#ffffff',
  },
  rowButtons: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },

  skipButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },

  skipButtonText: {
    color: '#00a6ff',
    fontSize: 16,
    fontWeight: '600',
  },

  disabled: {
    opacity: 0.4,
  },
});
