import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return <AppNavigator />
}

