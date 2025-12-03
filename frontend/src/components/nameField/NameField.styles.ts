import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/style';

export const styles = StyleSheet.create({
  container: {
    width: SIZES.inputWidth,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: COLORS.primary,
    paddingBottom: 3,
    marginTop: 25,
  },

  leftIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },

  input: {
    flex: 1,
    fontSize: FONTS.text,
    color: COLORS.black,
  },
});
