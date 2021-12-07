import React from 'react';
import {FlatList, Dimensions, StyleSheet} from 'react-native';
import {SubjectFullDTO} from '../../services';
import {SubjectOverview} from './SubjectOverview';
const {width} = Dimensions.get('window');

interface SelectionListProps {
  subjects: SubjectFullDTO[];
  selection: Map<string, string[]>;
  onSelectSubject: any;
  onSelectChapter: any;
  onPressChapterOverview: any;
  style?: any;
}

export const SelectionList = ({
  subjects,
  selection,
  style,
  onSelectSubject,
  onSelectChapter,
  onPressChapterOverview,
}: SelectionListProps) => {
  if (!subjects) return null;

  return (
    <FlatList
      keyExtractor={item => item.id}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      windowSize={width}
      alwaysBounceHorizontal={false}
      contentContainerStyle={[styles.list, style]}
      data={subjects}
      renderItem={({item}) => (
        <SubjectOverview
          item={item}
          selection={selection.get(item.id) || []}
          onPressSelect={onSelectSubject}
          onPressSelectChapter={onSelectChapter}
          onPressChapterOverview={onPressChapterOverview}
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
