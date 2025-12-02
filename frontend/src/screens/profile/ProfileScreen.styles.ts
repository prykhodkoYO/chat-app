import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/style';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },

  header: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingTop: SIZES.headerPaddingTop,
    paddingBottom: SIZES.headerPaddingBottomProfile,
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
    paddingRight: 10,
  },

  title: {
    fontSize: FONTS.title,
    fontWeight: '700',
    color: COLORS.white,
  },

  avatarWrapper: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarCircle: {
    width: SIZES.avatarSize,
    height: SIZES.avatarSize,
    borderRadius: SIZES.avatarSize / 2,
    backgroundColor: COLORS.avatarBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

  editIconWrapper: {
    position: 'absolute',
    bottom: 5,
    right: '35%',
    backgroundColor: COLORS.avatarDark,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  editIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },

  headerSpacer: {
    width: '100%',
    height: SIZES.spacerHeightProfile,
    backgroundColor: COLORS.background,
  },

  inputRow: {
    width: SIZES.inputWidth,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    borderBottomWidth: 2,
    borderColor: COLORS.primary,
    paddingBottom: 3,
  },

  inputLeftIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },

  input: {
    flex: 1,
    fontSize: FONTS.text,
  },

  rowButtons: {
    width: SIZES.inputWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },

  skipButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: SIZES.radiusM,
  },

  skipButtonText: {
    color: COLORS.primary,
    fontSize: FONTS.text,
    fontWeight: '600',
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

  avatarHint: {
    marginTop: 8,
    color: '#eeeeee',
    fontSize: 14,
  },

  logoutButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: SIZES.radiusM,
  },
  logoutText: {
    color: COLORS.primary,
    fontSize: FONTS.text,
    fontWeight: '600',
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },

  nextButton: {
    width: 55,
    height: 55,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextButtonIcon: {
    fontSize: 26,
    color: COLORS.white,
  },
});
