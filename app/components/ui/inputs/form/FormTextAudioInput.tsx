import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextAudioInput, TextAudioInputProps} from '../classic';
import {Colors} from '../../../../constants';
import {FormLabel} from '.';

interface FormTextAudioInputProps extends TextAudioInputProps {
  name: string;
  errors: any;
  label?: string;
  wrapperStyle?: any;
  inputStyle?: any;
  isPassword?: boolean;
  [x: string]: any;
}

export const FormTextAudioInput = ({
  name,
  errors,
  label,
  wrapperStyle,
  inputStyle,
  isPassword,
  ...props
}: FormTextAudioInputProps) => {
  return (
    <View style={wrapperStyle}>
      {label && <FormLabel label={label} />}
      <TextAudioInput
        isOnError={!!errors[name]}
        secureTextEntry={isPassword}
        style={inputStyle}
        {...props}
      />
      {errors[name] && <Text style={styles.error}>{errors[name].message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: Colors.googleRed,
    textAlign: 'center',
    marginTop: 5,
  },
});
