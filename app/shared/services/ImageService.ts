import {Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer, {ResizeMode} from 'react-native-image-resizer';

// Picker options
// const options = {
//   title: 'Select Avatar',
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };

// Resize options
let compressFormat: any = 'JPEG';
let quality = 100;
let rotation = 0;
let outputPath: any = null;

interface ImagePickerResult {
  uri: string;
  width: number;
  height: number;
  mime: string;
}

export class ImageService {
  static selectImage = async (
    cropHeight: number,
    cropWidth: number,
    withCircle: boolean = false,
  ): Promise<ImagePickerResult> => {
    return new Promise(async (resolve, reject) => {
      try {
        const image = await ImagePicker.openPicker({
          multiple: false,
          width: cropWidth,
          height: cropHeight,
          cropperCircleOverlay: withCircle,
          cropping: true,
          mediaType: 'photo',
        });
        resolve({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  static resizeImage = async (
    imageUri: string,
    newHeight: number,
    newWidth: number,
    mode: ResizeMode = 'cover',
  ): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await ImageResizer.createResizedImage(
          imageUri,
          newHeight,
          newWidth,
          compressFormat,
          quality,
          rotation,
          outputPath,
          undefined,
          {mode},
        );

        let uri = response.uri;
        let uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        resolve(uploadUri);
      } catch (error) {
        reject(error);
      }
    });
  };

  static clean = async (): Promise<void> => {
    try {
      await ImagePicker.clean();
    } catch (error) {
      console.error(error);
    }
  };
}
