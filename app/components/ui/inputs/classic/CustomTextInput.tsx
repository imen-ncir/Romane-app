import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from '../../../../constants';
import {inputs} from '../../../../shared/styles';
interface CustomInputProps {
  style?: any;
  isOnError?: boolean;
  [x: string]: any;
}

export const CustomTextInput = ({
  style,
  isOnError,
  placeholder,
  ...props
}: CustomInputProps) => {
  return (
    <TextInput
      blurOnSubmit={true}
      returnKeyType="done"
      style={[inputs.input, isOnError ? inputs.onError : {}, style]}
      placeholderTextColor={isOnError ? Colors.googleRed : Colors.darkGray}
      placeholder={placeholder}
      autoCapitalize="none"
      autoCorrect={false}
      {...props}
    />
  );
};
