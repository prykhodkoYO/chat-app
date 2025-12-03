import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/style';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 30,
  },

  logoutButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: SIZES.radiusM,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  logoutButtonText: {
    color: COLORS.primary,
    fontSize: FONTS.text,
    fontWeight: '600',
  },
});
