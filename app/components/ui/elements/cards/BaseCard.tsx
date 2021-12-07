import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../../../constants';
import {app} from '../../../../shared/styles';

export interface BaseCardProps {
  style?: any;
  children?: any;
}

export const BaseCard = ({style, children}: BaseCardProps) => {
  return <View style={[app.softShadows, styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 10,
  },
});
