import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../../../constants';
import {app} from '../../../../shared/styles';

interface RadioInputItem {
  label: string;
  value: string;
}

export interface RadioInputProps {
  items: RadioInputItem[];
  onChange: (value: string) => any;
  defaultValue?: string;
  style?: any;
  backgroundColor?: string;
  textColor?: string;
  selectedBackgroundColor?: string;
  selectedTextColor?: string;
  selectedShadowColor?: string;
}

export const RadioInput = ({
  items,
  onChange,
  style,
  defaultValue,
  selectedShadowColor = Colors.purple,
  backgroundColor = Colors.lightBlue,
  selectedBackgroundColor = Colors.purple,
  selectedTextColor = Colors.lightGray,
  textColor = Colors.dark,
}: RadioInputProps) => {
  const [selection, setSelection] = useState<string | undefined>(defaultValue);

  const handlePress = (value: string) => {
    setSelection(value);
    onChange(value);
  };

  return (
    <View style={[styles.container, style]}>
      {items &&
        items.map((i, index) => {
          const {label, value} = i;
          const selected = selection && selection === value;
          return (
            <TouchableOpacity
              onPress={() => handlePress(value)}
              key={index}
              style={[
                styles.item,
                app.softShadows,
                {
                  backgroundColor: selected
                    ? selectedBackgroundColor
                    : backgroundColor,
                  shadowColor: selected ? selectedShadowColor : 'transparent',
                },
              ]}>
              <Text
                style={[
                  styles.itemText,
                  {color: selected ? selectedTextColor : textColor},
                ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 32,
    backgroundColor: Colors.lightBlue,
    opacity: 0.8,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
});
