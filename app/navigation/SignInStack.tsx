import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './stacks';

export default function SignInStack() {
  return (
    <NavigationContainer>
      <RootStack />
      {/* <MainBottomTab barColor={Colors.lightGray} /> */}
    </NavigationContainer>
  );
}
