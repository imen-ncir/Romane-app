import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SimpleCard} from '..';
import {getIcon} from '../../../../assets/icons';
import {Colors} from '../../../../constants';
import {SubjectDTO} from '../../../../modules/Courses/services';
import {app} from '../../../../shared/styles';

interface SubjectPreviewProps {
  item: SubjectDTO;
  index?: number;
  offsetMargin?: number;
  onPress?: () => void;
  style?: any;
}

// const COLUMN_OFFSET = 70;

export const SubjectCardItem = ({
  item,
  offsetMargin,
  onPress,
  style,
}: SubjectPreviewProps) => {
  const {title, chapterNumber, pictureUrl, color, fromShop} = item;
  return (
    <View style={[styles.container, {marginTop: offsetMargin}]} key={item.id}>
      <TouchableOpacity onPress={onPress}>
        <SimpleCard
          imageUrl={pictureUrl}
          height={180}
          style={[styles.card, {backgroundColor: color}, style]}>
          {fromShop &&
            getIcon('shop', 16, Colors.white, false, styles.shopIcon)}
          <Text numberOfLines={2} style={[app.text, styles.title]}>
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              app.text,
              styles.chapter,
            ]}>{`${chapterNumber} chapitres`}</Text>
        </SimpleCard>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
  },
  container: {
    flex: 0.48,
    marginBottom: 10,
    zIndex: 2,
  },
  title: {
    textAlign: 'left',
    fontSize: 16,
    color: Colors.white,
    fontWeight: '800',
  },
  chapter: {textAlign: 'left', fontSize: 14, color: Colors.white},
  shopIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
