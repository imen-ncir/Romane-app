import React from 'react';
import {StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {schema} from './validation';
import {FormTextInput} from '../../../../../components/ui/inputs/form';
import {AdvancedButton, KeyboardShift} from '../../../../../components/ui';
import {inputs} from '../../../../../shared/styles';

export type LegalFormData = {
  firstname: string;
  lastname: string;
  line1: string;
  zipcode: string;
  city: string;
  phone: string;
};

interface LegalFormProps {
  initState?: LegalFormData;
  loading?: boolean;
  onSubmit: (data: LegalFormData) => void;
}

const state = {
  firstname: '',
  lastname: '',
  line1: '',
  zipcode: '',
  city: '',
  phone: '',
};

export const LegalForm = ({
  onSubmit,
  loading,
  initState = state,
}: LegalFormProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LegalFormData>({
    reValidateMode: 'onChange',
    defaultValues: initState,
    resolver: yupResolver(schema),
  });

  const {firstname, lastname, line1, zipcode, city, phone} = initState;

  return (
    <KeyboardShift offsetHeight={60}>
      <FormTextInput
        name="lastname"
        label="Prénom"
        control={control}
        defaultValue={firstname}
        errors={errors}
        wrapperStyle={[styles.input]}
        inputStyle={[inputs.cardInput]}
      />
      <FormTextInput
        name="lastname"
        label="Nom"
        control={control}
        defaultValue={lastname}
        errors={errors}
        wrapperStyle={[styles.input]}
        inputStyle={[inputs.cardInput]}
      />
      <FormTextInput
        name="line1"
        label="Adresse"
        control={control}
        defaultValue={line1}
        errors={errors}
        wrapperStyle={[styles.input]}
        inputStyle={[inputs.cardInput]}
      />
      <FormTextInput
        name="zipcode"
        label="Code Postal"
        control={control}
        defaultValue={zipcode}
        errors={errors}
        wrapperStyle={[styles.input]}
        inputStyle={[inputs.cardInput]}
      />
      <FormTextInput
        name="city"
        label="Ville"
        control={control}
        defaultValue={city}
        errors={errors}
        wrapperStyle={[styles.input]}
        inputStyle={[inputs.cardInput]}
      />
      <FormTextInput
        name="phone"
        label="Téléphone"
        control={control}
        defaultValue={phone}
        errors={errors}
        wrapperStyle={[styles.input]}
        inputStyle={[inputs.cardInput]}
      />
      <AdvancedButton
        icon="check"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />
    </KeyboardShift>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 18,
  },
});
