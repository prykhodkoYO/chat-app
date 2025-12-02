import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/style';

export const styles = StyleSheet.create({
  container: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: COLORS.primaryDark,
    marginTop: 25,
    paddingBottom: 6,
  },
  countryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  flag: {
    fontSize: 26,
    marginRight: 6,
  },
  code: {
    fontSize: 18,
    color: COLORS.black,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: COLORS.black,
    paddingVertical: 6,
  },
});
