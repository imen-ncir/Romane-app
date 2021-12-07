import React from 'react';
import {StyleSheet, Dimensions,KeyboardAvoidingView,ScrollView, Platform} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {questionSchema} from './validation';
import {
  FormPicturePicker,
  FormTextArea,
} from '../../../../../components/ui/inputs/form';
import {
  AdvancedButton,
  AudioPicker,
  BaseCard,
  KeyboardShift,
} from '../../../../../components/ui';

const {width} = Dimensions.get('screen');

export type FlashcardQuestionFormData = {
  text: string;
  audioFileUri?: string;
  pictureFileUri?: string;
};

interface FlashcardQuestionProps {
  initState?: FlashcardQuestionFormData;
  loading?: boolean;
  onSubmit: (data: FlashcardQuestionFormData) => void;
}

const state = {
  text: '',
  audioFileUri: undefined,
  pictureFileUri: undefined,
};

export const FlashcardQuestionForm = ({
  onSubmit,
  loading,
  initState = state,
}: FlashcardQuestionProps) => {
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<FlashcardQuestionFormData>({
    reValidateMode: 'onChange',
    defaultValues: initState,
    resolver: yupResolver(questionSchema),
  });

  const pictureFileUri = watch('pictureFileUri');
  const audioFileUri = watch('audioFileUri');

  return (
    <>
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : undefined} style={styles.keyboardView}>
        <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollView} showsVerticalScrollIndicator={false}> 
        <BaseCard style={styles.form}>
          <FormPicturePicker
            onPress={url => setValue('pictureFileUri', url)}
            style={[styles.input]}
            defaultValue={initState.pictureFileUri}
            errors={errors}
            name="pictureFileUri"
            value={pictureFileUri}
          />
          <FormTextArea
            label={'Texte'}
            name="text"
            control={control}
            errors={errors}
            defaultValue={initState.text}
            wrapperStyle={styles.input}
          />
          <AudioPicker
            value={audioFileUri}
            style={styles.audio}
            onPress={url => setValue('audioFileUri', url)}
          />
        </BaseCard>
      </ScrollView>
      </KeyboardAvoidingView>
      <AdvancedButton
        icon="next"
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
  form: {
    padding: 20,
  },
  input: {
    marginBottom: 18,
  },
  audio: {marginVertical: 20},
  textarea: {},
  picker: {},
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
