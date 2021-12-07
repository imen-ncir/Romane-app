import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {Colors} from '../../../../constants';
import {SubjectDTO} from '../../../../modules/Courses/services';
import {lists} from '../../../../shared/styles/lists';
import {theme} from '../../../../shared/styles/theme';
import {SubjectCardItem} from '../list-items';

interface SubjectHorizontalListProps {
  subjects: SubjectDTO[];
  onPress: (id: string) => void;
  style?: any;
  horizontal?: boolean;
}

export const SubjectHorizontalList = ({
  subjects,
  onPress,
  style,
  horizontal = true,
}: SubjectHorizontalListProps) => {
  return (
    <FlatList
      keyExtractor={item => item.id}
      horizontal={horizontal}
      contentContainerStyle={[lists.horizontalScrollContainer, style]}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={subjects}
      ListEmptyComponent={
        <Text style={[theme.h4, {color: Colors.dark}]}>Aucun sujet</Text>
      }
      renderItem={({item}) => (
        <SubjectCardItem
          item={item}
          onPress={() => onPress(item.id)}
          style={styles.subject}
        />
      )}
    />
  );
};
const styles = StyleSheet.create({
  subject: {
    maxHeight: 150,
    minWidth: 150,
    maxWidth: 150,
    marginRight: 10,
  },
});
