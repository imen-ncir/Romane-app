import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from '../../../../constants';
import {inputs} from '../../../../shared/styles';

interface TextAreaProps {
  style?: any;
  isOnError?: boolean;
  [x: string]: any;
}

export const TextArea = ({style, isOnError, ...props}: TextAreaProps) => {
  return (
    <TextInput
      style={[inputs.textArea, isOnError ? inputs.onError : {}, style]}
      placeholderTextColor={isOnError ? Colors.googleRed : Colors.darkGray}
      autoCapitalize="none"
      numberOfLines={5}
      returnKeyType="done"
      blurOnSubmit={true}
      multiline={true}
      autoCorrect={false}
      {...props}
    />
  );
};
