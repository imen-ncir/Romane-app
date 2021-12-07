import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';

export const buttons = StyleSheet.create({
  button: {
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 32,
    shadowColor: Colors.purple,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Helvetica',
    fontWeight: '800',
  },
});
