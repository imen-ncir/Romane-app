import React from 'react';
import SplashNavigator from './navigation/SplashNavigator';
import Toast from 'react-native-toast-message';
import {AppContextProvider} from './contexts/app.context';
import Config from 'react-native-config';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from './constants';

EStyleSheet.build({
  $font: 'Poppins',
  $background: '#E5E5E5',
  $primary: Colors.purple,
  $secondary: Colors.white,
  $black: '#5B5B7E',
  $white: Colors.white,
});

console.info('Using Hermes Engine: ', !!(global as any).HermesInternal);
console.info('Using config:', Config);

const App = () => {
  return (
    <AppContextProvider>
      <SplashNavigator />
      <Toast ref={ref => Toast.setRef(ref)} />
    </AppContextProvider>
  );
};

export default App;
