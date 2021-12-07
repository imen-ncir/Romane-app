import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {getIcon} from '../../../../assets/icons';
import {Avatar} from '../../../../components/ui';
import {Colors} from '../../../../constants';
import {app, layouts} from '../../../../shared/styles';
import {theme} from '../../../../shared/styles/theme';
import {formatDate, formatTime, isToday} from '../../../../shared/utils';
import {ConversationDTO} from '../../services';

interface ConversationListItemProps {
  item: ConversationDTO;
  onPress: any;
  style?: any;
}

function displayMessageDate(date: Date) {
  if (!date) return 'N/A';

  return isToday(date) ? formatTime(date) : formatDate(date);
}

export const ConversationListItem = ({
  item,
  onPress,
  style,
}: ConversationListItemProps) => {
  const {name, lastMessage, lastMessageReceivedDate, pictureUrl} = item;

  return (
    <TouchableOpacity
      style={[layouts.row, styles.container, style]}
      onPress={() => onPress(item.conversationId)}>
      {pictureUrl ? (
        <View style={[app.softShadows, {borderRadius: 50}]}>
          <Avatar url={pictureUrl} style={[styles.avatar]} />
        </View>
      ) : (
        <View style={styles.icon}>{getIcon('message', 32, Colors.purple)}</View>
      )}

      <View style={styles.content}>
        <Text style={[theme.h2, styles.name]}>{name}</Text>
        <View style={[styles.bottom]}>
          <Text style={[theme.h4, styles.lastMessage]} numberOfLines={1}>
            {lastMessage || 'Aucun message'}
          </Text>
          <Text style={[theme.h4, styles.date]}>
            {lastMessageReceivedDate
              ? displayMessageDate(lastMessageReceivedDate)
              : 'N/A'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingLeft: 10,
    borderColor: Colors.gray,
    borderBottomWidth: 1,
  },
  avatar: {
    marginRight: 10,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  icon: {
    borderRadius: 32,
    borderWidth: 1,
    borderColor: Colors.purple,
    padding: 10,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    color: Colors.purple,
    fontWeight: 'bold',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    color: Colors.dark,
    fontWeight: 'bold',
    maxWidth: '75%',
  },
  date: {
    color: Colors.dark,
  },
});
