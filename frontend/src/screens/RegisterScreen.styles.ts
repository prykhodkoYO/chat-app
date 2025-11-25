import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },

  header: {
    backgroundColor: '#00a6ff',
    width: '100%',
    paddingTop: 70,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  loginButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 2,
  },

  loginButtonText: {
    color: '#00a6ff',
    fontSize: 16,
    fontWeight: '600',
  },

  headerRight: {
    alignItems: 'flex-end',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },

  subtitle: {
    fontSize: 18,
    marginTop: 5,
    color: '#e8f7ff',
  },

  headerSpacer: {
    width: '100%',
    height: 60,
    backgroundColor: '#F7FBFF',
  },

  phoneContainer: {
    width: '85%',
    marginTop: 40,
    borderBottomWidth: 2,
    borderColor: '#00a6ff',
    paddingBottom: 3,
  },

  phoneTextContainer: {
    backgroundColor: 'transparent',
  },

  row: {
    width: '85%',
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
    fontSize: 16,
  },

  button: {
    backgroundColor: '#00a6ff',
    width: 60,
    height: 60,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabled: {
    opacity: 0.4,
  },

  buttonIcon: {
    fontSize: 30,
    color: 'white',
  },
});