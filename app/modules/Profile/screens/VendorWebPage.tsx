import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {layouts} from '../../../shared/styles';
import {Colors} from '../../../constants';
import {BaseScreenProps} from '../../../shared/core/Screen';
import {WebView} from 'react-native-webview';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getIcon} from '../../../assets/icons';
import {theme} from '../../../shared/styles/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const VendorWebPage = ({navigation, route}: BaseScreenProps) => {
  const link = route.params.link;

  useEffect(() => {
    if (!link) navigation.goBack();
  }, []);

  const onWebViewStateChange = async (event: any) => {
    if (event.url.includes('return_url')) {
      navigation.goBack();
    }
  };

  return (
    <>
      <SafeAreaView style={[styles.safeArea]}>
        <StatusBar barStyle={'dark-content'} backgroundColor={Colors.purple} />
        <View style={[layouts.row, styles.header]}>
          {getIcon('stripe', 40, Colors.white)}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[theme.h4]}>Fermer</Text>
          </TouchableOpacity>
        </View>
        <WebView
          source={{uri: link}}
          startInLoadingState
          scalesPageToFit
          javaScriptEnabled
          bounces={false}
          onNavigationStateChange={onWebViewStateChange}
          javaScriptEnabledAndroid
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
  },
  safeArea: {
    backgroundColor: Colors.purple,
    flex: 1,
  },
});
