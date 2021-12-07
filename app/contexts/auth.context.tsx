import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useRecoilProfile, useRecoilSubjects} from './atoms';
import {ProfileApi, ProfileDTO} from '../modules/Profile/services';
import {SubjectApi, SubjectDTO} from '../modules/Courses/services';
import {SplashLoader} from '../components/ui';
import {ToastService} from '../shared/services';
import {ERROR_GENERIC} from '../constants';
import {useRecoilPacks} from './atoms/packs';
import {PackDTO, ShopApi} from '../modules/Shop';
interface ContextProps {
  signOut: any;
  uid: string;
}

const contextInitState = {
  signOut: null,
  uid: '',
};

export const AuthContext = createContext<ContextProps>(contextInitState);
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({user, children}: any) => {
  if (!user) return null;
  const {resetSubjects, setSubjects} = useRecoilSubjects();
  const {profile, resetProfile, setProfile} = useRecoilProfile();
  const {setPacks} = useRecoilPacks();

  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    let isSubscribed = true;
    async function loadUserData() {
      let response: any = await ProfileApi.getProfile();
      if (response.isRight()) {
        const profile: ProfileDTO = response.value.getValue();
        setProfile(profile);
      } else {
        handleSignOut();
        ToastService.showToast(ERROR_GENERIC, 'error');
        return;
      }

      response = await SubjectApi.getAllSubjects();
      const subjects: SubjectDTO[] = response.isRight()
        ? response.value.getValue()
        : [];

      response = await ShopApi.getLearnerPacks(user.uid);
      const packs: PackDTO[] = response.isRight()
        ? response.value.getValue()
        : [];

      if (isSubscribed) {
        setSubjects(subjects);
        setPacks(packs);
        setLoading(false);
      }
    }
    loadUserData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleSignOut = () => {
    resetSubjects();
    resetProfile();
    auth().signOut();
  };

  if (loading) return <SplashLoader />;
  if (!profile) handleSignOut();

  return (
    <AuthContext.Provider
      value={{
        signOut: handleSignOut,
        uid: user.uid,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
