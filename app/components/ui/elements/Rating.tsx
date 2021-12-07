import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {getIcon} from '../../../assets/icons';
import {Colors} from '../../../constants';
import {theme} from '../../../shared/styles/theme';
import {toRatingFormat} from '../../../shared/utils';

interface RatingProps {
  value: number;
  style?: any;
  big?: boolean;
  color?: string;
}

export const Rating = ({value, style, big, color}: RatingProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.rating]}>
        <Text
          style={[
            big ? theme.h3 : theme.h4,
            styles.ratingText,
            {color: color || Colors.white},
          ]}>
          {toRatingFormat(value)}
        </Text>
        {getIcon(
          'star',
          big ? 28 : 16,
          color || Colors.white,
          false,
          styles.star,
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize:14
  },
  star: {
    // paddingLeft: 5,
  },
});
