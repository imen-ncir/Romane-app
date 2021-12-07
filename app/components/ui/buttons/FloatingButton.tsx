import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants';
import {IBaseButtonProps} from './BaseButton';
import {IconButton} from './IconButton';

interface FloatingButtonProps extends IBaseButtonProps {
  icon: string;
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  size?: number;
  style?: any;
}

export const FloatingButton = ({
  icon,
  top = 'auto',
  bottom = 'auto',
  left = 'auto',
  right = 'auto',
  style,
  size,
  ...props
}: FloatingButtonProps) => (
  <IconButton
    icon={icon}
    size={size || 24}
    style={[
      styles.button,
      {
        top,
        left,
        right,
        bottom,
        width: size ? size * 2 : 52,
        height: size ? size * 2 : 52,
      },
      style,
    ]}
    {...props}
  />
);

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
    width: 52,
    height: 52,
    borderRadius: 50,
    backgroundColor: Colors.purple,
    shadowColor: Colors.darkGray,
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.7,
    shadowRadius: 7,
  },
  buttonIcon: {
    color: Colors.white,
  },
});
