import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SimpleCard} from '../cards';
import {PackDTO} from '../../../../modules/Shop';
import {toMoneyFormat} from '../../../../shared/utils';
import {theme} from '../../../../shared/styles/theme';
import {Rating} from '..';
import {Colors} from '../../../../constants';

interface PackCardItemProps {
  item: PackDTO;
  style?: any;
  onPress?: any;
}

export const PackCardItem = ({item, style, onPress}: PackCardItemProps) => {
  const {title, price, rating, imageUrl, color, isFree, level, category} = item;
  return (
    <SimpleCard
      imageSource={imageUrl ? {uri: imageUrl} : undefined}
      style={[{backgroundColor: color}, styles.container, style]}>
      <TouchableOpacity onPress={() => onPress(item.id)} style={styles.touch}>
        <View style={{flex: 1}}>
          <Text numberOfLines={2} style={[theme.text, styles.title]}>
            {title}
          </Text>
          <View style={styles.tag}>
            <Text numberOfLines={1} style={[theme.paragraph, styles.tagText]}>
              {category}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text numberOfLines={1} style={[theme.paragraph, styles.tagText]}>
              {level}
            </Text>
          </View>
        </View>
        <View style={styles.bottomLine}>
          <Text style={[theme.h4, styles.price]}>
            {isFree ? 'Gratuit' : `${toMoneyFormat(price)} €`}
          </Text>
          {rating && <Rating value={rating} />}
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
    width: '100%',
    borderRadius: 12,
    marginTop:6,
    margin:6
  },
  touch: {
    flex: 1,
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
    fontSize:14,
    marginRight:6
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
