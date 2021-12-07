import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getIcon} from '../../../assets/icons';
import {Colors} from '../../../constants';
import {ImageService} from '../../../shared/services';

interface AvatarPickerProps {
  style?: any;
  onPress?: (url: string) => any;
  defaultValue?: string;
  size?: number;
}

const DEFAULT_AVATAR_URL =
  'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png';

const AVATAR_SIZE = 64;

export const AvatarPicker = ({
  defaultValue = DEFAULT_AVATAR_URL,
  onPress,
  style,
  size = AVATAR_SIZE,
}: AvatarPickerProps) => {
  const [selection, setSelection] = useState<any>(
    defaultValue || DEFAULT_AVATAR_URL,
  );
  useEffect(() => {
    return () => {
      ImageService.clean();
    };
  }, []);

  const handleChange = async () => {
    try {
      const selectedImage: any = await ImageService.selectImage(
        size,
        size,
        true,
      );

      const uploadUri: string = await ImageService.resizeImage(
        selectedImage.uri,
        size,
        size,
      );

      if (uploadUri) {
        setSelection(uploadUri);
        if (onPress) onPress(uploadUri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleChange}
      style={[{width: size, height: size}, style]}>
      <Image
        source={{uri: selection}}
        style={[styles.avatar, {height: size, width: size, borderRadius: size}]}
      />
      {getIcon('picture', 32, Colors.white, false, styles.icon)}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderColor: Colors.white,
    borderWidth: 2,
  },
  icon: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
});
