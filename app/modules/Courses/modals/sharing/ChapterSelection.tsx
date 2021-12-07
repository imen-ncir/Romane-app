import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {layouts} from '../../../../shared/styles';
import {Header} from '../../../../components/ui/layouts';
import {
  AdvancedButton,
  ChapterSelectionList,
  ColorDot,
  ContentLoader,
  HeaderTitle,
  TopBar,
} from '../../../../components/ui';
import {ChapterDTO, SubjectApi} from '../../services';
import {ERROR_GENERIC, ModalNames} from '../../../../constants';
import {theme} from '../../../../shared/styles/theme';
import {useRecoilSubjects} from '../../../../contexts/atoms';
import {ShareApi} from '../../../Shared/api';
import {ToastService} from '../../../../shared/services';

export const ShareChapterSelection = ({navigation, route}: any) => {
  const subjectId = route.params?.subjectId;
  const targetId = route.params?.targetId;
  if (!subjectId) navigation.goBack();

  const {subjects} = useRecoilSubjects();
  const subject = subjects.find(f => f.id === subjectId);

  const [chapters, setChapters] = useState<ChapterDTO[]>();
  const [selection, setSelection] = useState<string[]>([]);
  const [isSharing, setIsSharing] = useState<boolean>(false);

  useEffect(() => {
    let isSubscribed = true;
    async function loadChapters() {
      const response = await SubjectApi.getSubject(subjectId);
      if (response.isRight() && isSubscribed) {
        const subjectDetails = response.value.getValue();
        setChapters(subjectDetails.chapters);
        // Default select all chapters
        setSelection(subjectDetails.chapters.map(c => c.id));
      }
    }
    loadChapters();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleSelectChapter = (chapterId: string) => {
    if (selection.includes(chapterId)) {
      setSelection(curr => curr.filter(id => id !== chapterId));
    } else {
      setSelection(curr => [...curr, chapterId]);
    }
  };

  const handleOverviewChapter = useCallback((chapterId: string) => {
    navigation.push(ModalNames.FlashcardsOverview, {
      id: chapterId,
    });
  }, []);

  const handleValidate = useCallback(async () => {
    if (!isSharing && targetId && subjectId && selection) {
      setIsSharing(true);
      const response = await ShareApi.shareSubject({
        targetId,
        subjectId,
        chapterIds: selection,
      });
      setIsSharing(false);
      if (response.isRight()) {
        ToastService.showToast(
          `Partage terminée`,
          'success',
          `Vous venez de partager votre paquet de carte: ${subject?.title}.`,
        );
        navigation.dangerouslyGetParent().goBack();
      } else {
        ToastService.showToast(
          ERROR_GENERIC,
          'error',
          response.value.toString(),
        );
      }
    }
  }, [selection, isSharing]);

  if (!chapters || !subject) return <ContentLoader />;

  let selectedCardNumber = 0;
  if (selection && selection.length > 0) {
    chapters
      .filter(c => selection.includes(c.id))
      .forEach(c => {
        selectedCardNumber += c.flashcardsNumber;
      });
  }

  if (isSharing) return <ContentLoader />;

  return (
    <View style={layouts.container}>
      <AdvancedButton
        icon="check"
        onPress={handleValidate}
        disabled={!selection || selection.length < 1}
      />
      <Header>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
        />
        <HeaderTitle title={'Partager'} />
        <View style={[layouts.row, {justifyContent: 'flex-start'}]}>
          <ColorDot color={subject.color} style={styles.dot} />
          <Text style={[theme.h4, {flex: 1}]}>{subject?.title}</Text>
          <Text style={[theme.h4]}>{`${selectedCardNumber} cartes`}</Text>
        </View>
      </Header>
      <View style={[layouts.content]}>
        <ChapterSelectionList
          chapters={chapters}
          selection={selection}
          onPressItem={handleSelectChapter}
          onPressOverview={handleOverviewChapter}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    marginRight: 10,
  },
});
