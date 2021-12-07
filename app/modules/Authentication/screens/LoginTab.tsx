import React from 'react';
import {View, Text} from 'react-native';
import {ToastService} from '../../../shared/services';
import {AuthService} from '../services/AuthService';
import {useAppContext} from '../../../contexts/app.context';
import {SIGN_IN_LOADING_MESSAGE} from '../../../constants/messages';
import {cards} from '../../../shared/styles/cards';
import LoginForm, {LoginFormData} from './forms/LoginForm';
import {Divider} from '../../../components/ui/layouts/Divider';
import {SocialConnect} from './components';

interface LoginTabProps {}

export const LoginTab = ({}: LoginTabProps) => {
  const {setLoading} = useAppContext();

  const handleSignInWithEmail = async (data: LoginFormData) => {
    setLoading(true, SIGN_IN_LOADING_MESSAGE);
    try {
      const {username, password} = data;
      await new AuthService().signIn(username, password);
    } catch (error) {
      ToastService.showToast('Erreur', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignWithFacebook = async () => {
    setLoading(true, SIGN_IN_LOADING_MESSAGE);
    try {
      await new AuthService().signInWithFacebook();
    } catch (error) {
      ToastService.showToast('Erreur', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignWithGoogle = async () => {
    setLoading(true, SIGN_IN_LOADING_MESSAGE);
    try {
      await new AuthService().signInWithGoogle();
    } catch (error) {
      ToastService.showToast('Erreur', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    ToastService.showToast('Pas encore disponible');
  };

  return (
    <View style={cards.card}>
      <Text style={cards.cardTitle}>Connexion à votre compte</Text>
      <LoginForm
        onSubmit={handleSignInWithEmail}
        onResetPassword={handleResetPassword}
      />
      <Divider thickness={2} />
      <SocialConnect
        signInWithFacebook={handleSignWithFacebook}
        signInWithGoogle={handleSignWithGoogle}
      />
    </View>
  );
};
