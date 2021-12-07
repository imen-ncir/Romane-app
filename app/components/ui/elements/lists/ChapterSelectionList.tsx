import React from 'react';
import {FlatList} from 'react-native';
import {SelectableChapterItem} from '..';
import {ChapterDTO} from '../../../../modules/Courses/services';

interface ChapterSelectionListProps {
  chapters: ChapterDTO[];
  selection: string[];
  onPressItem: (chapterId: string) => void;
  onPressOverview?: (chapterId: string) => void;
  style?: any;
  emptyComponent?: any;
}

export const ChapterSelectionList = ({
  chapters,
  selection,
  style,
  onPressItem,
  onPressOverview,
  emptyComponent,
}: ChapterSelectionListProps) => {
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
          selected={selection.includes(item.id)}
          onPressSelect={() => onPressItem(item.id)}
          onPressOverview={
            onPressOverview ? () => onPressOverview(item.id) : undefined
          }
        />
      )}
    />
  );
};
