import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../../constants';

export const typos = EStyleSheet.create({
  headerTitle: {
    fontFamily: '$font',
    fontSize: 36,
    fontWeight: '600',
    color: Colors.white,
    //TODO: Replace from layouts
  },
  sectionTitle: {
    fontFamily: '$font',
    fontSize: 16,
    fontWeight: '800',
    color: Colors.darkGray,
    marginBottom: 5,
  },
  paragraph: {
    fontFamily: '$font',
    fontSize: 14,
    fontWeight: '300',
    color: Colors.dark,
  },
  listItem: {
    fontFamily: '$font',
    fontSize: 16,
    fontWeight: '500',
    color: Colors.darkGray,
  },
});
