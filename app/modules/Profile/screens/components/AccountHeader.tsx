import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderTitle, MoneyTag} from '../../../../components/ui';
import {Avatar} from '../../../../components/ui/elements/Avatar';
import {Colors} from '../../../../constants';
import {app, layouts} from '../../../../shared/styles';
import {ProfileDTO} from '../../services';

interface AccountHeaderProps {
  user: ProfileDTO;
  onPressMoney?: any;
}

export const AccountHeader = ({onPressMoney, user}: AccountHeaderProps) => {
  return (
    <View style={[layouts.row, styles.container]}>
      <View style={styles.avatarContainer}>
        <Avatar url={user.photoURL || undefined} />
        <View style={styles.tag}>
          <TouchableOpacity onPress={onPressMoney}>
            <MoneyTag value={user.credits} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.nameContainer}>
        <HeaderTitle title={user.username} />
        <Text style={[app.text, styles.experience]}>{user.experience} XP</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatarContainer: {
    zIndex: 20,
    marginRight: 10,
    marginTop: 30,
    position: 'relative',
  },
  avatar: {
    borderColor: Colors.white,
    borderWidth: 2,
  },
  tag: {
    position: 'absolute',
    bottom: -14,
    right: -40,
    zIndex: 99,
  },
  nameContainer: {},
  money: {
    color: Colors.white,
  },
  experience: {
    color: Colors.white,
    textAlign: 'right',
  },
});
