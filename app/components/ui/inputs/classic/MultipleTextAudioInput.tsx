import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import {Colors} from '../../../../constants';
import {inputs} from '../../../../shared/styles';
import {AudioPicker} from '../../elements';
import {CustomTextInput} from './CustomTextInput';
import {TextAudioValue} from './TextAudioInput';
import {Checkbox} from 'react-native-paper';

export interface MultipleTextAudioValue extends TextAudioValue {
  isRight?: boolean;
}

export interface MultipleTextAudioInputProps {
  onChange: (value: MultipleTextAudioValue) => any;
  defaultValue?: MultipleTextAudioValue;
  value: MultipleTextAudioValue;
  isOnError?: boolean;
  style?: any;
  [x: string]: any;
}

export const MultipleTextAudioInput = ({
  onChange,
  value,
  isOnError,
  style,
  ...props
}: MultipleTextAudioInputProps) => {
  // const [checked, setChecked] = React.useState(selection?.isRight);

  const handleCheck = () => {
    const newValue = !value?.isRight;
    const newState = {...value, isRight: newValue};
    // setChecked(newValue);
    onChange(newState);
  };

  const handlePressAudio = (audioFileUri: string) => {
    const newState = {...value, audioFileUri};
    onChange(newState);
  };

  const handleChangeText = (text: string) => {
    const newState = {...value, text};
    onChange(newState);
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={{
          backgroundColor: Colors.mediumGray,
          borderWidth: 1,
          borderColor: Colors.gray,
          borderRadius: 50,
          marginHorizontal: 5,
        }}>
        <Checkbox
          status={value?.isRight ? 'checked' : 'unchecked'}
          onPress={handleCheck}
          color={Colors.green}
          uncheckedColor={Colors.darkGray}
        />
      </View>
      <CustomTextInput
        style={[
          inputs.input,
          styles.input,
          isOnError ? inputs.onError : {},
          style,
        ]}
        defaultValue={value?.text || undefined}
        placeholderTextColor={isOnError ? Colors.googleRed : Colors.darkGray}
        autoCapitalize="none"
        onChangeText={handleChangeText}
        autoCorrect={false}
        {...props}
      />
      <AudioPicker
        tiny
        onPress={handlePressAudio}
        value={value?.audioFileUri || undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 10,
    textAlign: 'left',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
