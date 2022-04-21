import * as React from 'react';
import 'react-native-gesture-handler';
import { Colors, RouteNames } from '../constants';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { EmptyScreen, TabAnchor } from './components';
import { StyleSheet, View } from 'react-native';
import { IS_IPHONE_X } from '../shared/utils';
import { CourseStack, ProfileStack, ShopStack, StatStack } from './stacks';
import { getIcon } from '../assets/icons';

const BottomBar = createBottomTabNavigator();

interface MainBottomTabProps {
  barColor: string;
}
export const MainBottomTab: React.FC<MainBottomTabProps> = ({
  barColor = Colors.white,
}: MainBottomTabProps) => {
  return (
    <BottomBar.Navigator
      tabBar={props => (
        <View style={styles.navigatorContainer}>
          <BottomTabBar
            {...props}
            showLabel={false}
            activeTintColor={Colors.purple}
            inactiveTintColor={Colors.gray}
            style={{
              elevation: 0,
              backgroundColor: 'transparent',
              borderTopWidth: 0,
            }}
          />
          {IS_IPHONE_X && (
            <View
              style={[
                styles.xFillLine,
                {
                  backgroundColor: barColor,
                },
              ]}
            />
          )}
        </View>
      )}
      tabBarOptions={{
        style: styles.navigator,
        tabStyle: {
          backgroundColor: barColor,
          height: 60,
          borderWidth: 0,
        },
      }}>
      <BottomBar.Screen
        name={RouteNames.Home}
        component={CourseStack}
        options={{
          tabBarIcon: ({ color, focused, size }) =>
            getIcon('home', size, color, focused),
        }}
      />
      <BottomBar.Screen
        name={RouteNames.Stats}
        component={StatStack}
        options={{
          tabBarIcon: ({ color, focused, size }) =>
            getIcon('chart', size, color, focused),
        }}
      />
      {/* <BottomBar.Screen
        name={RouteNames.Empty}
        component={EmptyScreen}
        options={{
          tabBarButton: props => <TabAnchor {...props} color={barColor} />,
        }}
      /> */}

      {/* <BottomBar.Screen
        name={RouteNames.Shop}
        component={ShopStack}
        options={{
          tabBarIcon: ({color, focused, size}) =>
            getIcon('shop', size, color, focused),
        }}
      /> */}

      <BottomBar.Screen
        name={RouteNames.Profile}
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, focused, size }) =>
            getIcon('user', size, color, focused),
        }}
      />
    </BottomBar.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    position: 'absolute',
    height: 60,
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 0,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: 'transparent',
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
  },
});
