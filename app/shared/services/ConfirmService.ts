import {Alert} from 'react-native';

interface ConfirmOptions {
  isDangerouns: boolean;
  title: string;
}

export class ConfirmService {
  static show(
    message: string = 'Etes-vous sûre ?',
    yesText: string = 'Oui',
    noText: string = 'Non',
    options: ConfirmOptions = {
      isDangerouns: true,
      title: 'Confirmation',
    },
  ): Promise<boolean> {
    return new Promise<boolean>(res => {
      Alert.alert(options.title, message, [
        {
          text: yesText,
          onPress: () => res(true),
          style: options.isDangerouns ? 'destructive' : 'default',
        },
        {
          text: noText,
          onPress: () => res(false),
          style: 'cancel',
        },
      ]);
    });
  }
}
