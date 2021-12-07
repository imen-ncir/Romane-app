import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../../constants/colors';

export const inputs = EStyleSheet.create({
  input: {
    fontFamily: '$font',
    backgroundColor: Colors.mediumGray,
    color: Colors.darkGray,
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 24,
  },
  textArea: {
    fontFamily: '$font',
    backgroundColor: Colors.mediumGray,
    color: Colors.darkGray,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    fontSize: 18,
    borderRadius: 12,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  cardInput: {
    fontFamily: '$font',
    borderRadius: 10,
    paddingLeft: 20,
    textAlign: 'left',
    backgroundColor: Colors.white,
    shadowColor: Colors.gray,
    elevation: 3,
    shadowOffset: {height: 3, width: 0},
    shadowRadius: 5,
    shadowOpacity: 2,
    fontSize: 16,
  },
  onError: {
    fontFamily: '$font',
    borderWidth: 1,
    borderColor: Colors.googleRed,
  },
});
