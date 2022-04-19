import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../../../../constants/colors';
import { layouts } from '../../../../shared/styles';
import { BaseCard } from '../../../../components/ui';
import { calcPercent } from '../../../../shared/utils';
import { ProgressBar } from 'react-native-paper';
import { ChapterStatDTO } from '../../services';

interface ChapterStatsListItemProps {
  item: ChapterStatDTO;
}

export const ChapterStatsListItem = ({ item }: ChapterStatsListItemProps) => {
  const { chapter, completed, total } = item;

  return (
    <BaseCard style={[layouts.row, styles.container]}>
      <View style={styles.content}>
        <View style={[layouts.row, styles.line]}>
          <Text style={styles.topText}>{chapter}</Text>
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
              :
              <ProgressBar
                progress={completed / total}
                style={styles.progress}
                color={Colors.green}
              />
            }
          </View>
          <Text style={styles.bottomText}>{`${completed}/${total}`}</Text>
        </View>
      </View>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  expand: {
    marginHorizontal: 7,
  },
  container: {
    marginBottom: 10,
    marginLeft: 20,
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
