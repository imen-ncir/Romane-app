import React from 'react';
import {View} from 'react-native';
import {MultipleTextAudioInput, MultipleTextAudioInputProps} from '../classic';
import {FormLabel} from '.';

interface FormMultipleTextAudioInputProps extends MultipleTextAudioInputProps {
  name: string;
  label?: string;
  wrapperStyle?: any;
  inputStyle?: any;
  isPassword?: boolean;
  [x: string]: any;
}

export const FormMultipleTextAudioInput = ({
  label,
  wrapperStyle,
  inputStyle,
  isPassword,
  ...props
}: FormMultipleTextAudioInputProps) => {
  return (
    <View style={wrapperStyle}>
      {label && <FormLabel label={label} />}
      <MultipleTextAudioInput
        secureTextEntry={isPassword}
        style={inputStyle}
        {...props}
      />
    </View>
  );
};
