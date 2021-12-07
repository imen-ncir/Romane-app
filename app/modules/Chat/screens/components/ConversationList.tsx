import React from 'react';
import {FlatList, Dimensions, StyleSheet} from 'react-native';
import {ConversationDTO} from '../../services';
import {ConversationListItem} from './ConversationListItem';
const {width} = Dimensions.get('window');

interface ConversationListProps {
  conversations: ConversationDTO[];
  onPress: (id: string) => void;
  style?: any;
}

export const ConversationList = ({
  conversations,
  onPress,
  style,
}: ConversationListProps) => {
  return (
    <FlatList
      keyExtractor={item => item.conversationId}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      windowSize={width}
      alwaysBounceHorizontal={false}
      contentContainerStyle={[styles.list, style]}
      data={conversations}
      renderItem={({item}) => (
        <ConversationListItem item={item} onPress={onPress} />
      )}
    />
  );
};
const styles = StyleSheet.create({
  list: {
    paddingBottom: 120,
  },
});
