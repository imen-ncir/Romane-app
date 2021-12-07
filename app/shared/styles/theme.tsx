import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../../constants';

export const theme = EStyleSheet.create({
  title: {
    fontFamily: '$font',
    color: Colors.white,
    fontWeight: '600',
    fontSize: '3rem',
  },
  h1: {
    fontFamily: '$font',
    color: Colors.white,
    fontWeight: '600',
    fontSize: '2rem',
  },
  h2: {
    fontFamily: '$font',
    color: Colors.white,
    fontWeight: '600',
    fontSize: '1.5rem',
  },
  h3: {
    fontFamily: '$font',
    color: Colors.white,
    fontWeight: '600',
    fontSize: '1.3rem',
  },
  h4: {
    fontFamily: '$font',
    color: Colors.white,
    fontWeight: 'normal',
    fontSize: '1.1rem',
  },
  paragraph: {
    fontFamily: '$font',
    color: '$black',
    fontWeight: 'normal',
    fontSize: '0.8rem',
  },
  tiny: {
    fontFamily: '$font',
    color: '$white',
    fontWeight: 'normal',
    fontSize: '0.7rem',
  },
  text: {
    fontFamily: '$font',
    color: '$black',
    fontWeight: 'normal',
    fontSize: '0.9rem',
  },
  buttonText: {
    fontFamily: '$font',
    color: Colors.white,
    fontWeight: '600',
    fontSize: '1.1rem',
  },
  inputText: {
    fontFamily: '$font',
    color: '$black',
    fontWeight: 'normal',
    fontSize: '1rem',
  },
  error: {
    fontFamily: '$font',
    color: Colors.googleRed,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'normal',
    fontSize: '0.9rem',
  },
});
