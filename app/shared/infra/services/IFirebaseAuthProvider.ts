import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export interface FirebaseProviderResult {
  credentials: FirebaseAuthTypes.AuthCredential;
  data: any;
}

export interface IFirebaseAuthProvider {
  signIn(): Promise<FirebaseProviderResult>;
}
