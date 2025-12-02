import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/style';


export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  flag: {
    fontSize: 28,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
  },
  closeBtn: {
    marginTop: 15,
    padding: 10,
  },
  closeText: {
    fontSize: 18,
    color: COLORS.primaryDark,
    textAlign: 'center',
  },
});