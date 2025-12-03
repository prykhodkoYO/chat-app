import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/style';

export const styles = StyleSheet.create({
  wrapper: {
    width: '85%',
    marginTop: 25,
    borderBottomWidth: 2,
    borderColor: COLORS.primaryDark,
    paddingBottom: 4,
    position: 'relative',
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    color: COLORS.black,
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
