import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from '../../../constants';
import {app} from '../../../shared/styles';

interface MoneyTagProps {
  value: number;
  style?: any;
  textStyle?: any;
  onPress?: any;
}

export const MoneyTag = ({
  value,
  style,
  textStyle,
  ...props
}: MoneyTagProps) => {
  return (
    <View style={[styles.tag, style]} {...props}>
      <Text style={[app.text, styles.tagText, textStyle]}>{`${value} €`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Colors.white,
    minWidth: 72,
    width: 'auto',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 32,
    alignItems: 'center',
    elevation: 3,
    shadowColor: Colors.darkGray,
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowOffset: {height: 3, width: 0},
  },
  tagText: {
    color: Colors.purple,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
  },
});
