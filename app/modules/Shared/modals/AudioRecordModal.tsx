import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ratio, screenWidth} from '../../../shared/utils';
import {Colors} from '../../../constants';
import {getIcon} from '../../../assets/icons';
import {audioService, IAudioState} from '../../../shared/services';
import {BaseScreenProps} from '../../../shared/core/Screen';

export const AudioRecordModal = ({navigation, route}: BaseScreenProps) => {
  const onSave = route.params.onSave;
  const uri = route.params.uri;
  const [audioState, setAudioState] = useState<IAudioState | undefined>();
  useEffect(() => {
    setAudioState(audioService.audioState);
    audioService.setListener(state => {
      setAudioState(curr => ({...curr, ...state}));
    });
    return () => {
      audioService.clean();
    };
  }, []);

  const handleStartRecord = async () => {
    if (!audioService.askPermission()) return;
    await audioService.startRecording(uri);
  };
  const handleStopRecord = async () => {
    await audioService.stopRecording();
  };

  const handleStartPlay = async () => {
    await audioService.startPlaying();
  };
  const handlePausePlay = async () => {
    await audioService.pausePlaying();
  };
  const handleStopPlay = async () => {
    await audioService.stopPlaying();
  };

  const handleSave = async () => {
    if (
      onSave &&
      audioState &&
      audioState.fileUri &&
      audioState.recordTime != '00:00:00'
    ) {
      onSave(audioState.fileUri);
    }
    handleClose();
  };

  const handleClose = async () => {
    navigation.goBack();
  };

  if (!audioService || !audioState) return null;

  const {
    isRecording,
    isPlaying,
    fileUri,
    currentPositionSec,
    currentDurationSec,
    playTime,
    recordTime,
  } = audioState;

  let playWidth =
    (currentPositionSec / currentDurationSec) * (screenWidth - 56 * ratio);
  if (!playWidth) playWidth = 0;

  return (
    <View style={styles.container}>
      <View style={styles.viewPlayer}>
        <TouchableOpacity onPress={handleClose} style={styles.backBtn}>
          {getIcon('back', 32)}
        </TouchableOpacity>
        <Text style={styles.titleTxt}>Enregistrement Audio</Text>
        <View style={styles.playBtnWrapper}>
          <TouchableOpacity
            onPress={handleStartPlay}
            style={[
              !fileUri || isPlaying || isRecording ? styles.disabled : null,
            ]}
            disabled={!fileUri || isPlaying || isRecording}>
            {getIcon(
              'audio-play',
              64,
              Colors.white,
              false,
              !fileUri || isPlaying || isRecording ? styles.disabled : null,
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePausePlay}
            disabled={!isPlaying || isRecording}
            style={{marginLeft: 15 * ratio}}>
            {getIcon(
              'audio-pause',
              64,
              Colors.white,
              false,
              !isPlaying || isRecording ? styles.disabled : null,
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleStopPlay}
            disabled={!isPlaying || isRecording}
            style={{marginLeft: 15 * ratio}}>
            {getIcon(
              'audio-stop',
              64,
              Colors.white,
              false,
              !isPlaying || isRecording ? styles.disabled : null,
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.viewBarWrapper}>
          <View style={styles.viewBar}>
            <View style={[styles.viewBarPlay, {width: playWidth}]} />
          </View>
        </View>
        <Text style={styles.txtCounter}>
          {playTime > recordTime ? recordTime : playTime} / {recordTime}
        </Text>
      </View>
      <View style={styles.viewRecorder}>
        <View style={styles.recordBtnWrapper}>
          {isRecording ? (
            <TouchableOpacity
              onPress={handleStopRecord}
              style={styles.recordBtn}>
              {getIcon('stop', 64)}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleStartRecord}
              style={styles.recordBtn}>
              {getIcon('audio-record', 64)}
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.txtRecordCounter}>{recordTime}</Text>
      </View>
      <TouchableOpacity
        onPress={handleSave}
        style={[styles.recordBtn, styles.saveBtn]}>
        {getIcon('check', 28)}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  titleTxt: {
    marginTop: 100 * ratio,
    color: 'white',
    fontSize: 28 * ratio,
  },
  viewRecorder: {
    marginTop: 40 * ratio,
    width: '100%',
    alignItems: 'center',
    marginBottom: 60 * ratio,
  },
  recordBtnWrapper: {
    flexDirection: 'row',
  },
  viewPlayer: {
    marginTop: 20 * ratio,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    marginTop: 28 * ratio,
    marginHorizontal: 28 * ratio,
    alignSelf: 'stretch',
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: 4 * ratio,
    alignSelf: 'stretch',
  },
  viewBarPlay: {
    backgroundColor: 'white',
    height: 4 * ratio,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8 * ratio,
    color: '#ccc',
  },
  playBtnWrapper: {
    flexDirection: 'row',
    marginTop: 40 * ratio,
  },
  txtRecordCounter: {
    marginTop: 15 * ratio,
    color: 'white',
    fontSize: 20 * ratio,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  txtCounter: {
    marginTop: 12 * ratio,
    color: 'white',
    fontSize: 20 * ratio,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  recordBtn: {
    borderWidth: 1 * ratio,
    borderColor: Colors.white,
    padding: 20 * ratio,
    borderRadius: 64,
  },
  saveBtn: {
    position: 'absolute',
    bottom: 60,
    left: 'auto',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 40,
  },
  disabled: {
    opacity: 0.5,
  },
});
