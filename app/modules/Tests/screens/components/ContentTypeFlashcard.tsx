import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {AudioPlayerButton, PrimaryButton} from '../../../../components/ui';
import {Colors} from '../../../../constants';
import {FlashcardScoreValues} from '../../../../constants/app';
import {theme} from '../../../../shared/styles/theme';
import {
  AnswerDTO,
  AnswerTextAudioDTO,
  QuestionDTO,
} from '../../../Courses/services';
import {YesNoBar} from './YesNoBar';

interface ContentTypeFlashcardProps {
  answer: AnswerDTO;
  question: QuestionDTO;
  onAnswer: (scoreValue: FlashcardScoreValues) => void;
}

function renderRecto(question: QuestionDTO, onShow: any) {
  if (!question) return null;
  const {audioUrl} = question;
  return (
    <>
      <Text style={[theme.h3, styles.question]}>{question.text}</Text>
      {audioUrl && (
        <AudioPlayerButton
          uri={audioUrl}
          text="Ecouter l'audio"
          style={styles.audio}
        />
      )}
      <PrimaryButton
        text="Voir la réponse"
        onPress={onShow}
        style={styles.answerBtn}
      />
    </>
  );
}
function renderVerso(answer: AnswerTextAudioDTO, onAnswer: any) {
  if (!answer) return null;
  const {text, audioUrl} = answer;
  return (
    <>
      <Text style={[theme.h2, styles.title]}>Réponse...</Text>
      <Text style={[theme.h4, styles.textAnswer]}>{text}</Text>
      {audioUrl && (
        <AudioPlayerButton
          uri={audioUrl}
          text="Ecouter la réponse"
          style={styles.audio}
        />
      )}
      <YesNoBar onAnswer={onAnswer} />
    </>
  );
}

export const ContentTypeFlashcard = ({
  answer,
  question,
  onAnswer,
}: ContentTypeFlashcardProps) => {
  const [reveal, setReveal] = useState<boolean>(false);

  const handleShow = () => {
    setReveal(true);
  };

  const handleAnswer = (value: boolean) => {
    setReveal(false);
    const scoreValue =
      value === true
        ? FlashcardScoreValues.KNOWN
        : FlashcardScoreValues.UNKWOWN;
    onAnswer(scoreValue);
  };

  return !reveal
    ? renderRecto(question, handleShow)
    : renderVerso(answer.value as AnswerTextAudioDTO, handleAnswer);
};

const styles = StyleSheet.create({
  title: {
    color: Colors.green,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  textAnswer: {
    color: Colors.darkGray,
    textAlign: 'justify',
    flex: 1,
  },
  question: {
    color: Colors.darkGray,
    textAlign: 'center',
    marginVertical: 20,
    flex: 1,
  },
  audio: {
    marginVertical: 40,
  },
  answerBtn: {
    minWidth: '75%',
    alignSelf: 'center',
  },
});
