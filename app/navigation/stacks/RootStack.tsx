import * as React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {ModalNames} from '../../constants';
import {MainBottomTab} from '../MainBottomTab';
import {ShareStack} from './ShareStack';
import {TestStack} from './TestStack';
import {ChatStack} from './ChatStack';
import {SelectChapters} from '../../modules/Tests';
import {SellingModal} from '../../modules/Shop';
import {
  AudioRecordModal,
  FlashcardsOverviewModal,
  MemberProfile,
  SearchMemberModal,
} from '../../modules/Shared/modals';
import {VendorWebPage} from '../../modules/Profile/screens/VendorWebPage';

const Stack = createStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{animationEnabled: false}}>
      <Stack.Screen
        name={'Main'}
        component={MainBottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ModalNames.AudioRecord}
        component={AudioRecordModal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ModalNames.FlashcardsOverview}
        component={FlashcardsOverviewModal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ModalNames.SearchMember}
        component={SearchMemberModal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ModalNames.TestSelection}
        component={SelectChapters}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ModalNames.Test}
        component={TestStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ModalNames.Chat}
        component={ChatStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ModalNames.Share}
        component={ShareStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ModalNames.Sell}
        component={SellingModal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ModalNames.MemberProfile}
        component={MemberProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ModalNames.VendorWebPage}
        component={VendorWebPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
