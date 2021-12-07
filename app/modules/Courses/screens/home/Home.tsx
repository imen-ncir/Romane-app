import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Section} from '../../../../components/ui/layouts';
import {layouts} from '../../../../shared/styles';
import {HeaderTitle} from '../../../../components/ui/texts';
import {
  AdvancedButton,
  IconButton,
  TwoColumnSubjectList,
} from '../../../../components/ui';
import {ERROR_GENERIC, ModalNames, RouteNames} from '../../../../constants';
import {useRecoilSubjects} from '../../../../contexts/atoms/subjects';
import {useRecoilProfile} from '../../../../contexts/atoms';
import {EmptyList} from './components/EmptyList';
import {BaseScreenProps} from '../../../../shared/core/Screen';
import {TestApi, TestDTO} from '../../../Tests';
import {TestList} from '../../../../components/ui/elements/lists/TestList';
import {ToastService} from '../../../../shared/services';
import { SubjectApi } from '../../services';

export const Home = ({navigation}: BaseScreenProps) => {
  const {profile} = useRecoilProfile();
  const {subjects, setSubjects} = useRecoilSubjects();
  const pageTitle = `Hey ${profile?.username || ''}`;

  const [recommended, setRecommended] = useState<TestDTO[]>();

     useEffect(() => {
    let isSubscribed = true;
    async function loadTestsRecommendedTests() {
      const response = await TestApi.getRecommendedTests();
      if (response.isRight() && isSubscribed)
        setRecommended(response.value.getValue());
      else setRecommended([]);
    }

    async function loadSubjects() {
      // setLoading(true);
      const response = await SubjectApi.getAllSubjects();
      if (isSubscribed) {
        if (response.isRight()) {
          setSubjects(response.value.getValue());
        } else {
          ToastService.showToast(ERROR_GENERIC, 'error', response.value);
        }
      }
      // setLoading(false);
    }

    const unsubscribe = navigation.addListener('focus', () => {
      loadTestsRecommendedTests();
      loadSubjects();
      
    });


    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  const handlePressSearch = () => {
    navigation.push(RouteNames.Search);
  };

  const handlePressAdd = () => {
    navigation.push(RouteNames.SubjectAdd);
  };

  const handlePressSubject = (id: string) => {
    navigation.push(RouteNames.SubjectDetails, {id});
  };

  const handlePressChat = () => {
    navigation.navigate(ModalNames.Chat);
  };

  const handlePressSelectChapters = () => {
    if (!subjects || subjects.length < 1) return;
    navigation.navigate(ModalNames.TestSelection);
  };

  const handlePressTest = async (testId: string) => {
    const test = recommended?.find(t => t.id === testId);
    if (!!test) {
      const response = await TestApi.generateTest(test.chapterIds, testId);
      if (response.isRight()) {
        navigation.push(ModalNames.Test, {
          test: response.value.getValue(),
        });
      } else {
        ToastService.showToast(
          response.value,
          'error',
          response.value.toString(),
        );
      }
    }
  };

  const isEmpty = !subjects || subjects.length < 1;

  return (
    <View style={[layouts.container]}>
      {!isEmpty && (
        <AdvancedButton icon="play" onPress={handlePressSelectChapters} />
      )}
      <Header>
        <View style={[layouts.row]}>
          <HeaderTitle title={pageTitle} style={{flex: 1}} />
          <IconButton icon="chat" onPress={handlePressChat} />
          <IconButton icon="search" onPress={handlePressSearch} />
        </View>
      </Header>
      <View style={layouts.content}>
        {!isEmpty && recommended && (
          <Section title="Tests recommandés">
            <TestList
              tests={recommended}
              style={styles.tests}
              onPress={handlePressTest}
            />
          </Section>
        )}
        <Section title={!isEmpty ? `Mes matières` : ''}>
          <TwoColumnSubjectList
            subjects={subjects}
            emptyComponent={<EmptyList onPress={handlePressAdd} />}
            withColumnOffset={true}
            onPressItem={handlePressSubject}
            onPressAdd={handlePressAdd}
          />
        </Section>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tests: {},
});
