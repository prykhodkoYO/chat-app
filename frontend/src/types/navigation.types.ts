import { NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  AuthLoading: undefined;
  Login: undefined;
  Registration: undefined;
  Profile: undefined;
};

export type RootStackNavigation = NavigationProp<RootStackParamList>;
