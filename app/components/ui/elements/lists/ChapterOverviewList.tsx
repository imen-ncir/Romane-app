import React from 'react';
import {FlatList} from 'react-native';
import {SelectableChapterItem} from '..';
import {ChapterDTO} from '../../../../modules/Courses/services';

interface ChapterOverviewListProps {
  chapters: ChapterDTO[];
  onPressOverview?: (chapterId: string) => void;
  style?: any;
  emptyComponent?: any;
}

export const ChapterOverviewList = ({
  chapters,
  style,
  onPressOverview,
  emptyComponent,
}: ChapterOverviewListProps) => {
  return (
    <FlatList
      keyExtractor={item => item.id}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      alwaysBounceHorizontal={false}
      ListEmptyComponent={emptyComponent}
      style={[style]}
      data={chapters}
      renderItem={({item}) => (
        <SelectableChapterItem
          item={item}
          onPressOverview={
            onPressOverview ? () => onPressOverview(item.id) : undefined
          }
        />
      )}
    />
  );
};
