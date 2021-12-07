import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {BaseCard} from '../../../../components/ui';
import {Colors} from '../../../../constants';
import {FlashcardTypes} from '../../../../constants/app';
import {TestFlashcardDTO} from '../../services';
import {ContentTypeFlashcard} from './ContentTypeFlashcard';
import {ContentTypeMultiple} from './ContentTypeMultiple';
import {ContentTypeText} from './ContentTypeText';
import {FlashcardInfo} from './FlashcardInfo';

interface FlashcardProps {
  card: TestFlashcardDTO;
  style?: any;
  onValidate: any;
}

export const Flashcard = ({card, style, onValidate}: FlashcardProps) => {
  const {chapterTitle, subjectTitle, color, question, answer} = card;
  const {pictureUrl} = question;

  const handleAnswer = (value: boolean) => {
    onValidate(value);
  };

  const renderContent = () => {
    const {type} = answer;
    switch (type) {
      case FlashcardTypes.FLASHCARD:
        return (
          <ContentTypeFlashcard
            question={question}
            answer={answer}
            onAnswer={handleAnswer}
          />
        );
      case FlashcardTypes.MULTIPLE:
        return (
          <ContentTypeMultiple
            question={question}
            answer={answer}
            onAnswer={handleAnswer}
          />
        );
      case FlashcardTypes.TEXT:
        return (
          <ContentTypeText
            question={question}
            answer={answer}
            onAnswer={handleAnswer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.wrapper}>
      <FlashcardInfo
        color={color}
        subject={subjectTitle}
        chapter={chapterTitle}
        style={styles.info}
      />
      <BaseCard style={[styles.card]}>
        {pictureUrl && (
          <Image source={{uri: pictureUrl}} style={styles.image} />
        )}
        <View style={[styles.content, style]}>{renderContent()}</View>
      </BaseCard>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
    resizeMode: 'cover',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  info: {
    marginBottom: 10,
  },
  card: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: Colors.white,
    padding: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    position: 'relative',
    alignSelf: 'stretch',
  },
});
