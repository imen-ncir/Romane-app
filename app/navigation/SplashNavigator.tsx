import React, {useState, useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import SignInStack from './SignInStack';
import SignOutStack from './SignOutStack';
import {SplashLoader} from '../components/ui/loaders';
import {AuthContextProvider} from '../contexts/auth.context';
import {RecoilRoot} from 'recoil';
import {Provider, DefaultTheme} from 'react-native-paper';
import {useAppContext} from '../contexts/app.context';

let isSubscribed: boolean;
export default function SplashNavigator() {
  const {isLoading} = useAppContext();
  const [initializing, setInitializing] = useState<boolean>(true);
  // Auth User
  const [user, setUser] = useState<any | null>(undefined);

  // Firebase user state management
  async function onAuthStateChanged(
    result: FirebaseAuthTypes.User | null,
  ): Promise<void> {
    setUser(result);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    isSubscribed = true;
    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
      authSubscriber();
      isSubscribed = false;
    };
  }, [isSubscribed]);

  if (isLoading || initializing) {
    return <SplashLoader />;
  }

  return user ? (
    <RecoilRoot>
      <AuthContextProvider user={user}>
        <Provider
          theme={{
            ...DefaultTheme,
            roundness: 12,
            animation: {
              scale: 0,
            },
          }}>
          <SignInStack />
        </Provider>
      </AuthContextProvider>
    </RecoilRoot>
  ) : (
    <SignOutStack />
  );
}
