import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AudioPlayerButton} from '../../../../components/ui';
import {Colors} from '../../../../constants';
import {FlashcardScoreValues} from '../../../../constants/app';
import {app} from '../../../../shared/styles';
import {theme} from '../../../../shared/styles/theme';
import {
  AnswerDTO,
  AnswerMultipleTextAudioDTO,
  QuestionDTO,
} from '../../../Courses/services';
import {YesNoBar} from './YesNoBar';

interface ContentTypeMultipleProps {
  answer: AnswerDTO;
  question: QuestionDTO;
  onAnswer: (scoreValue: FlashcardScoreValues) => void;
  style?: any;
}

export const ContentTypeMultiple = ({
  answer,
  question,
  onAnswer,
}: ContentTypeMultipleProps) => {
  const {text} = question;
  const choices = answer.value as AnswerMultipleTextAudioDTO[];
  const [reveal, setReveal] = useState<boolean>(false);
  const [index, setIndex] = useState<number>();

  const handlePress = (index: number, isRight: boolean) => {
    setIndex(index);
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
    <>
      {!reveal && <Text style={[theme.h4, styles.question]}>{text}</Text>}
      {reveal && <Text style={[theme.h3, styles.title]}>Mauvaise réponse</Text>}
      <View style={styles.choices}>
        {choices &&
          choices.map((choice, i) => {
            const {text, audioUrl} = choice;
            const isRight = choice.isRight || false;
            const isRightAnswer = reveal && !!choice.isRight;
            const isWrongAnswer = reveal && i === index && !choice.isRight;

            return (
              <View style={styles.choice} key={i}>
                <TouchableOpacity
                  onPress={() => handlePress(i, isRight)}
                  disabled={reveal}
                  style={[
                    app.softShadows,
                    styles.choiceButton,
                    {
                      backgroundColor: isRightAnswer
                        ? Colors.green
                        : isWrongAnswer
                        ? Colors.red
                        : Colors.white,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.choiceText,
                      {
                        color:
                          isRightAnswer || isWrongAnswer
                            ? Colors.white
                            : Colors.darkGray,
                      },
                    ]}>
                    {text || `Réponse ${i + 1}`}
                  </Text>
                </TouchableOpacity>
                {!reveal && audioUrl && (
                  <AudioPlayerButton
                    uri={audioUrl}
                    tiny
                    style={styles.audioButton}
                  />
                )}
              </View>
            );
          })}
      </View>
      {reveal && <YesNoBar onAnswer={handleAnswer} />}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.red,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  choices: {
    flex: 1,
  },
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  choiceText: {
    color: Colors.darkGray,
    fontSize: 18,
    paddingLeft: 20,
  },
  choiceButton: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 24,
    minWidth: '100%',
  },
  audioButton: {
    marginLeft: 10,
    minHeight: 24,
    minWidth: 24,
    paddingHorizontal: 5,
    paddingVertical: 5,
    position: 'absolute',
    right: 20,
    alignSelf: 'center',
  },
  card: {
    flex: 1,
    padding: 20,
    position: 'relative',
    alignSelf: 'stretch',
  },
  question: {
    color: Colors.darkGray,
    textAlign: 'center',
    marginVertical: 20,
  },
  answerBtn: {
    minWidth: '75%',
    alignSelf: 'center',
  },
});
