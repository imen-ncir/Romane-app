import {PermissionsAndroid, Platform} from 'react-native';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import {newId} from '../core/NewId';
// Configuration
const audioSet: AudioSet = {
  AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  AudioSourceAndroid: AudioSourceAndroidType.MIC,
  AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  AVNumberOfChannelsKeyIOS: 2,
  AVFormatIDKeyIOS: AVEncodingOption.aac,
};
export const defaultAudioFileExtension = Platform.select({
  ios: 'm4a',
  android: 'mp4',
});
export const getAudioFilePath = (fileName: string) =>
  Platform.select({
    ios: `${fileName}.${defaultAudioFileExtension}`,
    android: `sdcard/${fileName}.${defaultAudioFileExtension}`,
  });
//

const initAudioState = {
  isRecording: false,
  isPlaying: false,
  recordSecs: 0,
  recordTime: '00:00:00',
  currentPositionSec: 0,
  currentDurationSec: 0,
  playTime: '00:00:00',
  duration: '00:00:00',
  fileUri: undefined,
  showPlayer: false,
};

export interface IAudioState {
  isRecording: boolean;
  isPlaying: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
  fileUri?: string;
  showPlayer: boolean;
}

export interface IAudioService {
  audioState: IAudioState;
  askPermission: () => Promise<boolean>;
  startRecording: (fileName: string) => Promise<void>;
  stopRecording: () => Promise<void>;
  startPlaying: (fileUri?: string) => Promise<void>;
  pausePlaying: () => Promise<void>;
  stopPlaying: () => Promise<void>;
  setListener: (callback: (audioState: IAudioState) => void) => void;
  clean: () => void;
}

export class AudioService implements IAudioService {
  private audioRecorderPlayer: AudioRecorderPlayer;
  public audioState: IAudioState;
  private callback: any;

  constructor() {
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // default 0.1
    this.audioState = initAudioState;
  }

  public getNewAudioFileName() {
    return 'roman-audio-' + newId();
  }

  public async askPermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permission d`écriture disque',
            message: "Donner la permission au stockage d'écrire un fichier",
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.info('You can use the storage');
        } else {
          console.error('Permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Permission d'enregistrement audio",
            message: "Donner la permission d'utliser le microphone",
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.info('You can use the microphone');
        } else {
          console.error('Permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  }

  // Microphone Recording
  public startRecording = async (fileName: string): Promise<void> => {
    console.info('[AudioService]: startRecording()', fileName);

    const path = getAudioFilePath(fileName);

    if (!this.askPermission()) return;
    const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
    this.audioState.isRecording = true;
    this.audioState.fileUri = uri;
    this.audioRecorderPlayer.addRecordBackListener((e: any) => {
      this.audioState.recordSecs = e.current_position;
      this.audioState.recordTime = this.audioRecorderPlayer.mmssss(
        Math.floor(e.current_position),
      );
      this.onAudioStateChanged();
    });
  };
  public stopRecording = async () => {
    console.info('[AudioService]: stopRecording()');
    await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.audioState = {
      ...this.audioState,
      isRecording: false,
      recordSecs: 0,
    };
    this.onAudioStateChanged();
  };

  // Audio Playing
  public startPlaying = async (fileUri?: string) => {
    console.info('[AudioService]: startPlaying()', fileUri);
    const uri = fileUri || this.audioState.fileUri;
    this.audioState.isPlaying = true;
    await this.audioRecorderPlayer.startPlayer(uri);
    this.audioRecorderPlayer.setVolume(1.0);
    this.audioRecorderPlayer.addPlayBackListener((e: any) => {
      if (e.current_position === e.duration) {
        this.audioRecorderPlayer.stopPlayer();
        this.audioState.isPlaying = false;
      }
      this.audioState = {
        ...this.audioState,
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      };
      this.onAudioStateChanged();
    });
  };
  public pausePlaying = async () => {
    console.info('[AudioService]: pausePlaying()');
    this.audioState.isPlaying = false;
    this.audioRecorderPlayer.pausePlayer();
    this.onAudioStateChanged();
  };
  public stopPlaying = async () => {
    console.info('[AudioService]: stopPlaying()');
    this.audioState.isPlaying = false;
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
    this.onAudioStateChanged();
  };

  // Event listener
  private onAudioStateChanged = () => {
    // console.info('[AudioService]: onAudioStateChanged()', !!this.callback);
    if (!this.callback) return;
    this.callback(this.audioState);
  };
  public setListener = (callback: (audioState: IAudioState) => void) => {
    this.callback = callback;
  };
  private removeListener = () => {
    this.callback = null;
  };
  public clean() {
    console.info('[AudioService]: clean()');
    this.removeListener();
    this.audioState = {
      ...this.audioState,
      isRecording: false,
      isPlaying: false,
      recordSecs: 0,
      // recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      // playTime: '00:00:00',
    };
  }
}
