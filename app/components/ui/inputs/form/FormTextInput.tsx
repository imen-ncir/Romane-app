import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Controller} from 'react-hook-form';
import {CustomTextInput} from '../classic';
import {Colors} from '../../../../constants';
import {FormLabel} from '.';

interface FormTextInputProps {
  name: string;
  control: any;
  errors: any;
  label?: string;
  wrapperStyle?: any;
  inputStyle?: any;
  isPassword?: boolean;
  [x: string]: any;
}

export const FormTextInput = ({
  name,
  control,
  errors,
  label,
  wrapperStyle,
  inputStyle,
  isPassword,
  placeholder,
  ...props
}: FormTextInputProps) => {
  return (
    <View style={wrapperStyle}>
      {label && <FormLabel label={label} />}
      <Controller
        control={control}
        render={({field: {onChange, onBlur,value}}) => (
          <CustomTextInput
            onBlur={onBlur}
            onChangeText={(value: any) => onChange(value)}
            isOnError={!!errors[name]}
            secureTextEntry={isPassword}
            style={inputStyle}
            placeholder={placeholder}
            value={value}
            {...props}
          />
        )}
        name={name}
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
