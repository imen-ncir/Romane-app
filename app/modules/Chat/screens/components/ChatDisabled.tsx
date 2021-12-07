import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getIcon} from '../../../../assets/icons';
import {OpacityButton} from '../../../../components/ui';
import {Colors} from '../../../../constants';
import {theme} from '../../../../shared/styles/theme';
import {ratio} from '../../../../shared/utils';

interface ChatDisabledProps {
  message?: string;
  style?: any;
  onEnable?: any;
}

export const ChatDisabled = ({
  message = 'Conversation bloquée',
  onEnable,
  style,
}: ChatDisabledProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        {getIcon('blocked', 48, Colors.red)}
        <Text style={[theme.h2, styles.message]}>{message}</Text>
        {onEnable && (
          <View style={{marginTop: 20, alignItems: 'center'}}>
            {/* {getIcon('chevron-down', 24, Colors.darkGray)} */}
            <OpacityButton
              text="Activer"
              onPress={onEnable}
              style={styles.btn}
            />
            {/* {getIcon('chevron-up', 24, Colors.darkGray)} */}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    color: Colors.red,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 10,
  },
  btn: {
    // borderWidth: 1,
    // borderColor: Colors.darkGray,
    // borderRadius: 24,
  },
});
