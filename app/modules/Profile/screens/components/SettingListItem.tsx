import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getIcon} from '../../../../assets/icons';
import {Colors} from '../../../../constants';
import {layouts} from '../../../../shared/styles';
import {typos} from '../../../../shared/styles/typos';

export interface ISettingListItem {
  icon: string;
  text: string;
  action: () => void;
}

interface SettingListItemProps {
  item: ISettingListItem;
}

export const SettingListItem = ({item}: SettingListItemProps) => {
  const {icon, text, action} = item;
  return (
    <TouchableOpacity style={[layouts.row, styles.container]} onPress={action}>
      <View style={styles.leftContent}>
        {getIcon(icon, 24, Colors.darkGray)}
        <Text style={[typos.listItem, styles.text]}>{text}</Text>
      </View>
      {getIcon('chevron-right', 16, Colors.darkGray)}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
    shadowColor: Colors.darkGray,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: {height: 3, width: 0},
  },
  text: {
    marginHorizontal: 8,
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContent: {},
});
