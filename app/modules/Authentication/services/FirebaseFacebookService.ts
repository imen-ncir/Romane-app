import auth from '@react-native-firebase/auth';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {
  FirebaseProviderResult,
  IFirebaseAuthProvider,
} from '../../../shared/infra/services/IFirebaseAuthProvider';

export class FirebaseFacebookService implements IFirebaseAuthProvider {
  async signIn(): Promise<FirebaseProviderResult> {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    return {
      credentials: facebookCredential,
      data: {
        userId: data.userID,
        accessToken: data.accessToken,
      },
    };
  }
}
