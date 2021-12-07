import React from 'react';
import {View, Text,KeyboardAvoidingView,ScrollView,Platform,StyleSheet} from 'react-native';
import {ToastService} from '../../../shared/services/ToastService';
import {AuthService} from '../services/AuthService';
import {useAppContext} from '../../../contexts/app.context';
import {REGISTRATION_LOADING_MESSAGE} from '../../../constants/messages';
import {cards} from '../../../shared/styles/cards';
import RegisterForm, {RegisterFormData} from './forms/RegisterForm';
import {Divider} from '../../../components/ui/layouts/Divider';
import {SocialConnect} from './components';

interface RegisterTabProps {}

export const RegisterTab = ({}: RegisterTabProps) => {
  const {setLoading} = useAppContext();

  const handleRegisterWithEmail = async (data: RegisterFormData) => {
    setLoading(true, REGISTRATION_LOADING_MESSAGE);
    const {username, email, password} = data;
    try {
      await new AuthService().register(email, password, username);
    } catch (error) {
      ToastService.showToast('Erreur', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterWithFacebook = async () => {
    setLoading(true, REGISTRATION_LOADING_MESSAGE);
    try {
      await new AuthService().signInWithFacebook();
    } catch (error) {
      ToastService.showToast('Erreur', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterWithGoogle = async () => {
    setLoading(true, REGISTRATION_LOADING_MESSAGE);
    try {
      await new AuthService().signInWithGoogle();
    } catch (error) {
      ToastService.showToast('Erreur', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : undefined} style={styles.keyboardView}>
    <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollView} showsVerticalScrollIndicator={false}> 
    <View style={cards.card}>
      <Text style={cards.cardTitle}>S'inscrire</Text>
      <RegisterForm onSubmit={handleRegisterWithEmail} />
      <Divider thickness={2} />
      <SocialConnect
        signInWithFacebook={handleRegisterWithFacebook}
        signInWithGoogle={handleRegisterWithGoogle}
      />
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  scrollView:{
    flex: 1,
    width: "100%"
  }
});
