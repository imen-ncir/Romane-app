import Toast from 'react-native-toast-message';
import {Platform} from 'react-native';

export type ToastType = 'info' | 'success' | 'error';

const TOAST_DISPLAY_DELAY = 2000;

export class ToastService {
  static showToast(
    mainText: string,
    type: ToastType = 'info',
    subText: string = '',
    delay: number = TOAST_DISPLAY_DELAY,
  ) {
    Toast.show({
      type,
      text1: mainText,
      text2: subText,
      position: 'top',
      topOffset: Platform.OS === 'ios' ? 60 : 60,
      bottomOffset: Platform.OS === 'ios' ? 60 : 60,
      autoHide: true,
      visibilityTime: delay,
    });
  }
}
