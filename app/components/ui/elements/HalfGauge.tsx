import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Colors} from '../../../constants';

interface HalfGaugeProps {
  label?: string;
  value: number;
  style?: any;
  valueLabel?: string;
  unit?: string;
  color?: string;
  textColor?: string;
}

export const HalfGauge = ({
  label,
  value,
  valueLabel,
  color = Colors.purple,
  textColor = Colors.white,
  unit,
  style,
  ...props
}: HalfGaugeProps) => {
  return (
    <View style={[styles.container, style]}>
      <AnimatedCircularProgress
        size={256}
        width={12}
        rotation={-90}
        arcSweepAngle={180}
        fill={value}
        tintColor={color}
        lineCap={'round'}
        style={{flex: 1}}
        backgroundColor={Colors.gray}
        {...props}>
        {() => (
          <View style={styles.valueContainer}>
            <Text style={[styles.value, {color: textColor}]}>
              {valueLabel || value + ' ' + (unit || '')}
            </Text>
            <Text style={[styles.gaugeText, {color: textColor}]}>{label}</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  gauge: {},
  gaugeText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  label: {
    textAlign: 'center',
    color: Colors.gray,
  },
  valueContainer: {
    textAlign: 'center',
    marginTop: -80,
  },
  value: {
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
