import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BaseCard} from '..';
import {getIcon} from '../../../../assets/icons';
import {Colors} from '../../../../constants';
import {ChapterDTO} from '../../../../modules/Courses/services';
import {layouts} from '../../../../shared/styles';
import {theme} from '../../../../shared/styles/theme';

interface ChapterItemProps {
  item: ChapterDTO;
  onPress?: () => void;
  onPressOverview?: () => void;
  style?: any;
}

export const ChapterItem = ({
  item,
  onPress,
  onPressOverview,
  style,
}: ChapterItemProps) => {
  const {title, flashcardsNumber} = item;

  return (
    <BaseCard style={[layouts.row, styles.container, style]}>
      <TouchableOpacity
        style={{alignItems: 'stretch', flex: 1}}
        onPress={onPress}>
        <Text style={[theme.h4, styles.chapterTitle]} numberOfLines={2}>
          {title}
        </Text>
        <Text style={[theme.paragraph]}>{flashcardsNumber} cartes</Text>
      </TouchableOpacity>
      {onPressOverview && flashcardsNumber > 0 && (
        <TouchableOpacity
          onPress={onPressOverview}
          style={[styles.overviewButton]}>
          {getIcon('eye', 28, Colors.darkGray, false, styles.overviewIcon)}
        </TouchableOpacity>
      )}
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    // minHeight: 80,
    height: 80,
    padding: 20,
    borderRadius: 12,
    justifyContent: 'flex-start',
  },
  chapterTitle: {
    color: Colors.darkGray,
    fontWeight: 'bold',
  },
  overviewButton: {
    padding: 5,
    marginHorizontal: 10,
  },
  overviewIcon: {},
  selectButton: {
    borderRadius: 50,
    padding: 5,
  },
  selectIcon: {},
});
