import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Colors} from '../../../constants';

export interface IBaseButtonProps {
  onPress: any;
  style?: any;
  disabled?: boolean;
  loading?: boolean;
  fullwidth?: boolean;
  children?: any;
}

export const BaseButton = ({
  onPress,
  style,
  disabled,
  fullwidth,
  children,
  loading,
  ...props
}: IBaseButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled || loading ? styles.disabled : null,
        {width: fullwidth ? '100%' : 'auto'},
        style,
      ]}
      disabled={disabled || loading}
      onPress={onPress}
      {...props}>
      {loading ? <ActivityIndicator color={Colors.white} /> : children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    minHeight: 40,
    minWidth: 40,
    borderRadius: 32,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
    shadowColor: Colors.purple,
    backgroundColor: Colors.purple,
  },
  disabled: {
    opacity: 0.5,
  },
});
