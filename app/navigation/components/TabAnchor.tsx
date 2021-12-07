import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {TabsShape} from './TabsShape';
import {Colors} from '../../constants';

const {width} = Dimensions.get('window');

interface TabAnchorProps {
  color?: string;
}
const tabWidth = width / 5;
export const TabAnchor = ({color = Colors.white}: TabAnchorProps) => {
  return (
    <View style={[styles.container]} pointerEvents="box-none">
      <TabsShape tabWidth={tabWidth} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 100,
    height: 60,
    alignItems: 'center',
    zIndex: 0,
  },
});
