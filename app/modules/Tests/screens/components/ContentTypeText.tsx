import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PrimaryButton, TextArea} from '../../../../components/ui';
import {Colors} from '../../../../constants';
import {FlashcardScoreValues} from '../../../../constants/app';
import {theme} from '../../../../shared/styles/theme';
import {AnswerDTO, AnswerTextDTO, QuestionDTO} from '../../../Courses/services';
import {YesNoBar} from './YesNoBar';

interface ContentTypeTextProps {
  answer: AnswerDTO;
  question: QuestionDTO;
  onAnswer: (scoreValue: FlashcardScoreValues) => void;
  style?: any;
}

function formatString(value: string) {
  if (!value) return '';
  const trimmed = value.toLocaleLowerCase().trim();
  const normalized = trimmed.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return normalized;
}

export const ContentTypeText = ({
  answer,
  question,
  onAnswer,
}: ContentTypeTextProps) => {
  const [reveal, setReveal] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>();
  const value = answer.value as AnswerTextDTO;

  const handleValidate = () => {
    if (!inputValue || !value) return;

    const answer = formatString(inputValue);
    const rightAnswer = formatString(value.text);
    const isRight = answer === rightAnswer;
    if (isRight) {
      onAnswer(FlashcardScoreValues.KNOWN);
      setReveal(false);
    } else {
      setReveal(true);
    }
  };

  const handleAnswer = (value: boolean) => {
    const scoreValue =
      value === true
        ? FlashcardScoreValues.BARELY_KNOWN
        : FlashcardScoreValues.UNKWOWN;
    onAnswer(scoreValue);
    setReveal(false);
  };

  return (
    <View style={styles.content}>
      {reveal ? (
        <>
          <Text style={[theme.h2, styles.title]}>Oups...</Text>
          <Text style={[theme.h4, styles.answer]}>La bonne réponse était:</Text>
          <Text style={[theme.h4, styles.answer, styles.bold]}>
            {value.text}
          </Text>
        </>
      ) : (
        <Text style={[theme.h3, styles.question]}>{question.text}</Text>
      )}
      {!reveal ? (
        <TextArea
          style={styles.input}
          enabled={!reveal}
          onChangeText={(value: string) => setInputValue(value)}
        />
      ) : (
        <Text style={[theme.h4, styles.writtenAnswer]}>{inputValue}</Text>
      )}

      {!reveal && (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <PrimaryButton
            text="Valider"
            disabled={!inputValue}
            onPress={handleValidate}
            style={[
              styles.answerBtn,
              !inputValue ? styles.answerBtnDisabled : null,
            ]}
          />
        </View>
      )}
      {reveal && <YesNoBar onAnswer={handleAnswer} />}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  title: {
    color: Colors.red,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    padding: 20,
    position: 'relative',
    alignSelf: 'stretch',
  },
  answer: {
    color: Colors.darkGray,
  },
  question: {
    color: Colors.darkGray,
    textAlign: 'center',
    marginVertical: 20,
  },
  writtenAnswer: {
    color: Colors.darkGray,
    textAlign: 'justify',
    marginBottom: 30,
    backgroundColor: Colors.lightGray,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    minHeight: 100,
  },
  input: {
    minHeight: 100,
    marginVertical: 10,
  },
  answerBtn: {
    minWidth: '75%',
    alignSelf: 'center',
  },
  answerBtnDisabled: {
    backgroundColor: Colors.gray,
    shadowColor: Colors.gray,
  },
});
