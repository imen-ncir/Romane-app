import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BaseScreenProps} from '../../../shared/core/Screen';
import {theme} from '../../../shared/styles/theme';
import {BaseCard, ContentLoader} from '../../../components/ui';
import {getIcon} from '../../../assets/icons';
import {Colors} from '../../../constants';
import {ChapterApi, ChapterDetailsDTO} from '../../Courses/services';

export const FlashcardsOverviewModal = ({
  navigation,
  route,
}: BaseScreenProps) => {
  const chapterId = route.params.id;
  if (!chapterId) navigation.goBack();
  const [chapter, setChapter] = useState<ChapterDetailsDTO>();

  useEffect(() => {
    let isSubscribed = true;
    async function loadData() {
      const response = await ChapterApi.getChapter(chapterId);
      if (response.isRight() && isSubscribed) {
        setChapter(response.value.getValue());
      }
    }
    loadData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleClose = () => {
    navigation.goBack();
  };

  if (!chapter) return <ContentLoader />;

  const {title, flashcards} = chapter;
  const questions = flashcards.map(f => f.question);

  return (
    <View style={styles.container}>
      <Text style={[theme.h2, styles.title]}>{title}</Text>
      {!!questions && questions.length < 1 && (
        <Text style={[theme.h4, styles.flashcardText]}>Aucune carte</Text>
      )}
      {questions &&
        questions.length > 0 &&
        questions.slice(0, 4).map((f: string, index: number) => (
          <BaseCard key={index} style={[styles.flashcard]}>
            <Text style={[theme.text, styles.flashcardText]} numberOfLines={2}>
              {f}
            </Text>
          </BaseCard>
        ))}
      {questions.length > 4 && (
        <Text style={[theme.h4, styles.more]}>
          Et {questions.length - 4} autres...
        </Text>
      )}
      <TouchableOpacity onPress={handleClose} style={styles.backBtn}>
        {getIcon('close', 48)}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 20,
  },
  more: {
    marginVertical: 10,
  },
  title: {
    marginBottom: 20,
  },
  flashcard: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 20,
    alignItems: 'center',
    minHeight: 70,
    maxHeight: 90,
  },
  flashcardText: {
    flex: 1,
    color: Colors.darkGray,
    fontWeight: 'bold',
  },
  backBtn: {
    position: 'absolute',
    bottom: 50,
    left: 'auto',
  },
});
