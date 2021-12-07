import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../constants';

interface ModalLoaderProps {
  message?: string;
  opacity?: number;
}
export const ModalLoader = ({
  message = 'Chargement',
  opacity = 1,
}: ModalLoaderProps) => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator
        style={[styles.loader, {opacity}]}
        color={Colors.white}
        size="large"
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.purple,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loader: {
    marginVertical: 20,
  },
  text: {
    fontFamily: 'Helvetica',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
  },
});
