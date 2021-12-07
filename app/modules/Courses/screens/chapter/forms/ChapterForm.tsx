import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {chapterSchema} from './validation';
import {FormTextInput} from '../../../../../components/ui/inputs/form';
import {AdvancedButton} from '../../../../../components/ui';
import {inputs} from '../../../../../shared/styles';

const {width} = Dimensions.get('screen');

export type ChapterFormData = {
  title: string;
};

interface ChapterFormProps {
  initState?: ChapterFormData;
  loading?: boolean;
  onSubmit: (data: ChapterFormData) => void;
}

const state = {
  title: '',
};

export const ChapterForm = ({
  onSubmit,
  loading,
  initState = state,
}: ChapterFormProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ChapterFormData>({
    reValidateMode: 'onChange',
    defaultValues: initState,
    resolver: yupResolver(chapterSchema),
  });

  const {title} = initState;

  return (
    <>
      <FormTextInput
        name="title"
        label="Titre du chapitre"
        control={control}
        defaultValue={title}
        errors={errors}
        wrapperStyle={[styles.input]}
        inputStyle={[inputs.cardInput]}
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
  form: {
    flex: 1,
    width: width,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 18,
  },
});
