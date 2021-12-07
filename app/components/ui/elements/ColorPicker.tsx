import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../../constants';
import {BaseCard} from './cards';

export interface ColorPickerProps {
  colors: string[];
  style?: any;
  defaultValue?: string;
  onPress?: (selection: string) => any;
}
export const ColorPicker = ({
  colors,
  defaultValue,
  onPress,
  style,
}: ColorPickerProps) => {
  const [selection, setSelection] = useState(defaultValue || '');

  const renderColor = (color: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.color,
        {backgroundColor: color},
        selection === color ? styles.selected : null,
      ]}
      onPress={() => {
        const value = color === selection ? '' : color;
        setSelection(value);
        if (onPress) onPress(value);
      }}
    />
  );

  return (
    <BaseCard style={style}>
      <View style={styles.container}>
        {colors && colors.map((c, index) => renderColor(c, index))}
      </View>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  color: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  selected: {
    borderColor: Colors.darkGray,
  },
});
