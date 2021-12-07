import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../../../constants';
import {buttons} from '../../../shared/styles';

interface InvertedButtonProps {
  text: string;
  onPress: () => any;
  [x: string]: any;
}

export const InvertedButton = ({
  text,
  onPress,
  ...props
}: InvertedButtonProps) => (
  <TouchableOpacity
    style={[buttons.button, styles.button]}
    onPress={onPress}
    {...props}>
    <Text style={[buttons.buttonText, styles.buttonText]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.lightGray,
  },
  buttonText: {
    color: Colors.purple,
  },
});
