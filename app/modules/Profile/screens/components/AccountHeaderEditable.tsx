import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {AvatarPicker} from '../../../../components/ui';
import {Colors} from '../../../../constants';
import {app, layouts} from '../../../../shared/styles';
import {theme} from '../../../../shared/styles/theme';
import {ProfileDTO} from '../../services';

interface AccountHeaderEditableProps {
  user: ProfileDTO;
  onChangeValue: (field: string, value: string) => void;
}

export const AccountHeaderEditable = ({
  user,
  onChangeValue,
}: AccountHeaderEditableProps) => {
  return (
    <View style={[layouts.row, styles.container]}>
      <View style={styles.avatarContainer}>
        <AvatarPicker
          defaultValue={user.photoURL}
          onPress={uri => onChangeValue('avatarFileUri', uri)}
        />
      </View>
      <View style={styles.nameContainer}>
        <TextInput
          returnKeyType="done"
          style={[app.text, theme.h1, styles.nameInput]}
          defaultValue={user.username}
          onChangeText={(text: string) => onChangeValue('displayName', text)}
        />
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
    marginRight: 10,
    marginTop: 30,
    position: 'relative',
  },
  avatar: {
    borderColor: Colors.white,
    borderWidth: 2,
  },
  nameContainer: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    flex: 1,
  },
  nameInput: {
    // borderBottomColor: Colors.white,
    // borderBottomWidth: 1,
  },
});
