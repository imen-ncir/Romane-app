import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {layouts} from '../../../shared/styles';
import {FlatList} from 'react-native-gesture-handler';
import {Header} from '../../../components/ui/layouts';

import {useAuthContext} from '../../../contexts/auth.context';
import {RouteNames} from '../../../constants';
import {HeaderTitle, TopBar} from '../../../components/ui';
import {ISettingListItem, SettingListItem} from './components';

const {width} = Dimensions.get('window');

export const Settings = ({navigation}: any) => {
  const {signOut} = useAuthContext();

  const parameters: ISettingListItem[] = [
    {
      icon: 'help',
      text: 'Aide',
      action: () => navigation.push(RouteNames.Help),
    },
    {
      icon: 'logout',
      text: 'Déconnexion',
      action: signOut,
    },
  ];

  return (
    <View style={[layouts.container]}>
      <Header>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
        />
        <HeaderTitle title={'Paramètres'} />
      </Header>
      <View style={[layouts.content, styles.content]}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          windowSize={width}
          data={parameters}
          alwaysBounceHorizontal={false}
          style={styles.settings}
          renderItem={SettingListItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  settings: {
    width: '100%',
    paddingHorizontal: 10,
  },
});
