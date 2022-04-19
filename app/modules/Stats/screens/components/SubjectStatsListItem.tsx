import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../../../../constants/colors';
import { layouts } from '../../../../shared/styles';
import { BaseCard } from '../../../../components/ui';
import { calcPercent } from '../../../../shared/utils';
import { ProgressBar } from 'react-native-paper';
import { getIcon } from '../../../../assets/icons';
import { SubjectStatDTO } from '../../services';
import { ChapterStatsListItem } from './ChapterStatsListItem';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface SubjectStatsListItemProps {
  item: SubjectStatDTO;
}

export const SubjectStatsListItem = ({ item }: SubjectStatsListItemProps) => {
  const { completed, total, subject, color, chapters } = item;
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setExpanded(curr => !curr)}>
        <BaseCard style={[layouts.row, styles.container]}>
          <View style={[styles.indicator, { backgroundColor: color }]} />
          <View style={styles.expand}>
            {getIcon(
              expanded ? 'expand-less' : 'expand-more',
              28,
              Colors.darkGray,
              false,
              styles.expand,
            )}
          </View>
          <View style={styles.content}>
            <View style={[layouts.row, styles.line]}>
              <Text style={styles.topText}>{subject}</Text>
              <Text style={styles.topText}>{`${calcPercent(
                completed,
                total,
              )}%`}</Text>
            </View>
            <View style={[layouts.row, styles.line]}>
              <View style={styles.progressContainer}>
                {total > 0 ?
                  <ProgressBar
                    progress={completed / total}
                    style={styles.progress}
                    color={Colors.green}
                  />
                  : <ProgressBar
                    progress={0}
                    style={styles.progress}
                    color={Colors.green}
                  />
                }
              </View>
              <Text style={styles.bottomText}>{`${completed}/${total}`}</Text>
            </View>
          </View>
        </BaseCard>
      </TouchableWithoutFeedback>
      {expanded &&
        chapters &&
        chapters.map((c, index) => (
          <ChapterStatsListItem key={index} item={c} />
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  expand: {
    marginHorizontal: 7,
  },
  container: {
    marginBottom: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  line: {
    flex: 1,
  },
  indicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 16,
  },
  progress: {
    height: 10,
    borderRadius: 8,
    backgroundColor: Colors.gray,
  },
  progressContainer: {
    flex: 1,
  },
  topText: {
    fontWeight: 'bold',
    color: Colors.darkGray,
    fontSize: 16,
  },
  bottomText: {
    marginLeft: 10,
    color: Colors.dark,
    fontSize: 14,
  },
});
