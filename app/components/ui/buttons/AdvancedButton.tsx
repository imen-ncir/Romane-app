import React from 'react';
import {Dimensions} from 'react-native';
import {IBaseButtonProps} from './BaseButton';
import {FloatingButton} from './FloatingButton';

const {width} = Dimensions.get('window');

interface AdvancedButtonProps extends IBaseButtonProps {
  style?: any;
  icon: string;
}

const btnSize = 32;
const navbarSize = 60;
export const AdvancedButton = ({
  icon,
  style,
  ...props
}: AdvancedButtonProps) => (
  <FloatingButton
    icon={icon}
    bottom={navbarSize / 2 + btnSize / 2}
    size={btnSize}
    left={width / 2 - btnSize}
    style={style}
    {...props}
  />
);
