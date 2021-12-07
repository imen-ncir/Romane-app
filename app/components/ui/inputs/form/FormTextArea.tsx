import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Controller} from 'react-hook-form';
import {TextArea} from '../classic';
import {Colors} from '../../../../constants';
import {FormLabel} from '.';

interface FormTextAreaProps {
  name: string;
  control: any;
  errors: any;
  withMessage?: boolean;
  label?: string;
  wrapperStyle?: any;
  inputStyle?: any;
  isPassword?: boolean;
  [x: string]: any;
}

export const FormTextArea = ({
  name,
  control,
  errors,
  label,
  wrapperStyle,
  inputStyle,
  isPassword,
  withMessage = true,
  ...props
}: FormTextAreaProps) => {
  return (
    <View style={wrapperStyle}>
      {label && <FormLabel label={label} />}
      <Controller
        control={control}
        render={({field: {onChange, onBlur}}) => (
          
          <TextArea
            onBlur={onBlur}
            onChangeText={(value: any) => onChange(value)}
            isOnError={!!errors[name]}
            secureTextEntry={isPassword}
            style={inputStyle}
            {...props}
          />
        )}
        name={name}
      />
      {withMessage && errors[name] && (
        <Text style={styles.error}>{errors[name].message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: Colors.googleRed,
    textAlign: 'center',
    // marginTop: 5,
  },
});
