import React from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoundedBackground } from '../../../components/ui/svgs';
import { Colors } from '../../../constants';
import { displayName } from '../../../config/app.json';
import { TabView, SceneMap } from 'react-native-tab-view';
import { KeyboardShift } from '../../../components/ui/keyboard/KeyboardShift';
import { LoginTab, RegisterTab } from '.';
import { LoginTabBar } from './components';

const { width } = Dimensions.get('screen');

const RoutePlaceHolder = () => <View></View>;
const LoginRoute = () => <LoginTab />;
const RegisterRoute = () => <RegisterTab />;
const tabRoutes = [
  { key: 'login', title: 'Se connecter' },
  { key: 'register', title: "S'inscrire" },
];

export default function AuthPage() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(tabRoutes);
  const renderScene = SceneMap({
    login: LoginRoute,
    register: RegisterRoute,
  });

  return (
    <SafeAreaView style={styles.container}>
      <RoundedBackground
        customStyles={styles.roundedBackground}
        customHeight={400}
        customTop={1000}
        customColor={Colors.purple}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.mainTitle]}>{displayName}</Text>
        </View>
        <TabView
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          renderTabBar={LoginTabBar}
          initialLayout={{ width: width }}
          lazy={false}
          renderLazyPlaceholder={RoutePlaceHolder}
          lazyPreloadDistance={0}
          tabBarPosition="top"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  mainTitle: {
    fontFamily: 'Arial',
    textAlign: 'center',
    fontSize: 48,
    fontWeight: '500',
    color: Colors.white,
    alignItems: 'center',
    alignContent: 'center',
  },
  subTitle: {
    fontFamily: 'Arial',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '100',
    opacity: 0.7,
    color: Colors.lightGray,
    alignItems: 'center',
    alignContent: 'center',
  },
  roundedBackground: {
    position: 'absolute',
    width: width,
    zIndex: 1,
  },
  content: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: 2,
  },
});
