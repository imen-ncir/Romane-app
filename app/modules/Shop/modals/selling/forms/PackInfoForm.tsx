import React from 'react';
import {ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {packSchema} from './validation';
import {
  FormRadioInput,
  FormTextArea,
} from '../../../../../components/ui/inputs/form';
import {AdvancedButton} from '../../../../../components/ui';
import {inputs} from '../../../../../shared/styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import {PackCategories, PackLevels} from '../../../../../constants/app';

export type PackInfoFormData = {
  isFree: boolean;
  description: string;
  level: string;
  category: string;
};

interface PackInfoFormProps {
  initState?: PackInfoFormData;
  loading?: boolean;
  onSubmit: (data: PackInfoFormData) => void;
}

const state = {
  isFree: false,
  description: '',
  level: '',
  category: '',
};

const levels = [
  {label: 'Seconde', value: PackLevels.Seconde},
  {label: 'Première', value: PackLevels.Premiere},
  {label: 'Terminale', value: PackLevels.Terminale},
  {label: 'Supérieure', value: PackLevels.Superieure},
];

const yesNo = [
  {label: 'Oui', value: 'true'},
  {label: 'Non', value: 'false'},
];

const categories = [
  {label: 'Français', value: PackCategories.French},
  {label: 'Maths', value: PackCategories.Maths},
  {label: 'Histoire', value: PackCategories.History},
  {label: 'SVT', value: PackCategories.Nature},
  {label: 'Geographie', value: PackCategories.Geography},
];

export const PackInfoForm = ({
  onSubmit,
  loading,
  initState = state,
}: PackInfoFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<PackInfoFormData>({
    reValidateMode: 'onChange',
    defaultValues: initState,
    resolver: yupResolver(packSchema),
  });

  const {description, level, category, isFree} = initState;
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={false}>
        <FormTextArea
          name="description"
          label="Description"
          control={control}
          defaultValue={description}
          withMessage={false}
          errors={errors}
          wrapperStyle={[styles.input]}
          inputStyle={[inputs.cardInput]}
        />
        <FormRadioInput
          label={'Niveaux'}
          items={levels}
          name="level"
          style={styles.input}
          onChange={value => setValue('level', value)}
          errors={errors}
          defaultValue={level}
          withMessage={false}
        />
        <FormRadioInput
          label={'Catégories'}
          items={categories}
          name="category"
          defaultValue={category}
          style={styles.input}
          onChange={value => setValue('category', value)}
          errors={errors}
          withMessage={false}
        />
        <FormRadioInput
          label={'Ce pack est-il gratuit ?'}
          items={yesNo}
          name="isFree"
          defaultValue={isFree === true ? 'true' : 'false'}
          style={styles.input}
          onChange={value => setValue('isFree', value === 'true')}
          errors={errors}
          withMessage={false}
        />
      </ScrollView>
      <AdvancedButton
        icon="check"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />
    </>
  );
};

const styles = EStyleSheet.create({
  input: {
    marginBottom: 18,
  },
  scrollView: {
    paddingBottom: 120,
  },
});
