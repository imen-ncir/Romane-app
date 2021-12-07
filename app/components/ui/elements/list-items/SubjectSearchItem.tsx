import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SimpleCard} from '../cards';
import {theme} from '../../../../shared/styles/theme';
import {Colors} from '../../../../constants';
import {SubjectDTO} from '../../../../modules/Courses/services';

interface SubjectSearchItemProps {
  item: SubjectDTO;
  style?: any;
  onPress?: any;
}

export const SubjectSearchItem = ({
  item,
  style,
  onPress,
}: SubjectSearchItemProps) => {
  const {title, pictureUrl, color} = item;
  return (
    <SimpleCard
      imageSource={pictureUrl ? {uri: pictureUrl} : undefined}
      style={[{backgroundColor: color}, styles.container, style]}>
      <TouchableOpacity onPress={() => onPress(item.id)} style={styles.touch}>
        <View style={{flex: 1}}>
          <Text numberOfLines={2} style={[theme.text, styles.title]}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </SimpleCard>
  );
};

const styles = StyleSheet.create({
  tag: {
    marginBottom: 5,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 10,
  },
  tagText: {
    textTransform: 'capitalize',
    color: Colors.white,
  },
  container: {
    borderRadius: 12,
  },
  touch: {
    flex: 1,
    width: '100%',
  },
  bottomLine: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  title: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: Colors.white,
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  price: {
    fontWeight: 'bold',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  ratingText: {
    fontWeight: 'bold',
  },
  star: {
    // paddingLeft: 5,
  },
});
