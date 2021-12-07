import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {PackCardItem} from '..';
import {Colors} from '../../../../constants';
import {PackDTO} from '../../../../modules/Shop';
import {lists} from '../../../../shared/styles/lists';
import {theme} from '../../../../shared/styles/theme';

interface PackListProps {
  packs: PackDTO[];
  onPress: (id: string) => void;
  style?: any;
  horizontal?: boolean;
}

export const PackList = ({
  packs,
  onPress,
  style,
  horizontal = true,
}: PackListProps) => {
  return (
    <FlatList
      keyExtractor={item => item.id}
      numColumns={3}
      horizontal={false}
      contentContainerStyle={[lists.horizontalScrollContainer, style]}
      showsHorizontalScrollIndicator={true}
      showsVerticalScrollIndicator={true}
      data={packs}
      ListEmptyComponent={
        <Text style={[theme.h4, {color: Colors.dark}]}>
          Aucun packs pour le moment
        </Text>
      }
      renderItem={({item}) => (
        <PackCardItem item={item} onPress={onPress} style={styles.pack} />
      )}
    />
  );
};
const styles = StyleSheet.create({
  pack: {
    maxHeight: 150,
    //minWidth: 100,
    //maxWidth: 150,
    //marginRight: 10,
  },
});
