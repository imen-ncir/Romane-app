import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {getIcon} from '../../../../assets/icons';
import {Avatar, BaseCard} from '../../../../components/ui';
import {Colors} from '../../../../constants';
import {MemberDTO} from '../../../../modules/Shared/api/socials';
import {app, layouts} from '../../../../shared/styles';
import {theme} from '../../../../shared/styles/theme';

interface MemberListItemProps {
  item: MemberDTO;
  onPress: any;
  onPressAvatar?: any;
  style?: any;
}

export const MemberListItem = ({
  item,
  onPress,
  onPressAvatar,
  style,
}: MemberListItemProps) => {
  const {memberId, username, avatarUrl, experience} = item;

  return (
    <BaseCard style={[styles.container, style]}>
      <View style={[layouts.row, styles.content]}>
        <View style={[app.softShadows, {borderRadius: 50}]}>
          {onPressAvatar && (
            <TouchableOpacity onPress={() => onPressAvatar(memberId)}>
              <Avatar url={avatarUrl} style={[styles.avatar]} />
            </TouchableOpacity>
          )}
          {!onPressAvatar && <Avatar url={avatarUrl} style={[styles.avatar]} />}
        </View>
        <View style={{flex: 1}}>
          <Text style={[theme.h2, styles.username]}>{username}</Text>
          <Text style={[theme.h4, styles.experience]}>{experience} XP</Text>
        </View>
        <TouchableOpacity onPress={() => onPress(memberId)}>
          {getIcon('person-add', 24, Colors.purple, false, {
            marginHorizontal: 20,
          })}
        </TouchableOpacity>
      </View>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  avatar: {
    marginRight: 10,
  },
  username: {
    color: Colors.purple,
    fontWeight: 'bold',
  },
  experience: {
    color: Colors.gray,
    fontWeight: 'bold',
  },
});
