import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  View,
} from 'react-native';
import {getIcon} from '../../../assets/icons';
import {Colors} from '../../../constants';
import {app} from '../../../shared/styles';
import {ImageService, ToastService} from '../../../shared/services';

const {width} = Dimensions.get('window');

export interface PicturePickerProps {
  style?: any;
  onPress?: (url: string) => any;
  defaultValue?: string;
}
export const PicturePicker = ({
  onPress,
  style,
  defaultValue,
}: PicturePickerProps) => {
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
      const selectedImage: any = await ImageService.selectImage(128, width);

      const uploadUri: string = await ImageService.resizeImage(
        selectedImage.uri,
        128,
        width,
      );

      if (uploadUri) {
        setSelection(uploadUri);
        if (onPress) onPress(uploadUri);
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
          opacity: loading ? 0.5 : 1,
        },
        style,
      ]}>
      <TouchableOpacity onPress={handleChange}>
        <View
          style={[
            app.softShadows,
            styles.picker,
            selection ? styles.pickerOutlined : null,
          ]}>
          {getIcon(selection ? 'edit' : 'add', 36)}
          {!selection && (
            <View style={[app.softShadows, styles.pickerPlus]}>
              {getIcon('add', 24)}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 12,
    height: 150,
    resizeMode: 'cover',
  },
  container: {
    borderRadius: 12,
    height: 150,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    backgroundColor: 'salmon',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  pickerOutlined: {
    backgroundColor: 'transparent',
    borderColor: Colors.white,
  },
  pickerPlus: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: Colors.purple,
    borderRadius: 50,
    padding: 5,
  },
});
