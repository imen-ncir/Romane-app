import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {PackCardItem} from '..';
import {Colors} from '../../../../constants';
import {TestDTO} from '../../../../modules/Tests';
import {lists} from '../../../../shared/styles/lists';
import {theme} from '../../../../shared/styles/theme';
import {TestCardItem} from '../list-items';

interface TestListProps {
  tests: TestDTO[];
  onPress: (id: string) => void;
  style?: any;
  emptyLabel?: string;
  horizontal?: boolean;
}

export const TestList = ({
  tests,
  onPress,
  style,
  emptyLabel = 'Aucun tests pour le moment',
  horizontal = true,
}: TestListProps) => {
  return (
    <FlatList
      keyExtractor={item => item.id}
      horizontal={horizontal}
      contentContainerStyle={[lists.horizontalScrollContainer, style]}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={tests}
      ListEmptyComponent={
        <Text style={[theme.h4, {color: Colors.dark}]}>{emptyLabel}</Text>
      }
      renderItem={({item}) => (
        <TestCardItem item={item} onPress={onPress} style={styles.test} />
      )}
    />
  );
};
const styles = StyleSheet.create({
  test: {
    marginRight: 10,
    maxWidth: 90,
  },
});
