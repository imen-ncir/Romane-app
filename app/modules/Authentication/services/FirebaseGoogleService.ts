import auth from '@react-native-firebase/auth';
import {
  FirebaseProviderResult,
  IFirebaseAuthProvider,
} from '../../../shared/infra/services/IFirebaseAuthProvider';
import {GoogleSignin} from '@react-native-community/google-signin';
import {googleConfig} from '../../../config/google';

GoogleSignin.configure({
  webClientId: googleConfig.webClientID,
});

export class FirebaseGoogleService implements IFirebaseAuthProvider {
  async signIn(): Promise<FirebaseProviderResult> {
    // Attempt login with permissions
    const result = await GoogleSignin.signIn();

    const {idToken} = result;
    if (!idToken) {
      throw 'Failed getting Google IdToken';
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return {
      credentials: googleCredential,
      data: {
        idToken: idToken,
      },
    };
  }
}
