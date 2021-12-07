import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteNames} from '../constants';
import AuthPage from '../modules/Authentication/screens/Page';

const Stack = createStackNavigator();

export default function SignOutStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={RouteNames.Login} component={AuthPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
