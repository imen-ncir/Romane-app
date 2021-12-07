import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export const app = StyleSheet.create({
  text: {
    fontFamily: 'Poppins',
  },
  shadow: {
    elevation: 5,
    shadowColor: Colors.darkGray,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {height: 5, width: 0},
  },
  softShadows: {
    shadowColor: Colors.gray,
    elevation: 5,
    shadowOffset: {height: 3, width: 0},
    shadowRadius: 5,
    shadowOpacity: 2,
  },
  coverImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    // opacity: '0.5',
  },
});
