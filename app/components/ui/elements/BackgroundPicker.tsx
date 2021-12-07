import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {getIcon} from '../../../assets/icons';
import {Colors} from '../../../constants';
import {useAuthContext} from '../../../contexts/auth.context';
import {app} from '../../../shared/styles';
import {ImageService, ToastService} from '../../../shared/services';
import {UploadService} from '../../../shared/services/UploadService';
import {newId} from '../../../shared/core/NewId';

const {width} = Dimensions.get('window');

export interface BackgroundPickerProps {
  style?: any;
  folder: string;
  backgroundColor?: string;
  onPress?: (url: string) => any;
  defaultValue?: string;
}
export const BackgroundPicker = ({
  onPress,
  backgroundColor = Colors.purple,
  style,
  folder,
  defaultValue,
}: BackgroundPickerProps) => {
  const {uid} = useAuthContext();
  const [selection, setSelection] = useState<any>(defaultValue || null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      ImageService.clean();
    };
  }, []);

  const handleChange = async () => {
    setLoading(true);
    try {
      const selectedImage: any = await ImageService.selectImage(128, 128);

      const uploadUri: string = await ImageService.resizeImage(
        selectedImage.uri,
        128,
        width,
      );

      const fileName = selection
        ? selection.substring(
            selection.lastIndexOf('%2F') + 3,
            selection.lastIndexOf('?'),
          )
        : `${newId()}.jpeg`;
      const publicUrl = await UploadService.uploadToStorage(
        uploadUri,
        `${uid}/${folder}/`,
        fileName,
      );

      if (publicUrl) {
        setSelection(publicUrl);
        if (onPress) onPress(publicUrl);
      }
    } catch (error) {
      console.error(error);
      ToastService.showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{uri: selection}}
      imageStyle={[styles.image, {opacity: loading ? 0.5 : 1}]}
      style={[
        styles.container,
        app.softShadows,
        {
          backgroundColor: backgroundColor || Colors.purple,
          opacity: loading ? 0.5 : 1,
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={Colors.white}
        />
      ) : (
        <TouchableOpacity style={styles.icon} onPress={handleChange}>
          {getIcon('edit', 32, Colors.white)}
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    left: width / 2 - 36,
    top: 48,
  },
  image: {
    position: 'relative',
    borderRadius: 12,
    height: 128,
    resizeMode: 'cover',
  },
  container: {
    position: 'relative',
    borderRadius: 12,
    height: 128,
  },
  icon: {
    position: 'absolute',
    right: 24,
    top: 24,
  },
});
