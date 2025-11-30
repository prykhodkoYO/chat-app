import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/style';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 150,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },

  header: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingTop: SIZES.headerPaddingTop,
    paddingBottom: SIZES.headerPaddingBottom,
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  loginButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: SIZES.radiusM,
  },

  loginButtonText: {
    color: COLORS.primary,
    fontSize: FONTS.text,
    fontWeight: '600',
  },

  headerRight: {
    alignItems: 'flex-end',
  },

  title: {
    fontSize: FONTS.title,
    fontWeight: '700',
    color: COLORS.white,
  },

  subtitle: {
    fontSize: FONTS.subtitle,
    marginTop: 5,
    color: COLORS.grayLight,
  },

  headerSpacer: {
    width: '100%',
    height: SIZES.spacerHeight,
    backgroundColor: COLORS.background,
  },

  row: {
    width: SIZES.inputWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
  },

  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkLabel: {
    marginLeft: 10,
    fontSize: FONTS.text,
  },

  button: {
    backgroundColor: COLORS.primary,
    width: SIZES.buttonSize,
    height: SIZES.buttonSize,
    borderRadius: SIZES.radiusL,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabled: {
    opacity: 0.4,
  },

  buttonIcon: {
    fontSize: 30,
    color: COLORS.white,
  },

  errorText: {
    color: 'red',
    marginTop: 4,
    marginBottom: 10,
    fontSize: 14,
  },
});
