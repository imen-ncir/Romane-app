import React from 'react';
import {View, Text} from 'react-native';
import {displayName as appName, version} from '../../../config/app.json';
import Config from 'react-native-config';
import EStyleSheet from 'react-native-extended-stylesheet';
import {theme} from '../../../shared/styles/theme';

export const SplashLoader = () => {
  return (
    <View style={[styles.wrapper]}>
      <Text style={theme.title}>{appName}</Text>
      <Text style={theme.h4}>{Config.ENV_NAME}</Text>
      <Text style={theme.h4}>v{version}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '$primary',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
