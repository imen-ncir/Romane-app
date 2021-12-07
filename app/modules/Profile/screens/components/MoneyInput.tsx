import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {BaseCard} from '../../../../components/ui';
import {Colors} from '../../../../constants';
import {app, layouts} from '../../../../shared/styles';
import {theme} from '../../../../shared/styles/theme';

interface MoneyInputProps {
  value?: number;
  defaultValue?: number;
  description?: string;
  onChange: (value?: number) => any;
  style?: any;
}

export const MoneyInput = ({
  defaultValue,
  value,
  description,
  onChange,
  style,
}: MoneyInputProps) => {
  const formattedValue = value !== undefined ? value.toString() : '';
  const formattedDefault =
    defaultValue !== undefined ? defaultValue.toString() : '';

  const handleChange = (value: string) => {
    if (!value) {
      onChange(undefined);
      return;
    }
    const integer = parseInt(value);
    if (isNaN(integer)) return;
    onChange(integer);
  };

  return (
    <BaseCard style={[app.softShadows, styles.container, style]}>
      <View style={[layouts.row, styles.inputWrapper]}>
        <TextInput
          placeholder="00"
          onChangeText={handleChange}
          keyboardType={'number-pad'}
          returnKeyType="done"
          // onBlur={() => Keyboard.dismiss()}
          maxLength={2}
          defaultValue={formattedDefault}
          value={formattedValue}
          style={[theme.h1, styles.input]}
          placeholderTextColor={Colors.gray}
        />
        <Text style={[theme.h1, {color: value ? Colors.purple : Colors.gray}]}>
          €
        </Text>
      </View>
      <Text style={[theme.h4, styles.description]}>{description}</Text>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.mediumGray,
    borderRadius: 12,
    minWidth: 100,
  },
  input: {
    color: Colors.purple,
    marginRight: 5,
    minWidth: 50,
  },
  description: {
    color: Colors.darkGray,
    flex: 1,
    // flexWrap: 'wrap',
    // maxWidth: 200,
    paddingHorizontal: 20,
  },
});
