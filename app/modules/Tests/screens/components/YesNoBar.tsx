import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getIcon} from '../../../../assets/icons';
import {Colors} from '../../../../constants/colors';
import {app, layouts} from '../../../../shared/styles';

interface YesNoBarProps {
  onAnswer: (value: boolean) => any;
  style?: any;
}

const buttonSize = 60;

export const YesNoBar = ({onAnswer, style}: YesNoBarProps) => {
  return (
    <View style={[layouts.row, styles.container, style]}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Je ne sais pas</Text>
        <TouchableOpacity onPress={() => onAnswer(false)} style={styles.button}>
          {getIcon('close-outline', buttonSize, Colors.red, false, [
            app.softShadows,
            styles.no,
          ])}
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Je sais</Text>
        <TouchableOpacity onPress={() => onAnswer(true)} style={styles.button}>
          {getIcon('check-outline', buttonSize, Colors.green, false, [
            app.softShadows,
            styles.yes,
          ])}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 20,
    minWidth: '33%',
  },
  button: {
    padding: 0,
    margin: 0,
    marginRight: -5,
  },
  text: {
    fontSize: 16,
  },
  yes: {
    shadowColor: Colors.green,
    shadowRadius: 3,
    shadowOpacity: 0.5,
  },
  no: {
    shadowColor: Colors.red,
    shadowRadius: 3,
    shadowOpacity: 0.5,
  },
});
