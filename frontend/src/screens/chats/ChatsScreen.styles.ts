import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/style';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginRight: 10,
  },

  logoText: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.white,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  headerIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginLeft: 20,
  },

  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  popup: {
    width: 220,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
  },

  popupItem: {
    paddingVertical: 12,
  },

  popupText: {
    fontSize: 18,
  },

  closePopup: {
    marginTop: 10,
    paddingVertical: 10,
  },

  closePopupText: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.accentBlue,
  },

  content: {
    flex: 1,
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 25,
    borderTopWidth: 1,
    borderColor: COLORS.accentBlue,
    backgroundColor: COLORS.white,
  },

  tabItem: {
    alignItems: 'center',
  },

  tabIcon: {
    width: 35,
    height: 35,
  },

  tabIconActive: {
    fontSize: 20,
    color: '#0B75E0',
  },

  tabText: {
    fontSize: 12,
    color: COLORS.black,
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
});
