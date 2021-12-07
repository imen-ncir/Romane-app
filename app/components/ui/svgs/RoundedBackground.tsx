import React from 'react';
import {View} from 'react-native';
import Svg, {Ellipse} from 'react-native-svg';
import {Colors} from '../../../constants';

interface RoundedBackgroundProps {
  customStyles?: any;
  customHeight?: number;
  customTop?: number;
  customColor?: string;
}

export const RoundedBackground = ({
  customStyles,
  customHeight,
  customColor,
}: RoundedBackgroundProps) => {
  return (
    <View style={customStyles}>
      <View style={{height: customHeight}}>
        <Svg
          viewBox="0 0 360 255"
          fill="none"
          // xmlns="http://www.w3.org/2000/svg"
        >
          <Ellipse
            cx="180"
            cy="81.5"
            rx="370"
            ry="173.5"
            fill={customColor || Colors.purple}
          />
        </Svg>
      </View>
    </View>
  );
};
