import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BaseCard, ChapterSelectionList} from '../../../../components/ui';
import {layouts} from '../../../../shared/styles';
import {SubjectFullDTO} from '../../services';
import {theme} from '../../../../shared/styles/theme';
import {Colors} from '../../../../constants';
import {getIcon} from '../../../../assets/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface SubjectOverviewProps {
  item: SubjectFullDTO;
  selection: string[];
  onPressChapterOverview: any;
  onPressSelectChapter: any;
  onPressSelect: any;
  style?: any;
}

export const SubjectOverview = ({
  item,
  onPressSelect,
  onPressSelectChapter,
  onPressChapterOverview,
  selection,
  style,
}: SubjectOverviewProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const {title, color, chapters} = item;
  const selected =
    chapters &&
    chapters.length > 0 &&
    selection &&
    selection.length === chapters.length;

  return (
    <>
      <BaseCard style={[layouts.row, styles.container, style]}>
        <View style={[styles.colorBox, {backgroundColor: color}]} />
        <View style={{alignItems: 'stretch', flex: 1}}>
          <TouchableOpacity
            onPress={() => setExpanded(curr => !curr)}
            style={styles.content}>
            {getIcon(
              expanded ? 'expand-less' : 'expand-more',
              28,
              Colors.darkGray,
              false,
              styles.expand,
            )}
            <Text style={[theme.h4, styles.subjectTitle]} numberOfLines={2}>
              {title}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={[theme.h4, styles.chapterNumber]}>
          {selection.length}/{chapters.length}
        </Text>
        <TouchableOpacity
          onPress={() => onPressSelect(item)}
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
      </BaseCard>
      {expanded && chapters && (
        <View style={{marginLeft: 20}}>
          <ChapterSelectionList
            chapters={chapters}
            onPressItem={(chapterId: string) =>
              onPressSelectChapter(item.id, chapterId)
            }
            onPressOverview={(chapterId: string) =>
              onPressChapterOverview(chapterId)
            }
            selection={selection}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    height: 60,
    padding: 0,
    borderRadius: 12,
    paddingRight: 20,
    justifyContent: 'flex-start',
  },
  colorBox: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    width: 15,
    height: '100%',
    marginRight: 10,
  },
  expand: {
    marginRight: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectTitle: {
    color: Colors.darkGray,
    fontWeight: 'bold',
    maxWidth: '75%',
  },
  chapterNumber: {
    color: Colors.darkGray,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  selectButton: {
    borderRadius: 50,
    padding: 5,
  },
  selectIcon: {},
});
