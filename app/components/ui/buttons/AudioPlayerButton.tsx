import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getIcon} from '../../../assets/icons';
import {Colors} from '../../../constants';
import {audioService} from '../../../shared/services';
import {theme} from '../../../shared/styles/theme';
import {IconButton} from '.';

interface AudioPlayerButtonProps {
  uri: string;
  text?: string;
  tiny?: boolean;
  style?: any;
}

export const AudioPlayerButton = ({
  uri,
  text,
  tiny,
  style,
}: AudioPlayerButtonProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    audioService.setListener(state => setIsPlaying(state.isPlaying));
    return () => {
      audioService.clean();
    };
  }, []);

  const onStartPlay = async () => {
    if (!uri) return;
    audioService.startPlaying(uri);
  };

  const onStopPlay = async () => {
    audioService.stopPlaying();
  };

  if (tiny) {
    return (
      <IconButton
        icon={isPlaying ? 'audio-stop' : `audio-listen`}
        onPress={isPlaying ? onStopPlay : onStartPlay}
        style={[style]}
      />
    );
  }

  return isPlaying ? (
    <TouchableOpacity onPress={onStopPlay} style={[styles.button, style]}>
      {getIcon('audio-stop', 32)}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onStartPlay} style={[styles.button, style]}>
      <Text>{getIcon('audio-listen', 32)}</Text>
      {text && (
        <Text style={[theme.buttonText, styles.buttonText]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles: any = StyleSheet.create({
  button: {
    backgroundColor: Colors.purple,
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    marginLeft: 10,
  },
});
