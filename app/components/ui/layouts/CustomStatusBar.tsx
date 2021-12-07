import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';

export type status_mode = 'light' | 'dark';

interface CustomStatusBarProps {
  backgroundColor?: string;
  mode: status_mode;
  [x: string]: any;
}

export const CustomStatusBar = ({
  backgroundColor,
  mode,
  ...props
}: CustomStatusBarProps) => (
  <View style={[styles.statusBar]}>
    <SafeAreaView>
      <StatusBar
        translucent={!backgroundColor}
        backgroundColor={backgroundColor || 'transparent'}
        barStyle={mode === 'light' ? 'light-content' : 'dark-content'}
        {...props}
      />
    </SafeAreaView>
  </View>
);

// const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 52;

const styles = StyleSheet.create({
  statusBar: {
    height: APPBAR_HEIGHT,
  },
});
