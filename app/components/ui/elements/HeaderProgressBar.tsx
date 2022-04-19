import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../../constants';
import { ProgressBar } from 'react-native-paper';

interface HeaderProgressBarProps {
  label: string;
  value: number;
  max: number;
  style?: any;
}

export const HeaderProgressBar = ({
  label,
  value,
  max,
  style,
  ...props
}: HeaderProgressBarProps) => {
  let percent = 0;
  if (max != 0 && value != 0) {
    percent = Math.floor((value * 100) / max) / 100;
  }
  return (
    <View style={style} {...props}>
      <Text style={styles.progressText}>{`${value} / ${max} ${label}`}</Text>
      <ProgressBar
        color={Colors.white}
        progress={percent}
        style={styles.progress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progress: {
    height: 10,
    borderRadius: 8,
    backgroundColor: Colors.gray,
  },
  progressText: {
    color: Colors.white,
    fontSize: 12,
    marginBottom: 5,
  },
});
