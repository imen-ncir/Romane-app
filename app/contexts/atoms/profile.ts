import {atom, useRecoilState} from 'recoil';
import {ProfileDTO} from '../../modules/Profile/services';

const initState = {
  photoURL: '',
  username: '',
  credits: 0,
  experience: 0,
  email: '',
  bio: '',
  badges: [],
  stripeCustomerId: undefined,
  stripeAccountId: undefined,
};

export const profileAtom = atom<ProfileDTO>({
  key: 'profile',
  default: initState,
});

export const useRecoilProfile = () => {
  const [profile, setProfile] = useRecoilState(profileAtom);
  return {
    profile,
    setProfile,
    resetProfile: () => setProfile(initState),
    addExperience: (xp: number) =>
      setProfile(curr => ({...curr, experience: (curr.experience += xp)})),
    updateStripeAccount: ({
      stripeCustomerId,
      stripeAccountId,
    }: {
      stripeCustomerId?: string;
      stripeAccountId?: string;
    }) => setProfile(curr => ({...curr, stripeCustomerId, stripeAccountId})),
  };
};
