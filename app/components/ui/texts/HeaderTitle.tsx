import React from 'react';
import {Text} from 'react-native';
import {theme} from '../../../shared/styles/theme';

interface HeaderTitleProps {
  title: string;
  style?: any;
}

export const HeaderTitle = ({title, style}: HeaderTitleProps) => {
  return (
    <Text style={[theme.h2, style]} numberOfLines={2}>
      {title}
    </Text>
  );
};
