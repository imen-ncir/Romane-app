import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {getIcon} from '../../../assets/icons';
import {Colors} from '../../../constants';
import {buttons} from '../../../shared/styles';

interface PrimaryButtonProps {
  text: string;
  icon?: string;
  onPress: () => any;
  style?: any;
  [x: string]: any;
}

export const PrimaryButton = ({
  text,
  icon,
  onPress,
  style,
  ...props
}: PrimaryButtonProps) => (
  <TouchableOpacity
    style={[buttons.button, styles.button, style]}
    onPress={onPress}
    {...props}>
    {icon && getIcon(icon, 24, Colors.white, false, {marginRight: 10})}
    <Text style={[buttons.buttonText, {color: styles.buttonText.color}]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.purple,
    flexDirection: 'row',
  },
  buttonText: {
    color: Colors.white,
  },
});
