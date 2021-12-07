import * as yup from 'yup';

import '../../../../../config/yup';
import {FlashcardTypes} from '../../../../../constants/app';

export const questionSchema = yup.object().shape({
  text: yup.string().required(),
  audioFileUri: yup.string(),
  pictureFileUri: yup.string(),
});
export const answerSchema = yup.object().shape({
  type: yup.string().required(),
  textValue: yup.string().when('type', {
    is: FlashcardTypes.TEXT,
    then: yup.string().required(),
  }),
  flashcardValue: yup
    .object()
    .shape({
      text: yup.string(),
      audioFileUri: yup.string(),
    })
    .when('type', {
      is: FlashcardTypes.FLASHCARD,
      then: yup
        .object()
        .shape({
          text: yup.string(),
          audioFileUri: yup.string(),
        })
        .test(
          'at-least-one-value',
          'Vous devez renseigner au moins un audio ou une réponse texte',
          value => !!(value.text || value.audioFileUri),
        ),
    }),
  multipleValues: yup
    .array()
    .of(
      yup.object().shape({
        text: yup.string(),
        audioFileUri: yup.string(),
        isRight: yup.boolean(),
      }),
    )
    .when('type', {
      is: FlashcardTypes.MULTIPLE,
      then: yup
        .array()
        .of(
          yup.object().shape({
            text: yup.string(),
            audioFileUri: yup.string(),
            isRight: yup.boolean(),
          }),
        )
        .test(
          '4-value-required',
          'Vous devez renseigner les 4 réponses',
          value =>
            !!value &&
            value.filter(f => !!(f.text || f.audioFileUri)).length == 4,
        )
        .test(
          'at-least-one-right-value',
          'Vous devez indiquer quelle réponse est la bonne',
          value => !!value && value.find(f => f.isRight === true) !== undefined,
        ),
    }),
});
