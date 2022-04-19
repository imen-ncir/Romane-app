import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {layouts} from '../../../shared/styles';
import {Header} from '../../../components/ui/layouts';
import {HeaderTitle, TopBar} from '../../../components/ui';
import {typos} from '../../../shared/styles/typos';
import {ScrollView} from 'react-native-gesture-handler';
import {theme} from '../../../shared/styles/theme';
import {Colors} from '../../../constants';
import {version} from '../../../config/app.json';
import Config from 'react-native-config';

export const Help = ({navigation}: any) => {
  return (
    <View style={[layouts.container]}>
      <Header>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
        />
        <HeaderTitle title={'Aide'} />
      </Header>
      <View style={layouts.content}>
        <ScrollView
          contentContainerStyle={[styles.content]}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          showsHorizontalScrollIndicator={false}>
          <Text style={[theme.h4, {color: Colors.darkGray}]}>
            {Config.ENV_NAME} - v{version}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'flex-start',
    paddingBottom: 80,
  },
  help: {
    textAlign: 'left',
    marginBottom: 20,
  },
});
