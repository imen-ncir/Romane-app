import * as React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {ModalNames, RouteNames} from '../../constants';
import {
  Settings,
  Help,
  Profile,
  Credits,
  Transfert,
  AddCredits,
} from '../../modules/Profile/screens';
import {PackDetails} from '../../modules/Shop';
import {AddCard} from '../../modules/Profile/screens/AddCard';

const Stack = createStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName={RouteNames.Profile}>
      <Stack.Screen
        name={RouteNames.Profile}
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.Credits}
        component={Credits}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.CreditsAdd}
        component={AddCredits}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.CardAdd}
        component={AddCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.CreditsTransfert}
        component={Transfert}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.Settings}
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.Help}
        component={Help}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ModalNames.PackDetails}
        component={PackDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
