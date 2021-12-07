import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../../../constants';
import {buttons} from '../../../shared/styles';
import {getIcon} from '../../../assets/icons';

interface GoogleButtonProps {
  onPress: () => any;
  [x: string]: any;
}

export const GoogleButton = ({onPress, ...props}: GoogleButtonProps) => (
  <TouchableOpacity style={[styles.button]} onPress={onPress} {...props}>
    {getIcon('google', 24, Colors.googleRed, false, styles.buttonIcon)}
    <Text style={[buttons.buttonText, styles.buttonText]}>Google</Text>
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
    backgroundColor: Colors.white,
    shadowRadius: 2,
    shadowColor: Colors.darkGray,
    shadowOpacity: 0.3,
    shadowOffset: {height: 2, width: 0},
    marginHorizontal: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: Colors.darkGray,
    fontWeight: '400',
    fontSize: 16,
  },
});
