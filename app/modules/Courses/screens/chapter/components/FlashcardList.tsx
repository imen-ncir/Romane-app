import React, {useState} from 'react';
import {FlatList, Dimensions, StyleSheet, Text} from 'react-native';
import {Colors, ERROR_GENERIC, RouteNames} from '../../../../../constants';
import {useRecoilFlashcards} from '../../../../../contexts/atoms/flashcards';
import {ConfirmService, ToastService} from '../../../../../shared/services';
import {theme} from '../../../../../shared/styles/theme';
import {FlashcardApi} from '../../../services';
import {FlashcardDTO} from '../../../services/flashcard/dto';
import {FlashcardPreview} from './FlashcardPreview';
const {width} = Dimensions.get('window');

interface FlashcardListProps {
  navigation: any;
  flashcards: FlashcardDTO[];
  style?: any;
}

export const FlashcardList = ({
  flashcards,
  style,
  navigation,
}: FlashcardListProps) => {
  const {removeFlashcard} = useRecoilFlashcards();

  const handlePressDelete = async (flashcardId: string) => {
    const confirm = await ConfirmService.show();
    if (confirm) {
      removeFlashcard(flashcardId);
      const response = await FlashcardApi.deleteFlashcard(flashcardId);
      if (response.isRight()) {
        ToastService.showToast('Flashcard supprimée avec succès !', 'success');
      } else {
        const error: string = response.value;
        ToastService.showToast(error, 'error');
      }
    }
  };

  const handlePressFlashcard = async (flashcardId: string) => {
    navigation.push(RouteNames.FlashcardUpdate, {id: flashcardId});
  };

  const handlePressMove = (flashcardId: string) => {
    navigation.push(RouteNames.MovingSubjectSelection, {
      selectChapter: true,
      callback: (chapterId: string) => handleMove(chapterId, flashcardId),
    });
  };

  const handleMove = async (chapterId: string, flashcardId: string) => {
    const response = await FlashcardApi.moveFlashcard(flashcardId, {
      targetChapterId: chapterId,
    });
    if (response.isRight()) {
      removeFlashcard(flashcardId);
      navigation.goBack();
      ToastService.showToast('Déplacée avec succès !');
    } else {
      ToastService.showToast(ERROR_GENERIC, 'error', response.value.toString());
    }
  };

  return (
    <FlatList
      keyExtractor={item => item.id}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      windowSize={width}
      alwaysBounceHorizontal={false}
      contentContainerStyle={[styles.list, style]}
      data={flashcards}
      ListEmptyComponent={
        <Text style={[theme.h4, {color: Colors.dark, textAlign: 'center'}]}>
          Aucune flashcards
        </Text>
      }
      renderItem={({item}) => (
        <FlashcardPreview
          item={item}
          onPressMove={() => handlePressMove(item.id)}
          onPressFlashcard={() => handlePressFlashcard(item.id)}
          onPressDelete={() => handlePressDelete(item.id)}
        />
      )}
    />
  );
};
const styles = StyleSheet.create({
  list: {
    marginVertical: 5,
    paddingBottom: 120,
  },
});
