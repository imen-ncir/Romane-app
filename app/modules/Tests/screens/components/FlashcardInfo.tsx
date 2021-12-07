import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors} from '../../../../constants/colors';
import {layouts} from '../../../../shared/styles';
import {theme} from '../../../../shared/styles/theme';

interface FlashcardInfoProps {
  subject: string;
  chapter: string;
  color: string;
  style?: any;
}

export const FlashcardInfo = ({
  subject,
  chapter,
  color,
  style,
}: FlashcardInfoProps) => {
  return (
    <View style={[layouts.row, styles.cardInfo, style]}>
      <View>
        <Text style={[theme.h4, styles.subject]}>{subject}</Text>
        <Text style={[theme.paragraph, styles.chapter]}>{chapter}</Text>
      </View>
      <View style={[styles.color, {backgroundColor: color}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardInfo: {
    justifyContent: 'flex-end',
  },
  color: {
    height: 24,
    width: 24,
    borderRadius: 16,
  },
  subject: {
    color: Colors.darkGray,
    marginHorizontal: 10,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  chapter: {
    textAlign: 'right',
    marginHorizontal: 10,
  },
});
