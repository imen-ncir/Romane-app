import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {Colors} from '../../../constants';

interface ContentLoaderProps {}

const {width, height} = Dimensions.get('screen');

export const ContentLoader = ({}: ContentLoaderProps) => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator
        style={[styles.loader]}
        color={Colors.white}
        size="large"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.purple,
  },
  loader: {
    width: 100,
    height: 100,
  },
});
