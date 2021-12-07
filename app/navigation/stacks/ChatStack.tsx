import * as React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteNames} from '../../constants';
import {Chat, Conversations} from '../../modules/Chat';

const Stack = createStackNavigator();

export const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName={RouteNames.Conversations}>
      <Stack.Screen
        name={RouteNames.Conversations}
        component={Conversations}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.Chat}
        component={Chat}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
