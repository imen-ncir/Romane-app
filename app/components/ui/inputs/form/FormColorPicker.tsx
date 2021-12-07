import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../../constants';
import {FormLabel} from '.';
import {ColorPicker, ColorPickerProps} from '../../elements';

interface FormColorPickerProps extends ColorPickerProps {
  name: string;
  errors: any;
  label?: string;
  containerStyle?: any;
  [x: string]: any;
}

export const FormColorPicker = ({
  label,
  name,
  errors,
  containerStyle,
  ...props
}: FormColorPickerProps) => {
  const isOnError = errors[name];
  return (
    <View style={[containerStyle]}>
      {label && <FormLabel label={label} />}
      <ColorPicker style={isOnError ? styles.onError : null} {...props} />
      {isOnError && <Text style={styles.error}>{errors[name].message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: Colors.googleRed,
    textAlign: 'center',
    marginTop: 5,
  },
  onError: {
    borderWidth: 1,
    borderColor: Colors.googleRed,
  },
});
