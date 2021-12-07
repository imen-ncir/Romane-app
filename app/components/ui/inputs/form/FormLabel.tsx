import React from 'react';
import {Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../../../../constants';

interface FormLabelProps {
  label: string;
}
export const FormLabel = ({label}: FormLabelProps) => {
  return <Text style={styles.label}>{label}</Text>;
};
const styles = EStyleSheet.create({
  label: {
    fontFamily: '$font',
    color: Colors.darkGray,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,
  },
});
