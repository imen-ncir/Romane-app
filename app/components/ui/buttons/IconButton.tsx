import React from 'react';
import {getIcon} from '../../../assets/icons';
import {BaseButton, IBaseButtonProps} from './BaseButton';

interface IconButtonProps extends IBaseButtonProps {
  style?: any;
  icon: string;
  iconColor?: string;
  size?: number;
  [x: string]: any;
}

export const IconButton = ({
  icon,
  size = 24,
  iconColor,
  style,
  ...props
}: IconButtonProps) => (
  <BaseButton style={[style]} {...props}>
    {getIcon(icon, size, iconColor)}
  </BaseButton>
);
