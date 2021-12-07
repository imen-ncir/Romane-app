import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors} from '../../../../constants';
import {layouts} from '../../../../shared/styles';
import {BaseCard} from './BaseCard';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

interface StatCardProps {
  label: string;
  value: number;
  max: number;
  reversePercent?: boolean;
  style?: any;
  color?: string;
}

export const StatCard = ({
  label,
  value,
  max,
  color = Colors.purple,
  reversePercent = false,
  style,
  ...props
}: StatCardProps) => {
  let percent = !reversePercent
    ? Math.floor((value * 100) / max)
    : Math.floor(((max - value) * 100) / max);

  if (isNaN(percent)) percent = 0;

  return (
    <BaseCard style={[layouts.row, styles.container, style]} {...props}>
      <View style={styles.gauge}>
        <AnimatedCircularProgress
          size={58}
          width={8}
          rotation={-180}
          fill={percent}
          tintColor={color}
          lineCap={'round'}
          backgroundColor={Colors.mediumGray}>
          {() => (
            <Text style={[styles.gaugeText, {color: color}]}>{percent}%</Text>
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={styles.values}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{`${value}/${max}`}</Text>
      </View>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  gauge: {},
  gaugeText: {
    fontWeight: 'bold',
  },
  values: {},
  label: {
    color: Colors.gray,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
});
