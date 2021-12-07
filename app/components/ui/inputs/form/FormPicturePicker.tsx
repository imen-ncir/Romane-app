import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../../constants';
import {FormLabel} from '.';
import {PicturePickerProps, PicturePicker} from '../../elements';

interface FormPicturePickerProps extends PicturePickerProps {
  label?: string;
  name: string;
  errors: any;
  containerStyle?: any;
  [x: string]: any;
}

export const FormPicturePicker = ({
  label,
  name,
  errors,
  containerStyle,
  ...props
}: FormPicturePickerProps) => {
  const isOnError = errors[name];
  return (
    <View style={[containerStyle]}>
      {label && <FormLabel label={label} />}
      <PicturePicker style={isOnError ? styles.onError : null} {...props} />
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
