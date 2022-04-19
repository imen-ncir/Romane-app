import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ActivityIndicator, ProgressBar } from 'react-native-paper';
import { PrimaryButton } from '../../../components/ui';
import { RouteNames } from '../../../constants';
import { FlashcardScoreValues } from '../../../constants/app';
import { Colors } from '../../../constants/colors';
import { ToastService } from '../../../shared/services';
import { layouts } from '../../../shared/styles';
import { theme } from '../../../shared/styles/theme';
import { TestApi, TestRunDTO } from '../services';
import { Flashcard } from './components';

const initResult = (test: TestRunDTO): TestResult => {
  const { id, cards } = test;
  return { testId: id, details: [], score: 0, total: cards.length };
};

export interface TestResult {
  testId: string;
  score: number;
  total: number;
  details: ResultLine[];
}

export interface ResultLine {
  subject: string;
  chapter: string;
  success: boolean;
  value: number;
}

export const TestRun = ({ navigation, route }: any) => {
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const test: TestRunDTO = route.params?.test;
  if (!test) navigation.goBack();

  const [result, setResult] = useState<TestResult>(initResult(test));

  if (!test) {
    navigation.goBack();
    return null;
  }

  const { cards } = test;
  if (!cards) {
    navigation.goBack();
    return null;
  }

  const handleSetValue = async (value: FlashcardScoreValues) => {
    setLoading(true);
    // Store result
    const currentCard = cards[index];
    const newResult = { ...result };

    const isSuccess = value === (FlashcardScoreValues.KNOWN as number);
    // Update card score
    const response = await TestApi.updateCardScore(currentCard.id, value);
    setLoading(false);
    if (response.isRight()) {
      // Update state score
      const scoreLine = {
        subject: currentCard.subjectTitle,
        chapter: currentCard.chapterTitle,
        success: isSuccess,
        value: value,
      };
      newResult.details.push(scoreLine);
      setResult(newResult);
      if (isSuccess) newResult.score += 1;

      await handleNext(newResult);
    } else {
      ToastService.showToast(response.value, 'error');
    }
  };

  const handleNext = async (newResult: TestResult) => {
    // Next card or finish
    if (index < cards.length - 1) {
      setIndex(curr => curr + 1);
    } else {
      navigation.navigate(RouteNames.TestResults, {
        result: newResult,
        chapterIds: test.chapterIds,
      });
    }
  };

  const handleStop = async () => {
    if (!test.completed || test.completed < 1) {
      const response = await TestApi.removeTest(test.id);
      if (!response.isRight()) {
        console.error(response.value);
      }
    }
    navigation.navigate(RouteNames.Home);
  };

  const current = index + 1;

  return (
    <View style={[layouts.container, styles.container]}>
      <View style={styles.header}>
        <View style={styles.progression}>
          <Text style={[theme.h4, styles.progressText]}>
            Question {current}/{cards.length}
          </Text>
          {cards.length > 0 ?
            <ProgressBar
              color={Colors.purple}
              progress={current / cards.length}
              style={styles.progressBar}
            />
            :
            <ProgressBar
              color={Colors.purple}
              progress={0}
              style={styles.progressBar}
            />
          }
        </View>
      </View>
      {!loading ? (
        <Flashcard card={cards[index]} onValidate={handleSetValue} />
      ) : (
        <ActivityIndicator color={Colors.purple} />
      )}
      <PrimaryButton text="STOP" onPress={handleStop} style={styles.btn} />
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    minWidth: 125,
    alignSelf: 'center',
    minHeight: 'auto',
    paddingVertical: 10,
    marginTop: 20,
  },
  container: {
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 20,
  },
  progression: {},
  progressText: {
    color: Colors.darkGray,
  },
  progressBar: {
    height: 10,
    borderRadius: 8,
    backgroundColor: Colors.gray,
    marginVertical: 10,
  },
  cardInfo: {
    justifyContent: 'flex-end',
  },
  color: {
    height: 24,
    width: 24,
    borderRadius: 16,
  },
  subject: {
    color: Colors.darkGray,
    marginHorizontal: 10,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  chapter: {
    textAlign: 'right',
    marginHorizontal: 10,
    // color: Colors.darkGray,
  },
});
