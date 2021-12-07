import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors} from '../../../constants/colors';
import {app, layouts} from '../../../shared/styles';
import {theme} from '../../../shared/styles/theme';
import {
  AdvancedButton,
  BaseCard,
  ContentLoader,
  HalfGauge,
} from '../../../components/ui';
import {getIcon} from '../../../assets/icons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ERROR_GENERIC, ModalNames} from '../../../constants';
import {ToastService} from '../../../shared/services';
import {TestApi} from '../services';
import {ProgressBar} from 'react-native-paper';
import {useRecoilProfile, useRecoilSubjects} from '../../../contexts/atoms';
import {compareString, findSubjectColor, sum} from '../../../shared/utils';
import {TEST_EXPERIENCE_REWARD} from '../../../constants/app';
import {ResultLine, TestResult} from '.';

function groupByChapter(xs: ResultLine[]) {
  return [
    ...xs
      .reduce((map, item: any) => {
        const key = item.chapter;
        const prev = map.get(key);

        if (prev) {
          prev.success += item.success === true ? 1 : 0;
          prev.total += 1;
        } else {
          item.success = item.success === true ? 1 : 0;
          item.total = 1;
          map.set(key, Object.assign({}, item));
        }

        return map;
      }, new Map())
      .values(),
  ];
}

function formatDetails(lines: ResultLine[]): any[] {
  const subjectResults: any[] = [];
  lines.sort(compareString);

  const groupScore = groupByChapter(lines);
  groupScore.forEach((line: any) => {
    const chapterResult = {
      title: line.chapter,
      score: line.success,
      total: line.total,
    };
    const subjectResult = subjectResults.find(r => r.title === line.subject);
    if (subjectResult) {
      subjectResult.chapters.push(chapterResult);
    } else {
      subjectResults.push({
        title: line.subject,
        chapters: [chapterResult],
      });
    }
  });

  return subjectResults;
}

export const TestResults = ({navigation, route}: any) => {
  const [result, setResult] = useState<TestResult>();
  const [details, setDetails] = useState<ResultLine[]>();
  const chapterIds = route.params.chapterIds as string[];
  if (!chapterIds) return null;

  const {subjects} = useRecoilSubjects();
  const {addExperience} = useRecoilProfile();

  useEffect(() => {
    const paramResult = route.params.result;
    if (!paramResult) handlePressClose();

    async function saveScore() {
      const {testId, score} = paramResult;
      const response = await TestApi.saveTestResult(testId, {score});
      if (response.isRight()) {
        addExperience(TEST_EXPERIENCE_REWARD);
      } else {
        console.error(response.value);
        ToastService.showToast(ERROR_GENERIC, 'error');
      }
    }

    setResult(paramResult);
    setDetails(formatDetails(paramResult.details));
    saveScore();
  }, []);

  const handlePressRetry = async () => {
    if (!!result) {
      const response = await TestApi.generateTest(chapterIds, result?.testId);
      if (response.isRight()) {
        navigation.dangerouslyGetParent().goBack();
        navigation.push(ModalNames.Test, {
          test: response.value.getValue(),
        });
      } else {
        ToastService.showToast(response.value, 'error');
      }
    }
  };
  const handlePressClose = () => {
    navigation.dangerouslyGetParent().goBack();
  };

  if (!result || !details) return <ContentLoader />;

  const {score, total} = result;
  const percent = Math.floor((score * 100) / total);

  return (
    <View style={[layouts.container, styles.container]}>
      <AdvancedButton icon="retry" onPress={handlePressRetry} />
      <TouchableOpacity onPress={handlePressClose} style={styles.closeBtn}>
        {getIcon('close', 40, Colors.darkGray)}
      </TouchableOpacity>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        contentContainerStyle={{paddingBottom: 80}}>
        <Text style={[theme.h1, {color: Colors.darkGray, textAlign: 'center'}]}>
          Résultats
        </Text>
        <BaseCard style={styles.score}>
          <HalfGauge
            label={''}
            valueLabel={`${score}/${total}`}
            value={percent}
            style={styles.halfgauge}
            color={Colors.green}
            textColor={Colors.darkGray}
          />
          <View style={styles.experience}>
            <Text style={[theme.h4]}>+100xp</Text>
          </View>
        </BaseCard>
        {details &&
          details.sort().map((subject: any, index: number) => (
            <View key={index}>
              <View style={[layouts.row, styles.subjectLine]}>
                <View
                  style={[
                    styles.colorBox,
                    {
                      backgroundColor: findSubjectColor(
                        subject.title,
                        subjects,
                      ),
                    },
                  ]}
                />
                <Text style={[theme.h4, styles.lineTitle, styles.subjectTitle]}>
                  {subject.title}
                </Text>
                <View style={styles.subjectScore}>
                  <Text style={[theme.h4, styles.lineTitle, styles.scoreValue]}>
                    {sum(subject.chapters, 'score')}/
                    {sum(subject.chapters, 'total')}
                  </Text>
                </View>
              </View>
              {subject.chapters &&
                subject.chapters.sort().map((chapter: any, index: number) => (
                  <BaseCard
                    key={index}
                    style={[app.softShadows, styles.chapterLine]}>
                    <View style={[layouts.row]}>
                      <View style={{flex: 1}}>
                        <Text style={[theme.h4, styles.lineTitle]}>
                          {chapter.title}
                        </Text>
                        <ProgressBar
                          progress={
                            chapter.total > 0
                              ? Math.ceil((chapter.score * 100) / chapter.total)
                              : 0
                          }
                          color={Colors.green}
                          style={styles.progress}
                        />
                      </View>
                      <Text
                        style={[theme.h4, styles.lineTitle, styles.scoreValue]}>
                        {chapter.score}/{chapter.total}
                      </Text>
                    </View>
                  </BaseCard>
                ))}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  experience: {
    backgroundColor: Colors.green,
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 24,
    position: 'absolute',
    bottom: 20,
    left: 'auto',
    alignSelf: 'center',
  },
  container: {
    padding: 20,
    paddingTop: 30,
    flexDirection: 'column',
  },
  score: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 24,
  },
  halfgauge: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    height: 150,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    paddingBottom: 200,
  },
  colorBox: {
    height: 24,
    width: 24,
    borderRadius: 24,
  },
  subjectLine: {
    padding: 10,
  },
  subjectTitle: {
    flex: 1,
    paddingHorizontal: 10,
  },
  subjectScore: {
    backgroundColor: Colors.mediumGray,
    borderRadius: 12,
  },
  chapterLine: {
    marginBottom: 10,
    minHeight: 60,
  },
  lineTitle: {
    color: Colors.darkGray,
    fontWeight: 'bold',
  },
  scoreValue: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  progress: {
    backgroundColor: Colors.gray,
    height: 10,
    borderRadius: 12,
  },
  closeBtn: {
    // position: 'absolute',
  },
});
