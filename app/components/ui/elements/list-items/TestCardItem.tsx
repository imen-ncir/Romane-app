import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SimpleCard} from '../cards';
import {theme} from '../../../../shared/styles/theme';
import {Colors} from '../../../../constants';
import {TestDTO} from '../../../../modules/Tests';
import {useRecoilSubjects} from '../../../../contexts/atoms';
import {getIcon} from '../../../../assets/icons';

interface TestCardItemProps {
  item: TestDTO;
  style?: any;
  onPress?: any;
}

export const TestCardItem = ({item, style, onPress}: TestCardItemProps) => {
  const {getSubject} = useRecoilSubjects();
  const {subjectId, id, length} = item;
  const subject = subjectId && getSubject(subjectId);
  if (!subject) return null;

  const {pictureUrl, color, title} = subject;
  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
      style={[styles.container, style]}>
      <SimpleCard
        imageSource={pictureUrl ? {uri: pictureUrl} : undefined}
        style={[{backgroundColor: color}, styles.card]}>
        {getIcon('play', 40, Colors.white, false, styles.icon)}
      </SimpleCard>
      <Text style={[theme.text, styles.title]} numberOfLines={1}>
        {title}
      </Text>
      <Text
        style={[theme.paragraph, styles.number]}
        numberOfLines={1}>{`${length} cartes`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    minWidth: 90,
  },
  icon: {
    alignSelf: 'center',
    marginVertical: 5,
  },
  title: {
    fontWeight: 'bold',
  },
  number: {
    color: Colors.dark,
  },
});
