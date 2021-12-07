import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {HeaderTitle} from '../../../../components/ui';
import {Avatar} from '../../../../components/ui/elements/Avatar';
import {Colors} from '../../../../constants';
import {layouts} from '../../../../shared/styles';
import {theme} from '../../../../shared/styles/theme';
import {MemberDTO} from '../../../Shared/api';

interface ProfileHeaderProps {
  profile: MemberDTO;
}

export const ProfileHeader = ({profile}: ProfileHeaderProps) => {
  return (
    <View style={[layouts.row, styles.container]}>
      <Avatar url={profile.avatarUrl || undefined} style={styles.avatar} />
      <View>
        <HeaderTitle title={profile.username} />
        <Text style={[theme.h4, styles.experience]}>
          {profile.experience} XP
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  experience: {
    color: Colors.white,
    textAlign: 'left',
  },
});
