import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getIcon} from '../../../assets/icons';
import {audioService} from '../../../shared/services';
import {Colors} from '../../../constants';
import {ActivityIndicator} from 'react-native-paper';

interface AudioRecorderButtonProps {
  fileName?: string;
  recordOnHold?: boolean;
  onStop: (fileUri: string) => void;
}

export const AudioRecorderButton = ({
  fileName,
  recordOnHold = false,
  onStop,
}: AudioRecorderButtonProps) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [fileUri, setFileUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    audioService.setListener(state => {
      setIsRecording(state.isRecording);
      setFileUri(state.fileUri);
    });
    return () => {
      audioService.clean();
    };
  }, []);

  const onStartRecord = async () => {
    audioService.startRecording(fileName || audioService.getNewAudioFileName());
  };

  const onStopRecord = async () => {
    audioService.stopRecording();
    if (fileUri) onStop(fileUri);
  };

  if (recordOnHold) {
    return (
      <TouchableOpacity
        onPressOut={onStopRecord}
        onLongPress={onStartRecord}
        style={[styles.button]}>
        {isRecording ? (
          <ActivityIndicator style={{padding: 10}} />
        ) : (
          getIcon('audio-record', 32)
        )}
      </TouchableOpacity>
    );
  }

  return isRecording ? (
    <TouchableOpacity onPress={onStopRecord} style={[styles.button]}>
      {getIcon('audio-stop', 32)}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onStartRecord} style={[styles.button]}>
      {getIcon('audio-record', 32)}
    </TouchableOpacity>
  );
};

const styles: any = StyleSheet.create({
  button: {
    backgroundColor: Colors.purple,
    borderRadius: 50,
    padding: 10,
  },
});
