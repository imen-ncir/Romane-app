import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../../../constants';
import {buttons} from '../../../shared/styles';
import {getIcon} from '../../../assets/icons';

interface FacebookButtonProps {
  onPress: () => any;
  [x: string]: any;
}

export const FacebookButton = ({onPress, ...props}: FacebookButtonProps) => (
  <TouchableOpacity style={[styles.button]} onPress={onPress} {...props}>
    {getIcon('facebook', 24, Colors.white, false, styles.buttonIcon)}
    <Text style={[buttons.buttonText, styles.buttonText]}>facebook</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.facebookBlue,
    marginHorizontal: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '400',
    fontSize: 16,
  },
});
