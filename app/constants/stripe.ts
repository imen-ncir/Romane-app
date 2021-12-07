import Config from 'react-native-config';

export const StripeKeys = {
  PUBLIC_KEY: Config.STRIPE_PUBLIC_KEY || '',
  CLIENT_ID: Config.STRIPE_OAUTH_CLIENT_ID || '',
};
