import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Colors} from '../../../constants';

interface AvatarProps {
  url?: string;
  size?: number;
  style?: any;
}

const DEFAULT_AVATAR_URL =
  'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png';

export const Avatar = ({
  url = DEFAULT_AVATAR_URL,
  size = 64,
  style,
}: AvatarProps) => {
  return (
    <Image
      source={{uri: url}}
      style={[
        styles.avatar,
        {height: size, width: size, borderRadius: size},
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderColor: Colors.white,
    borderWidth: 2,
  },
});
