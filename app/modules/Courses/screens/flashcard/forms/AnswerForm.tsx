import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {useFieldArray, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {answerSchema} from './validation';
import {
  FormLabel,
  FormMultipleTextAudioInput,
  FormRadioInput,
  FormTextArea,
  FormTextAudioInput,
} from '../../../../../components/ui/inputs/form';
import {
  AdvancedButton,
  BaseCard,
  KeyboardShift,
  MultipleTextAudioValue,
  TextAudioValue,
} from '../../../../../components/ui';
import {FlashcardTypes} from '../../../../../constants/app';
import {theme} from '../../../../../shared/styles/theme';
const {width} = Dimensions.get('screen');

export type FlashcardAnswerFormData = {
  type: string;
  textValue?: string;
  flashcardValue?: TextAudioValue;
  multipleValues?: MultipleTextAudioValue[];
};

interface FlashcardAnswerProps {
  initState?: FlashcardAnswerFormData;
  loading?: boolean;
  onSubmit: (data: FlashcardAnswerFormData) => void;
}

const initArray: MultipleTextAudioValue[] = [
  {text: undefined, audioFileUri: undefined, isRight: false},
  {text: undefined, audioFileUri: undefined, isRight: false},
  {text: undefined, audioFileUri: undefined, isRight: false},
  {text: undefined, audioFileUri: undefined, isRight: false},
];

const state = {
  type: FlashcardTypes.FLASHCARD,
  textValue: undefined,
  flashcardValue: undefined,
  multipleValues: initArray,
};

const radioItems = [
  {label: 'Flashcard', value: FlashcardTypes.FLASHCARD},
  {label: 'Réponse écrite', value: FlashcardTypes.TEXT},
  {label: 'Choix multiple', value: FlashcardTypes.MULTIPLE},
];

export const FlashcardAnswerForm = ({
  onSubmit,
  loading,
  initState = state,
}: FlashcardAnswerProps) => {
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm<FlashcardAnswerFormData>({
    reValidateMode: 'onChange',
    defaultValues: initState,
    resolver: yupResolver(answerSchema),
  });
  const {fields} = useFieldArray({
    control,
    name: 'multipleValues',
  });
  const type = watch('type');

  useEffect(() => {
    // Prevent form empty array on load
    if (initState && initState.multipleValues)
      setValue('multipleValues', initState.multipleValues);
  }, []);

  const handleChangeType = (value: string) => {
    setValue('type', value);
    if (value === FlashcardTypes.FLASHCARD) {
      setValue('textValue', undefined);
      setValue('multipleValues', initArray);
    }
    if (value === FlashcardTypes.TEXT) {
      setValue('multipleValues', initArray);
      setValue('flashcardValue', undefined);
    }
    if (value === FlashcardTypes.MULTIPLE) {
      setValue('textValue', undefined);
      setValue('flashcardValue', undefined);
    }
  };

  const renderAnswer = () => {
    if (!type) return null;

    switch (type) {
      case FlashcardTypes.FLASHCARD:
        return (
          <FormTextAudioInput
            label="La réponse"
            name="flashcardValue"
            control={control}
            defaultValue={initState.flashcardValue}
            onChange={(value: TextAudioValue) =>
              setValue('flashcardValue', value)
            }
            errors={errors}
            wrapperStyle={styles.input}
          />
        );
      case FlashcardTypes.TEXT:
        return (
          <FormTextArea
            label="La réponse"
            name="textValue"
            defaultValue={initState.textValue}
            control={control}
            errors={errors}
            wrapperStyle={styles.input}
          />
        );
      case FlashcardTypes.MULTIPLE:
        return buildMultipleTextAudioInput();
      default:
        return null;
    }
  };

  const buildMultipleTextAudioInput = () => {
    const multiples = fields as MultipleTextAudioValue[];
    return (
      <>
        <FormLabel label={'La réponse'} />
        {multiples.map((item: MultipleTextAudioValue, index: number) => {
          return (
            <FormMultipleTextAudioInput
              key={index}
              value={item}
              // defaultValue={defaultValue}
              name={`multipleValues[${index}]`}
              onChange={(value: MultipleTextAudioValue) => {
                const newArray = [...multiples];
                if (newArray[index].isRight !== value.isRight) {
                  newArray.forEach(input => (input.isRight = false));
                }
                newArray[index] = value;
                setValue('multipleValues', newArray);
              }}
              wrapperStyle={styles.input}
            />
          );
        })}
        {errors['multipleValues'] && (
          <Text style={theme.error}>{errors['multipleValues'].message}</Text>
        )}
      </>
    );
  };

  return (
    <>
      <KeyboardShift>
        <BaseCard style={styles.form}>
          <FormRadioInput
            name="type"
            label="Type de réponse"
            defaultValue={initState.type}
            items={radioItems}
            errors={errors}
            onChange={handleChangeType}
          />
          <View style={{marginTop: 20}}>{renderAnswer()}</View>
        </BaseCard>
      </KeyboardShift>
      <AdvancedButton
        icon="check"
        onPress={handleSubmit(onSubmit)}
        style={styles.btn}
        loading={loading}
      />
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    bottom: 60 - 32,
    left: width / 2 - 52,
  },
  form: {},
  input: {
    marginBottom: 18,
  },
});
