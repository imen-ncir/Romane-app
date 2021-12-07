import firestore from '@react-native-firebase/firestore';

// Real time listener on messages collections

// Using firestore message object
export interface DataMessage {
  conversation_id: string;
  text: string;
  sent_at: Date;
  sent_by: string;
  username: string;
  avatar_url?: string;
  doc_id: string;
}

export const attachMessagesListener = (
  conversationId: string,
  callback: (message?: DataMessage) => any,
) => {
  const collectionRef = firestore()
    .collection('conversations')
    .doc(conversationId)
    .collection('messages');

  return collectionRef.onSnapshot(snapshot => {
    if (!snapshot.empty) {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          callback(change.doc.data() as DataMessage);
        }
      });
    } else {
      callback(undefined);
    }
  });
};
