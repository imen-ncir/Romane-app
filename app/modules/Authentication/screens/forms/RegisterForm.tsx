import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PrimaryButton} from '../../../../components/ui/buttons';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {registerSchema} from './validation';
import {FormTextInput} from '../../../../components/ui/inputs/form';

export type RegisterFormData = {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
}

export default function RegisterForm({onSubmit}: RegisterFormProps) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });
  {console.log('errors', errors)}
  return (
    
  <View style={styles.form}>
      <FormTextInput
        name="email"
        control={control}
        errors={errors}
        placeholder="Adresse e-mail"
        wrapperStyle={styles.input}
      />
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
        isPassword={true}
        placeholder="Mot de passe"
        wrapperStyle={styles.input}
      />
      <FormTextInput
        name="passwordConfirm"
        control={control}
        errors={errors}
        isPassword={true}
        placeholder="Confirmation mot de passe"
        wrapperStyle={styles.input}
      />
      <PrimaryButton text="S'inscrire" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
  },
  input: {
    marginBottom: 18,
  }
});
