import React from 'react';
import {StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {subjectSchema} from './validation';
import {
  FormBackgroundPicker,
  FormColorPicker,
  FormTextInput,
} from '../../../../../components/ui/inputs/form';
import {AdvancedButton} from '../../../../../components/ui';
import {inputs} from '../../../../../shared/styles';
import {PickerPresets} from '../../../../../constants';

export type SubjectFormData = {
  title: string;
  color: string;
  picture?: string;
};

interface SubjectFormProps {
  initState?: SubjectFormData;
  loading?: boolean;
  onSubmit: (data: SubjectFormData) => void;
}

const state = {
  title: '',
  color: '',
  picture: '',
};

export const SubjectForm = ({
  onSubmit,
  loading,
  initState = state,
}: SubjectFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm<SubjectFormData>({
    reValidateMode: 'onChange',
    defaultValues: initState,
    resolver: yupResolver(subjectSchema),
  });

  const watchColor = watch('color');

  const {title, color, picture} = initState;

  return (
    <>
      <FormTextInput
        name="title"
        label="Titre de la matière"
        control={control}
        defaultValue={title}
        errors={errors}
        wrapperStyle={[styles.input]}
        inputStyle={[inputs.cardInput]}
      />
      <FormColorPicker
        colors={PickerPresets}
        name="color"
        defaultValue={color}
        errors={errors}
        label={'Couleur'}
        containerStyle={styles.input}
        onPress={value => {
          setValue('color', value, {shouldValidate: true});
        }}
      />
      <FormBackgroundPicker
        name="picture"
        errors={errors}
        folder={'subjects'}
        label={'Ajouter une image'}
        defaultValue={picture}
        backgroundColor={watchColor ? watchColor : ''}
        onPress={url => setValue('picture', url)}
      />
      <AdvancedButton
        icon="check"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 18,
  },
});
