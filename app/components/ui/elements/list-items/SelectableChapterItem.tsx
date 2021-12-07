import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BaseCard} from '..';
import {getIcon} from '../../../../assets/icons';
import {Colors} from '../../../../constants';
import {ChapterDTO} from '../../../../modules/Courses/services';
import {layouts} from '../../../../shared/styles';
import {theme} from '../../../../shared/styles/theme';

interface SelectableChapterItemProps {
  item: ChapterDTO;
  onPressSelect?: () => void;
  onPressOverview?: () => void;
  selected?: boolean;
  style?: any;
}

export const SelectableChapterItem = ({
  item,
  onPressSelect,
  onPressOverview,
  selected,
  style,
}: SelectableChapterItemProps) => {
  const {title, flashcardsNumber} = item;

  return (
    <BaseCard style={[layouts.row, styles.container, style]}>
      <View style={{alignItems: 'stretch', flex: 1}}>
        <Text style={[theme.h4, styles.chapterTitle]} numberOfLines={2}>
          {title}
        </Text>
        <Text style={[theme.paragraph]}>{flashcardsNumber} cartes</Text>
      </View>
      <>
        {onPressOverview && flashcardsNumber > 0 && (
          <TouchableOpacity
            onPress={onPressOverview}
            style={[styles.overviewButton]}>
            {getIcon('eye', 28, Colors.darkGray, false, styles.overviewIcon)}
          </TouchableOpacity>
        )}
        {onPressSelect && (
          <TouchableOpacity
            onPress={onPressSelect}
            style={[
              styles.selectButton,
              {backgroundColor: selected ? Colors.green : Colors.mediumGray},
            ]}>
            {getIcon(
              'check',
              28,
              selected ? Colors.white : Colors.gray,
              false,
              styles.selectIcon,
            )}
          </TouchableOpacity>
        )}
      </>
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
