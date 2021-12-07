import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import {Colors} from '../../../../constants';

export const LoginTabBar = (props: any) => (
  <TabBar
    {...props}
    getLabelText={({route}) => route.title}
    style={tabs.tabBar}
    indicatorStyle={tabs.tabIndicator}
    renderLabel={({route, focused}) => (
      <View style={[tabs.tabItem, focused && tabs.tabItemFocused]}>
        <Text style={[tabs.tabTitle, focused && tabs.tabTitleFocused]}>
          {route.title}
        </Text>
      </View>
    )}
  />
);

export const tabs = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    borderWidth: 0,
    // shadowColor: 'blue',
    elevation: 0,
    marginHorizontal: 0,
    padding: 0,
  },
  tabItem: {
    paddingVertical: 14,
    borderRadius: 32,
    backgroundColor: Colors.lightPurple,
    opacity: 0.8,
  },
  tabItemFocused: {
    backgroundColor: Colors.white,
    opacity: 1,
    shadowColor: Colors.white,
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {height: 0, width: 0},
  },
  tabIndicator: {
    backgroundColor: 'transparent',
  },
  tabTitle: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
    textAlign: 'center',
    minWidth: '100%',
    color: Colors.lightGray,
  },
  tabTitleFocused: {
    color: Colors.purple,
  },
});
