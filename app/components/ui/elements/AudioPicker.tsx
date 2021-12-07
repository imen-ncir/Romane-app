import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {ModalNames} from '../../../constants';
import {IconButton, PrimaryButton} from '../buttons';
import {audioService} from '../../../shared/services';

export interface AudioPickerProps {
  style?: any;
  onPress?: (url: string) => any;
  value?: string;
  tiny?: boolean;
}

export const AudioPicker = ({
  onPress,
  style,
  value,
  tiny,
}: AudioPickerProps) => {
  const {navigate} = useNavigation();
  const [selection, setSelection] = useState<any>(value || null);

  const handlePress = () => {
    navigate(ModalNames.AudioRecord, {
      onSave: handleSave,
      uri: value || audioService.getNewAudioFileName(),
    });
  };

  const handleSave = async (audioFileUrl: string) => {
    if (!audioFileUrl) return;
    setSelection(audioFileUrl);
    if (onPress) onPress(audioFileUrl);
  };

  return tiny ? (
    <IconButton
      icon={selection ? 'check' : `audio-listen`}
      onPress={handlePress}
      style={[style]}
    />
  ) : (
    <PrimaryButton
      style={[styles.button, style]}
      onPress={handlePress}
      icon={'audio-listen'}
      text={!!selection ? '1 Fichier' : 'Ajouter un audio'}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 40,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
});
