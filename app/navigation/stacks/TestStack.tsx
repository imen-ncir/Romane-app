import * as React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteNames} from '../../constants';
import {TestResults, TestRun} from '../../modules/Tests';

const Stack = createStackNavigator();

export const TestStack = (props: any) => {
  return (
    <Stack.Navigator initialRouteName={RouteNames.TestRun}>
      <Stack.Screen
        name={RouteNames.TestRun}
        component={TestRun}
        options={{headerShown: false}}
        initialParams={props.route.params}
        {...props}
      />
      <Stack.Screen
        name={RouteNames.TestResults}
        component={TestResults}
        options={{headerShown: false}}
        {...props}
      />
    </Stack.Navigator>
  );
};
