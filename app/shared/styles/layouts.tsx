import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {ratio} from '../utils';

export const layouts = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  header: {
    paddingBottom: 30,
    alignContent: 'space-around',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: Colors.purple,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 5,
    shadowColor: Colors.darkGray,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 5},
    zIndex: 10,
    marginBottom: 10,
  },
  headerTitle: {
    textAlign: 'left',
    fontSize: 32 * ratio,
    fontWeight: '600',
    color: Colors.white,
    alignItems: 'center',
    alignContent: 'center',
  },
  section: {
    width: '100%',
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
