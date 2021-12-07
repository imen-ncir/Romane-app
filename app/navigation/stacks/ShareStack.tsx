import * as React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteNames} from '../../constants';
import {
  ShareChapterSelection,
  ShareSubjectSelection,
} from '../../modules/Courses/modals';

const Stack = createStackNavigator();

export const ShareStack = (props: any) => {
  return (
    <Stack.Navigator initialRouteName={RouteNames.ShareSelectSubject}>
      <Stack.Screen
        name={RouteNames.ShareSelectSubject}
        component={ShareSubjectSelection}
        options={{headerShown: false}}
        initialParams={props.route.params}
        {...props}
      />
      <Stack.Screen
        name={RouteNames.ShareSelectChapter}
        component={ShareChapterSelection}
        options={{headerShown: false}}
        {...props}
      />
    </Stack.Navigator>
  );
};
