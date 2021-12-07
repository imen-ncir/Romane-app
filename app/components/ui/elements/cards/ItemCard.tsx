import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors} from '../../../../constants';
import {SimpleCard, SimpleCardProps} from './SimpleCard';

interface ItemCardProps extends SimpleCardProps {
  title: string;
}

export const ItemCard = ({title, children, ...props}: ItemCardProps) => {
  return (
    <SimpleCard {...props}>
      <Text style={styles.itemCardTitle}>{title}</Text>
      {children}
    </SimpleCard>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 5,
    width: '48%',
    minHeight: 170,
    maxHeight: 170,
  },
  itemCard: {
    borderRadius: 32,
    padding: 12,
    height: '100%',
  },
  itemCardTitle: {
    fontFamily: 'Arial',
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    borderRadius: 12,
  },
});
