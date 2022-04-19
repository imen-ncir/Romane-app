import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import {
  Colors,
  ERROR_GENERIC,
  ModalNames,
  RouteNames,
  WORK_IN_PROGRESS,
} from '../../../../../constants';
import { useRecoilChapters } from '../../../../../contexts/atoms/chapters';
import { ConfirmService, ToastService } from '../../../../../shared/services';
import { theme } from '../../../../../shared/styles/theme';
import { TestApi } from '../../../../Tests';
import { ChapterApi } from '../../../services/chapter/api';
import { ChapterDTO } from '../../../services/chapter/dto';
import { ChapterPreview } from './ChapterPreview';

interface ChapterListProps {
  navigation: any;
  chapters: ChapterDTO[];
  style?: any;
}

export const ChapterList = ({
  navigation,
  chapters,
  style,
}: ChapterListProps) => {
  const { removeChapter } = useRecoilChapters();

  const handlePressTest = async (chapterId: string) => {
    const response = await TestApi.generateTest([chapterId]);
    if (response.isRight()) {
      navigation.navigate(ModalNames.Test, {
        test: response.value.getValue(),
      });
    } else {
      ToastService.showToast(response.value, 'error');
    }
  };
  const handlePressChapter = async (chapterId: string) => {
    navigation.push(RouteNames.ChapterDetails, { id: chapterId });
  };
  const handlePressDelete = async (chapterId: string) => {
    const confirm = await ConfirmService.show();
    if (confirm) {
      removeChapter(chapterId);
      const response = await ChapterApi.deleteChapter(chapterId);
      if (response.isRight()) {
        ToastService.showToast('Chapitre supprimé avec succès !', 'success');
      } else {
        const error: string = response.value;
        ToastService.showToast(error, 'error');
      }
    }
  };
  const handlePressMove = async (chapterId: string) => {
    navigation.push(RouteNames.MovingSubjectSelection, {
      callback: (subjectId: string) => handleMoveChapter(subjectId, chapterId),
    });
  };
  const handleMoveChapter = async (subjectId: string, chapterId: string) => {
    const response = await ChapterApi.moveChapter(chapterId, {
      targetSubjectId: subjectId,
    });
    if (response.isRight()) {
      removeChapter(chapterId);
      navigation.goBack();
      ToastService.showToast('Déplacé avec succès !');
    } else {
      ToastService.showToast(ERROR_GENERIC, 'error', response.value.toString());
    }
  };
  console.log("--chapters--" + JSON.stringify(chapters))
  return (
    <FlatList
      keyExtractor={item => item.id}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      alwaysBounceHorizontal={false}
      contentContainerStyle={[styles.list, style]}
      data={chapters}
      ListEmptyComponent={() => (
        <Text style={[theme.h4, { color: Colors.dark, textAlign: 'center' }]}>
          Aucun chapitre
        </Text>
      )}
      renderItem={({ item }) => (
        <ChapterPreview
          item={item}
          onPressMove={() => handlePressMove(item.id)}
          onPressChapter={() => handlePressChapter(item.id)}
          onPressTest={() => handlePressTest(item.id)}
          onPressDelete={() => handlePressDelete(item.id)}
        />
      )}
    />
  );
};
const styles = StyleSheet.create({
  list: {
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingBottom: 300,
  },
});
