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

const p1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mollis dui arcu, a commodo nibh eleifend at. Morbi enim nisl, volutpat eget est a, sodales tristique risus. Nam hendrerit, ipsum id suscipit posuere, ipsum eros posuere dui, ac suscipit mauris quam sit amet tellus. Donec a suscipit ex. Curabitur quis imperdiet neque. Donec id enim in est mollis euismod. Nullam fermentum erat non elit fringilla, et pellentesque sem pretium. Vestibulum semper mauris lorem, et bibendum lacus sollicitudin ut. Aenean ullamcorper risus nunc, vitae iaculis nulla porttitor dictum.';
const p2 =
  'Nullam scelerisque lectus sit amet dictum posuere. Vivamus ultricies accumsan mi vitae facilisis. Sed ultricies pellentesque nunc non facilisis. In eget nisl id tellus porta placerat. Sed tristique venenatis leo ut congue. Nullam eu nunc eget ex lacinia maximus eu in elit. Quisque suscipit a arcu ac ultricies.';
const p3 =
  'Curabitur laoreet, metus sit amet pharetra luctus, nibh neque interdum lacus, id tristique arcu lorem ut urna. Donec dapibus sapien elit, vitae interdum purus aliquam nec. Duis commodo, diam eget consectetur dignissim, quam ex eleifend eros, quis fringilla turpis libero tincidunt erat. Etiam eleifend ut neque eget faucibus. Nam vel tortor suscipit, consectetur sem sit amet, hendrerit erat. Aenean a feugiat nunc. Cras aliquet, massa et gravida viverra, sapien felis tristique libero, eget sollicitudin ex risus id nunc. Etiam purus dui, ornare et cursus eget, lacinia eu orci. Nulla mollis congue libero non vulputate.';

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
          <Text style={[typos.paragraph, styles.help]}>{p1}</Text>
          <Text style={[typos.paragraph, styles.help]}>{p2}</Text>
          <Text style={[typos.paragraph, styles.help]}>{p3}</Text>
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
