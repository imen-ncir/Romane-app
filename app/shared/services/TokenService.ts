import auth from '@react-native-firebase/auth';

interface ITokenService {
  getIdToken(): Promise<string>;
}

export class TokenService implements ITokenService {
  // TODO: Avec Async Storage
  async getIdToken(): Promise<string> {
    if (auth().currentUser) {
      try {
        const idToken = await auth().currentUser?.getIdToken();
        if (idToken) {
          return `Bearer ${idToken}`;
        }
      } catch (error) {
        console.error('[TokenService]: error', error.message);
      }
    }
    return '';
  }

  // TODO: Avec Async Storage
  async getRefreshToken(): Promise<string> {
    return '';
  }

  // TODO: Avec Async Storage
  // async storeTokens(idToken: string, refreshToken: string): Promise<void> {}
}
