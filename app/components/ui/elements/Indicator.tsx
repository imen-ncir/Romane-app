import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from '../../../constants';
import {theme} from '../../../shared/styles/theme';

interface IndicatorProps {
  label: string;
  value: string;
  style?: any;
}

export const Indicator = ({label, value, style}: IndicatorProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[theme.h3, styles.value]}>{value}</Text>
      <Text style={[theme.h4, styles.label]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    color: Colors.dark,
  },
  value: {
    color: Colors.darkGray,
    fontWeight: 'bold',
  },
});
