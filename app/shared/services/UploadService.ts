import storage from '@react-native-firebase/storage';

export class UploadService {
  static uploadToStorage = async (
    uploadUri: string,
    folder: string,
    filename: string,
  ): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const fileRef = storage().ref(folder).child(filename);
        await fileRef.putFile(uploadUri);
        const publicUrl = await fileRef.getDownloadURL();
        resolve(publicUrl);
      } catch (error) {
        reject(error);
      }
    });
  };
}
