import React from 'react';
import {View, StyleSheet} from 'react-native';
import {LinkButton, PrimaryButton} from '../../../../components/ui/buttons';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from './validation';
import {FormTextInput} from '../../../../components/ui/inputs/form';

export type LoginFormData = {
  username: string;
  password: string;
};

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  onResetPassword?: () => void;
}

export default function LoginForm({onSubmit, onResetPassword}: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <View style={styles.form}>
      <FormTextInput
        name="username"
        control={control}
        errors={errors}
        placeholder="Identifiant"
        wrapperStyle={styles.input}
      />
      <FormTextInput
        name="password"
        control={control}
        errors={errors}
        placeholder="Mot de passe"
        isPassword={true}
        wrapperStyle={styles.input}
      />
      <PrimaryButton text="Connexion" onPress={handleSubmit(onSubmit)} />
      {/* {onResetPassword && (
        <LinkButton text="Mot de passe oublié ?" onPress={() => {}} />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {},
  input: {
    marginBottom: 18,
  },
});
