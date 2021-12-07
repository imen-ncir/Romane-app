import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../../constants';
import {FormLabel} from '.';
import {BackgroundPickerProps, BackgroundPicker} from '../../elements';

interface FormBackgroundPickerProps extends BackgroundPickerProps {
  label?: string;
  name: string;
  folder: string;
  errors: any;
  containerStyle?: any;
  [x: string]: any;
}

export const FormBackgroundPicker = ({
  label,
  name,
  folder,
  errors,
  containerStyle,
  ...props
}: FormBackgroundPickerProps) => {
  const isOnError = errors[name];
  return (
    <View style={[containerStyle]}>
      {label && <FormLabel label={label} />}
      <BackgroundPicker
        folder={folder}
        style={isOnError ? styles.onError : null}
        {...props}
      />
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
