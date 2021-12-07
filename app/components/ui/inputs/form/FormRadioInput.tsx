import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../../constants';
import {FormLabel} from '.';
import {RadioInput, RadioInputProps} from '../classic/RadioInput';

interface FormRadioInputProps extends RadioInputProps {
  name: string;
  errors: any;
  label?: string;
  containerStyle?: any;
  withMessage?: boolean;
}

export const FormRadioInput = ({
  label,
  name,
  errors,
  containerStyle,
  withMessage = true,
  style,
  ...props
}: FormRadioInputProps) => {
  const isOnError = errors[name];
  return (
    <View style={[containerStyle]}>
      {label && <FormLabel label={label} />}
      <RadioInput
        style={[isOnError ? styles.onError : null, style]}
        {...props}
      />
      {withMessage && isOnError && (
        <Text style={styles.error}>{errors[name].message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: Colors.googleRed,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  onError: {
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 16,
    paddingBottom: -10,
    borderColor: Colors.googleRed,
  },
});
