import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FacebookButton} from '../../../../components/ui/buttons/FacebookButton';
import {GoogleButton} from '../../../../components/ui/buttons/GoogleButton';

interface SocialConnectProps {
  signInWithFacebook?: () => any;
  signInWithGoogle?: () => any;
}

export const SocialConnect = ({
  signInWithFacebook,
  signInWithGoogle,
}: SocialConnectProps) => {
  return (
    <View style={styles.container}>
      {signInWithFacebook && <FacebookButton onPress={signInWithFacebook} />}
      {signInWithGoogle && <GoogleButton onPress={signInWithGoogle} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
