import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Colors} from '../../../constants';
import {app, layouts} from '../../../shared/styles';
import {CustomStatusBar, status_mode} from './CustomStatusBar';

interface HeaderProps {
  children?: any;
  backgroundColor?: string;
  imageSource?: any;
  statusMode?: status_mode;
  style?: any;
}

export const Header = ({
  children,
  backgroundColor = Colors.purple,
  statusMode = 'light',
  imageSource,
  style,
}: HeaderProps) => (
  <ImageBackground
    source={imageSource}
    style={[layouts.header, {backgroundColor: backgroundColor}, style]}
    imageStyle={[app.coverImage, styles.image]}>
    <CustomStatusBar mode={statusMode} />
    {children}
  </ImageBackground>
);

const styles = StyleSheet.create({
  image: {
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
  },
});
