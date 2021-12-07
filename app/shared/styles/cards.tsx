import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';

export const cards = StyleSheet.create({
  card: {
    alignContent: 'center',
    textAlign: 'center',
    padding: 20,
    margin: 10,
    backgroundColor: Colors.white,
    borderRadius: 25,
    elevation: 5,
    shadowColor: Colors.darkGray,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {height: 5, width: 0},
  },
  cardTitle: {
    marginTop: 10,
    marginBottom: 20,
    color: Colors.darkGray,
    fontFamily: 'Arial',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
});
