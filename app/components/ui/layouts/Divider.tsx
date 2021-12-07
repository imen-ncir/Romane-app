import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../../constants';

interface DividerProps {
  color?: string;
  thickness?: number;
  margin?: number;
}

export const Divider = ({
  color = Colors.mediumGray,
  thickness = 1,
  margin = 20,
}: DividerProps) => (
  <View
    style={[
      styles.divider,
      {height: thickness, backgroundColor: color, marginVertical: margin},
    ]}
  />
);

const styles = StyleSheet.create({
  divider: {},
});
