import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../../../constants';
import {buttons} from '../../../shared/styles';

interface InvertedButtonProps {
  text: string;
  onPress: () => any;
  [x: string]: any;
}

export const LinkButton = ({text, onPress, ...props}: InvertedButtonProps) => (
  <TouchableOpacity style={[styles.button]} onPress={onPress} {...props}>
    <Text style={[buttons.buttonText, styles.buttonText]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 32,
    backgroundColor: Colors.lightGray,
  },
  buttonText: {
    textDecorationLine: 'underline',
    color: Colors.purple,
    fontWeight: '400',
  },
});
