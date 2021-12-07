import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {PackCardItem} from '..';
import {PackDTO} from '../../../../modules/Shop';
import {lists} from '../../../../shared/styles/lists';

interface TwoColumnPackListProps {
  packs: PackDTO[];
  style?: any;
  onPressItem: (subjectId: string) => void;
  emptyComponent?: any;
}

export const TwoColumnPackList = ({
  packs,
  style,
  onPressItem,
  emptyComponent,
}: TwoColumnPackListProps) => {
  return (
    <FlatList
      keyExtractor={item => item.id}
      horizontal={false}
      alwaysBounceHorizontal={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={packs}
      ListEmptyComponent={emptyComponent || null}
      contentContainerStyle={[style]}
      renderItem={({item}) => (
        <PackCardItem item={item} onPress={onPressItem} style={styles.pack} />
      )}
      columnWrapperStyle={lists.column}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  pack: {
    flex: 0.48,
    marginBottom: 10,
    minHeight: 150,
    maxHeight: 150,
  },
});
