import React from 'react';
import {FlatList, Dimensions, StyleSheet} from 'react-native';
import {MemberListItem} from '..';
import {MemberDTO} from '../../../../modules/Shared/api/socials';
const {width} = Dimensions.get('window');

interface MemberListProps {
  members: MemberDTO[];
  onPress: (id: string) => void;
  onPressAvatar?: (id: string) => void;
  style?: any;
}

export const MemberList = ({
  members,
  onPress,
  onPressAvatar,
  style,
}: MemberListProps) => {
  return (
    <FlatList
      keyExtractor={item => item.memberId}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      windowSize={width}
      alwaysBounceHorizontal={false}
      contentContainerStyle={[styles.list, style]}
      data={members}
      renderItem={({item}) => (
        <MemberListItem
          item={item}
          onPress={onPress}
          onPressAvatar={onPressAvatar}
        />
      )}
    />
  );
};
const styles = StyleSheet.create({
  list: {
    paddingBottom: 120,
  },
});
