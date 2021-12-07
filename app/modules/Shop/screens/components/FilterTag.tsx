import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IFilter} from '.';
import {Colors} from '../../../../constants';

interface FilterTagProps {
  item: IFilter;
  onPress: any;
  selected?: boolean;
}

export const FilterTag = ({item, onPress, selected}: FilterTagProps) => {
  const {value, label} = item;
  return (
    <TouchableOpacity
      style={[styles.tag, selected ? styles.selectedFilter : null]}
      onPress={() => onPress(value)}>
      <Text style={[styles.tagText, selected ? styles.selectedText : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(10,10,10, 0.2)',
    borderRadius: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    color: Colors.white,
    fontSize: 16,
  },
  selectedFilter: {
    backgroundColor: Colors.white,
  },
  selectedText: {
    color: Colors.purple,
    fontWeight: 'bold',
  },
});
