import React from 'react';
import {View} from 'react-native';

interface ColorDotProps {
  color: string;
  size?: number;
  style?: any;
}

export const ColorDot = ({color, size = 24, style}: ColorDotProps) => {
  return (
    <View
      style={[
        {
          height: size,
          width: size,
          borderRadius: size * 2,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
};
