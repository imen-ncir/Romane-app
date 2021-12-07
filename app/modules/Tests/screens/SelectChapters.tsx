import React, {useCallback, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {layouts} from '../../../shared/styles';
import {Header} from '../../../components/ui/layouts';
import {AdvancedButton, HeaderTitle, TopBar} from '../../../components/ui';
import EStyleSheet from 'react-native-extended-stylesheet';
import {theme} from '../../../shared/styles/theme';
import {SubjectFullDTO, TestApi} from '../services';
import {SelectionList} from './components/SelectionList';
import {ActivityIndicator} from 'react-native-paper';
import {ModalNames} from '../../../constants';
import {ToastService} from '../../../shared/services';

const timeEstimatation = 10;

export const SelectChapters = ({navigation, route}: any) => {
  const subjectId = route.params?.subjectId;

  const [subjects, setSubjects] = useState<SubjectFullDTO[]>([]);
  const [selection, setSelection] = useState<Map<string, string[]>>(
    new Map<string, string[]>(),
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isSubscribed = true;
    async function load() {
      const response = await TestApi.getSubjectDetails(subjectId);
      if (response.isRight() && isSubscribed) {
        setSubjects(response.value.getValue() || []);
      }
      setLoading(false);
    }
    load();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleSelectSubject = (subject: SubjectFullDTO) => {
    if (!subject.chapters || subject.chapters.length < 1) return;
    const newSelection = new Map(selection);
    const exists = selection.has(subject.id);
    if (exists) {
      newSelection.delete(subject.id);
    } else {
      const chapters = subject.chapters.map(c => c.id);
      newSelection.set(subject.id, chapters);
    }
    setSelection(newSelection);
  };
  const handleSelectChapter = (subjectId: string, chapterId: string) => {
    const newSelection = new Map(selection);
    let newChapters = newSelection.get(subjectId) || [];
    if (newChapters.includes(chapterId))
      newChapters = newChapters.filter(id => id !== chapterId);
    else newChapters.push(chapterId);
    newSelection.set(subjectId, newChapters);
    setSelection(newSelection);
  };
  const handlePressChapterOverview = useCallback((chapterId: string) => {
    navigation.push(ModalNames.FlashcardsOverview, {
      id: chapterId,
    });
  }, []);

  const handlePressStart = async () => {
    let chaptersIds: string[] = [];
    for (let key of selection.keys()) {
      const ids = selection.get(key);
      if (!!ids) chaptersIds = chaptersIds.concat(ids);
    }

    if (chaptersIds.length > 0) {
      const response = await TestApi.generateTest(chaptersIds);
      if (response.isRight()) {
        navigation.navigate(ModalNames.Test, {test: response.value.getValue()});
      } else {
        ToastService.showToast(response.value, 'error');
      }
    } else {
      ToastService.showToast('Il faut choisir au moins un chapitre', 'info');
    }
  };

  return (
    <View style={layouts.container}>
      <AdvancedButton icon="play" onPress={handlePressStart} />
      <Header>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
        />
        <View style={[layouts.row]}>
          <HeaderTitle title={'Test'} />
          <Text style={[styles.estimate, theme.h4]}>
            Durée estimée{': '}
            <Text style={[styles.estimateValue]}>{timeEstimatation}min</Text>
          </Text>
        </View>
      </Header>
      <View style={layouts.content}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <SelectionList
            selection={selection}
            subjects={subjects}
            onSelectSubject={handleSelectSubject}
            onSelectChapter={handleSelectChapter}
            onPressChapterOverview={handlePressChapterOverview}
          />
        )}
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  estimate: {},
  estimateValue: {
    fontWeight: 'bold',
  },
});
