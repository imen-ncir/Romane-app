import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../../../constants';
import {inputs} from '../../../../shared/styles';
import {AudioPicker} from '../../elements';
import {CustomTextInput} from './CustomTextInput';

export interface TextAudioValue {
  text?: string;
  audioFileUri?: string;
}

export interface TextAudioInputProps {
  onChange: (value: TextAudioValue) => any;
  defaultValue?: TextAudioValue;
  isOnError?: boolean;
  style?: any;
  [x: string]: any;
}

export const TextAudioInput = ({
  onChange,
  defaultValue,
  isOnError,
  style,
  ...props
}: TextAudioInputProps) => {
  const [selection, setSelection] = useState<TextAudioValue | undefined>(
    defaultValue,
  );

  const handlePressAudio = (audioFileUri: string) => {
    const newState = {...selection, audioFileUri};
    setSelection(newState);
    onChange(newState);
  };

  const handleChangeText = (text: string) => {
    const newState = {...selection, text};
    setSelection(newState);
    onChange(newState);
  };

  return (
    <View style={[styles.container, style]}>
      <CustomTextInput
        style={[
          inputs.input,
          styles.input,
          isOnError ? inputs.onError : {},
          style,
        ]}
        defaultValue={selection?.text || undefined}
        placeholderTextColor={isOnError ? Colors.googleRed : Colors.darkGray}
        autoCapitalize="none"
        onChangeText={handleChangeText}
        autoCorrect={false}
        {...props}
      />
      <AudioPicker
        tiny
        onPress={handlePressAudio}
        value={selection?.audioFileUri || undefined}
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
