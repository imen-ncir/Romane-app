import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../../constants';
import {layouts} from '../../../shared/styles';
import {StatCard} from './cards';

interface SuccessFailureBarProps {
  successValue: number;
  failureValue: number;
  total: number;
  style?: any;
}

export const SuccessFailureBar = ({
  successValue,
  failureValue,
  total,
  style,
  ...props
}: SuccessFailureBarProps) => {
  return (
    <View style={[layouts.row, style]} {...props}>
      <StatCard
        label={'Réussite'}
        value={successValue}
        max={total}
        color={Colors.green}
        style={styles.statCard}
      />
      <StatCard
        label={'Echec'}
        value={failureValue}
        max={total}
        color={Colors.red}
        style={styles.statCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statCard: {
    flex: 0.48,
  },
});
