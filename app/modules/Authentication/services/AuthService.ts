import auth from '@react-native-firebase/auth';
import {FirebaseFacebookService} from './FirebaseFacebookService';
import {FirebaseGoogleService} from './FirebaseGoogleService';
import {UserApi} from './UserApi';

interface IAuthService {
  register: (
    email: string,
    password: string,
    username: string,
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

export class AuthService implements IAuthService {
  async register(
    email: string,
    password: string,
    username: string,
  ): Promise<void> {
    console.log("-----register00 ----",email, password);
    await auth().createUserWithEmailAndPassword(email, password);
    await auth().signOut();
    const response = await UserApi.registerWithEmailAndPassword(
      email,
      username,
    );
    console.log("-----register11 ----"+JSON.stringify(response));
    if (response.isLeft()) throw response.value;
    await auth().signInWithEmailAndPassword(email, password);
  }
  async signIn(email: string, password: string): Promise<void> {
    await auth().signInWithEmailAndPassword(email, password);
  }
  async signInWithFacebook(): Promise<void> {
    const {credentials, data} = await new FirebaseFacebookService().signIn();
    await auth().signInWithCredential(credentials);
    await auth().signOut();
    const response = await UserApi.registerWithFacebook(
      data.accessToken,
      data.userId,
    );
    if (response.isLeft()) throw response.value;
    await auth().signInWithCredential(credentials);
  }
  async signInWithGoogle(): Promise<void> {
    const {credentials, data} = await new FirebaseGoogleService().signIn();
    await auth().signInWithCredential(credentials);
    await auth().signOut();
    const response = await UserApi.registerWithGoogle(data.idToken);
    if (response.isLeft()) throw response.value;
    await auth().signInWithCredential(credentials);
  }
}
