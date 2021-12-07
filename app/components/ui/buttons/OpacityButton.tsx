import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {getIcon} from '../../../assets/icons';
import {Colors} from '../../../constants';
import {theme} from '../../../shared/styles/theme';

interface OpacityButtonProps {
  text: string;
  icon?: string;
  onPress: () => any;
  style?: any;
  color?: string;
  disabled?: boolean;
}

export const OpacityButton = ({
  text,
  icon,
  disabled,
  onPress,
  style,
  color = Colors.darkGray,
}: OpacityButtonProps) => (
  <TouchableOpacity
    disabled={disabled}
    style={[styles.button, {opacity: disabled ? 0.5 : 1}, style]}
    onPress={onPress}>
    {icon && getIcon(icon, 24, color, false, styles.icon)}
    <Text style={[theme.buttonText, styles.buttonText, {color: color}]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  buttonText: {
    color: Colors.darkGray,
  },
});
