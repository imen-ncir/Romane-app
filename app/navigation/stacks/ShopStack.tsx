import * as React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteNames, ModalNames} from '../../constants';
import {PackDetails, Shop} from '../../modules/Shop';
import { Search } from '../../modules/Courses';

const Stack = createStackNavigator();

export const ShopStack = () => {
  return (
    <Stack.Navigator initialRouteName={RouteNames.Shop}>
      <Stack.Screen
        name={RouteNames.Shop}
        component={Shop}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ModalNames.PackDetails}
        component={PackDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ModalNames.Search}
        component={Search}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
