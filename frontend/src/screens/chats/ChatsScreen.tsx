import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import { styles } from './ChatsScreen.styles';
import { useNavigation } from '@react-navigation/native';
import chat from '../../../assets/chat.png';
import chatGroup from '../../../assets/chatGroup.png';
import chatUser from '../../../assets/chatUser.png';
import plus from '../../../assets/plus.png';
import search from '../../../assets/search.png';
import logo from '../../../assets/logo.png';
import { RootStackNavigation } from '../../types/navigation.types';
import { logout } from '../../api/auth';

export default function ChatsScreen() {
  const navigation = useNavigation<RootStackNavigation>();
  const [popupVisible, setPopupVisible] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Image source={logo} style={styles.logoIcon} />
          <Text style={styles.logoText}>My-Chat</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Image source={search} style={styles.headerIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setPopupVisible(true)}>
            <Image source={plus} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal transparent visible={popupVisible} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popup}>
            <TouchableOpacity style={styles.popupItem}>
              <Text style={styles.popupText}>Create chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.popupItem}>
              <Text style={styles.popupText}>Create group</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closePopup} onPress={() => setPopupVisible(false)}>
              <Text style={styles.closePopupText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.content}>
        <View style={{ height: 800 }} />
      </ScrollView>

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => navigation.navigate('Chats')} style={styles.tabItem}>
          <Image source={chat} style={styles.tabIcon} />
          <Text style={styles.tabText}>Chats</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={chatGroup} style={styles.tabIcon} />
          <Text style={styles.tabText}>Groups</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.tabItem}>
          <Image source={chatUser} style={styles.tabIcon} />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
