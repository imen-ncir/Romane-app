import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getIcon} from '../../../../assets/icons';
import {Colors} from '../../../../constants';
import {theme} from '../../../../shared/styles/theme';
import {ratio} from '../../../../shared/utils';

interface ChatEmptyProps {
  message?: string;
  style?: any;
}

export const ChatEmpty = ({
  message = 'Aucun message',
  style,
}: ChatEmptyProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        {getIcon('chat-bubble', 48, Colors.purple)}
        <Text style={[theme.h2, styles.message]}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    transform: [{scaleY: -1}], // Message Empty Inverted from Gifted Chat
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
  },
  content: {
    borderColor: Colors.gray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    paddingVertical: 40 * ratio,
  },
  message: {
    color: Colors.darkGray,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 10,
  },
});
