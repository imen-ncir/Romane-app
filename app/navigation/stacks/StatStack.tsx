import * as React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteNames} from '../../constants';
import {Stats} from '../../modules/Stats';

const Stack = createStackNavigator();

export const StatStack = () => {
  return (
    <Stack.Navigator initialRouteName={RouteNames.Stats}>
      <Stack.Screen
        name={RouteNames.Stats}
        component={Stats}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
