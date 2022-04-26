import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { PrimaryButton } from '../../../../components/ui/buttons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from './validation';
import { FormTextInput } from '../../../../components/ui/inputs/form';
import { ToastService } from '../../../../shared/services';
//@ts-ignore
import Checkbox from 'react-native-check-box';
import { Colors } from '../../../../constants';

export type RegisterFormData = {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  openModal: () => void
}

export default function RegisterForm({ onSubmit, openModal }: RegisterFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });
  { console.log('errors', errors) }

  const [checked, setChecked] = React.useState(false);

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
      <View style={styles.checkoutStyle}>
        <Checkbox
          onClick={() => {
            setChecked(!checked);
          }}
          isChecked={checked}
          checkBoxColor={Colors.purple}
        />
        <View style={styles.textCheckBoxTextContainer}>
          <Text style={styles.textStyle}>
            Veuillez confirmer la charte de l'application
            <Text> </Text>
          </Text>
          <TouchableOpacity onPress={() => openModal()}>
            <Text style={styles.iciStyle}>{'ici'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <PrimaryButton text="S'inscrire" onPress={checked ? handleSubmit(onSubmit) : () => ToastService.showToast("Veuillez confirmer la charte de l'application", 'error')} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
  },
  input: {
    marginBottom: 18,
  },
  checkoutStyle: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  },
  checkBox: {
  },
  textCheckBoxTextContainer: {
    justifyContent: 'center',
    marginLeft: 5,
    margin: 8,
    flexDirection: 'row',
  },
  textStyle: {
    color: 'black',
    fontSize: Dimensions.get('window').width >= 400 ? 15 : 13,
  },
  iciStyle: {
    textDecorationLine: 'underline',
    color: "red",
    fontSize: Dimensions.get('window').width >= 400 ? 16 : 13,
  },
});
